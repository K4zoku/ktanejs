const dotenv = require("dotenv").config();
const Discord = require("discord.js");
const readline = require("readline");
const fs = require("fs");
const zlib = require('zlib');
const Bomb = require("./entity/bomb");
const password = require("./ktane_modules/_passwords");
const complicated_wires = require("./ktane_modules/_complicated_wires");
const wires = require("./ktane_modules/_wires");

const LOGS_DIR = "./logs/";
const LATEST_LOG = "latest.log";

if (fs.existsSync(`${LOGS_DIR}${LATEST_LOG}`)) {
    let lastModified = fs.statSync(LOGS_DIR + LATEST_LOG).mtime;
    let nameFormatted = `${lastModified.getFullYear()}-${lastModified.getMonth()+1}-${lastModified.getDate()}`;
    let newName = fileNewName(LOGS_DIR, nameFormatted + ".log.gz").replace(".gz", "");

    fs.renameSync(`${LOGS_DIR}${LATEST_LOG}`,`${LOGS_DIR}${newName}`);
    let fileContents = fs.createReadStream(`${LOGS_DIR}${newName}`);
    let writeStream = fs.createWriteStream(`${LOGS_DIR}${newName}.gz`);
    let zip = zlib.createGzip();
    fileContents.pipe(zip).pipe(writeStream).on('finish', (err) => {
        if (err) return;
        fs.unlinkSync(`${LOGS_DIR}${newName}`);
    });
}

if (dotenv.error) {
    error(dotenv.error);
    return;
}
info(`[System] Loaded .env into memory`);

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const bot = new Discord.Client();

let token = process.env.BOT_TOKEN;
if (!token) {
    info("[Bot] Input bot token: ");
    rl.on("line", (line) => {
        token = line;
        rl.close();
    });
}
bot.login(token).catch(error);

bot.once("ready", () => {
   info("[Bot] Ready!");
});

let bombs = new Map([["", new Bomb()],]);
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase().startsWith(process.env.PREFIX.toLowerCase())) {
        const member = message.member;
        const mbomb = bombs.get(member.id);
        const channel = message.channel;
        const args = message.content.split(" ");
        args.shift();
        if (args.length < 1) return;
        switch (args[0].toLowerCase()) {
            case "init":
            case "i":
                let bomb = new Bomb();
                switch (args.length) {
                    case 1:
                        await channel.send(
                            "**Usage:** ```defuse init -hasVowel -even|odd -hasParallelPort -batteries # -frk -car```" +
                            "**Default value:** ```-hasVowel -even -hasParallelPort -batteries 0```" +
                            "**Example:** _If bomb serial is 'AL5QF2' that contain vowel and last digit is even. Moreover, the bomb contain 4 batteries, has parallel port and FRK sign_ \n" +
                            "         Simply type: `defuse init -hasVowel -even -hasParallelPort -battery 4 -frk`"
                        );
                        return;
                    default:
                        let margs = require('minimist')(args, {
                            alias: {
                                v: 'hasVowel',
                                e: 'even',
                                o: 'odd',
                                p: 'hasParallelPort',
                                b: 'batteries',
                                f: 'frk',
                                c: 'car',
                            }
                        });
                        bomb = new Bomb(
                            typeof margs["hasVowel"] !== "undefined",
                            (typeof margs["even"] === "undefined" && typeof margs["odd"] !== "undefined") || typeof margs["even"] !== "undefined",
                            typeof margs["battery"] !== "undefined" ? margs["battery"] >= 2 : false,
                            typeof margs["frk"] !== "undefined",
                            typeof margs["car"] !== "undefined",
                            typeof margs["hasParallelPort"] !== "undefined"
                            );
                        await channel.send("Init success :White_Check_Mark:");
                        break;
                }
                bombs.set(member.id, bomb);
                return;
            case "password":
            case "pwd":
                let chars = args;
                chars.shift();
                let found = password.find(chars);
                await channel.send("**Founded: **```fix\n " + (found.join() !== "" ? found.join(" \n").toUpperCase(): "NOTHING") + " ```");
                return;
            case "complicated":
            case "cw":
                switch (args.length) {
                    case 1: return;
                    default:
                        const CUT = "Cut";
                        const DC = "Do not cut";
                        for (let i = 1; i < args.length; i++) {
                            let result = complicated_wires.check(args[i])
                                .replace("D", DC)
                                .replace("C", CUT);
                            if (typeof mbomb !== "undefined") {
                                result = result
                                    .replace("S", mbomb.even ? CUT : DC)
                                    .replace("P", mbomb.parallel ? CUT : DC)
                                    .replace("B", mbomb.hasTwoOrMoreBatteries ? CUT : DC);
                            } else {
                                result = result
                                    .replace("S", "Cut the wire if the last digit of the serial number is even")
                                    .replace("P", "Cut the wire if the bomb has a parallel port")
                                    .replace("B", "Cut the wire if the bomb has two or more batteries");
                            }
                            await channel.send(result);
                        }
                }
                return;
            case "wires":
            case "wire":
            case "w":
                if (args.length === 1)
                    await channel.send(wires.check(args[1], mbomb));
                return;
        }
    }
});

function log(content="", logType="") {
    let current = (new Date()).toTimeString().split(' ')[0];
    if (logType !== "") logType = " " + logType;
    let logEntry = `[${current}${logType}]: ${content}`;
    console.log(logEntry);
    fs.appendFile(`${LOGS_DIR}${LATEST_LOG}`, logEntry + "\n", err => {
        if(err) console.error(err);
    });
}

function info(msg) {
    log(msg, "INFO");
}

function error(err) {
    log(err, "ERROR");
}

function fileNewName(path, filename) {
    let pos = filename.lastIndexOf('.log.gz');
    let name;
    let ext;
    if (pos > -1) {
        name = filename.slice(0, pos);
        ext = filename.slice(pos, filename.length);
    } else {
        name = filename;
    }
    let newName = filename;
    let counter = 1;
    let newPath = path + '/' + filename;

    while (fs.existsSync(newPath)) {
        newName = name + '-' + counter + ext;
        newPath = path + '/' + newName;
        counter++;
    }
    return newName;
}
