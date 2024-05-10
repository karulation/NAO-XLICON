//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                      //
//                                 𝐗𝐋𝐈𝐂𝐎𝐍-𝐕𝟑-𝐌𝐃    𝐁𝐎𝐓                                                //
//                                                                                                      //
//                                         Ｖ：3.0                                                      //
//                                                                                                      //
//              ██╗  ██╗██╗     ██╗ ██████╗ ██████╗ ███╗   ██╗      ██╗   ██╗██████╗                    //
//              ╚██╗██╔╝██║     ██║██╔════╝██╔═══██╗████╗  ██║      ██║   ██║╚════██╗                   //
//                ╚███╔╝ ██║     ██║██║     ██║   ██║██╔██╗ ██║█████╗██║   ██║ █████╔╝                  //
//               ██╔██╗ ██║     ██║██║     ██║   ██║██║╚██╗██║╚════╝╚██╗ ██╔╝ ╚═══██╗                   //
//              ██╔╝ ██╗███████╗██║╚██████╗╚██████╔╝██║ ╚████║       ╚████╔╝ ██████╔╝                   //
//              ╚═╝  ╚═╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝        ╚═══╝  ╚═════╝                    //
//                                                                                                      //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//
//*
//  * @project_name : XLICON-V3-MD
//  * @author : salmanytofficial
//  * @youtube : https://www.youtube.com/@s4salmanyt
//   * @description : XLICON-V3 ,A Multi-functional whatsapp user bot.
//*
//*
//base by DGXeon
//re-upload? recode? copy code? give credit ya :)
//Instagram: unicorn_xeon13
//Telegram: t.me/ahmmitech
//GitHub: @salmanytofficial
//WhatsApp: +923184070915
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon
//   * Created By Github: DGXeon.
//   * Credit To Xeon
//   * © 2024 XLICON-V3-MD.
// ⛥┌┤
// */

require("./settings");
const makeWASocket = require("@whiskeysockets/baileys")["default"];
const {
  color
} = require("./lib/color");
const NodeCache = require("node-cache");
const readline = require("readline");
const pino = require("pino");
const {
  Boom
} = require("@hapi/boom");
const {
  Low,
  JSONFile
} = require("./lib/lowdb");
const yargs = require("yargs/yargs");
const fs = require("fs");
const chalk = require("chalk");
const FileType = require("file-type");
const _ = require("lodash");
const moment = require("moment-timezone");
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./lib/exif");
const store = makeInMemoryStore({
  logger: pino().child({
    level: "silent",
    stream: "store"
  })
});
global.opts = new Object(yargs(process.argv.slice(0x2)).exitProcess(false).parse());
global.db = new Low(new JSONFile("src/database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x256466 => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x256466(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    users: {},
    database: {},
    chats: {},
    game: {},
    settings: {},
    message: {},
    ...(global.db.data || {})
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30000);
}
require("./XLICON-V3.js");
nocache("../XLICON-V3.js", _0x1c564d => console.log(color("[ CHANGE ]", "green"), color("'" + _0x1c564d + "'", "green"), "Updated"));
require("./main.js");
nocache("../main.js", _0x51e2f6 => console.log(color("[ CHANGE ]", "green"), color("'" + _0x51e2f6 + "'", "green"), "Updated"));
let owner = JSON.parse(fs.readFileSync("./src/data/role/owner.json"));
const pairingCode = true || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const question = _0x5a86ab => new Promise(_0x329a39 => rl.question(_0x5a86ab, _0x329a39));
async function startXliconBotInc() {
  const {
    state: _0xb172e4,
    saveCreds: _0x3a30d3
  } = await useMultiFileAuthState("./session");
  const _0x3d4711 = new NodeCache();
  const _0x1bbc17 = makeWASocket({
    logger: pino({
      level: "silent"
    }),
    printQRInTerminal: !pairingCode,
    browser: Browsers.windows("Firefox"),
    auth: {
      creds: _0xb172e4.creds,
      keys: makeCacheableSignalKeyStore(_0xb172e4.keys, pino({
        level: "fatal"
      }).child({
        level: "fatal"
      }))
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    getMessage: async _0x43a3fc => {
      let _0x1d4217 = jidNormalizedUser(_0x43a3fc.remoteJid);
      let _0x1b19bd = await store.loadMessage(_0x1d4217, _0x43a3fc.id);
      return _0x1b19bd?.["message"] || "";
    },
    msgRetryCounterCache: _0x3d4711,
    defaultQueryTimeoutMs: undefined
  });
  store.bind(_0x1bbc17.ev);
  if (pairingCode && !_0x1bbc17.authState.creds.registered) {
    if (useMobile) {
      throw new Error("Cannot use pairing code with mobile api");
    }
    let _0x3345a6;
    if (!!_0x3345a6) {
      _0x3345a6 = _0x3345a6.replace(/[^0-9]/g, "");
      if (!Object.keys(PHONENUMBER_MCC).some(_0x40e1f6 => _0x3345a6.startsWith(_0x40e1f6))) {
        console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +923184070915")));
        process.exit(0x0);
      }
    } else {
      _0x3345a6 = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number 😍\nFor example: +923184070915 : ")));
      _0x3345a6 = _0x3345a6.replace(/[^0-9]/g, "");
      if (!Object.keys(PHONENUMBER_MCC).some(_0x5f2e9f => _0x3345a6.startsWith(_0x5f2e9f))) {
        console.log(chalk.bgBlack(chalk.redBright("Start with country code of your WhatsApp Number, Example : +923184070915")));
        _0x3345a6 = await question(chalk.bgBlack(chalk.greenBright("Please type your WhatsApp number 😍\nFor example: +923184070915 : ")));
        _0x3345a6 = _0x3345a6.replace(/[^0-9]/g, "");
        rl.close();
      }
    }
    setTimeout(async () => {
      let _0x147ccb = await _0x1bbc17.requestPairingCode(_0x3345a6);
      _0x147ccb = _0x147ccb?.["match"](/.{1,4}/g)?.["join"]("-") || _0x147ccb;
      console.log(chalk.black(chalk.bgGreen("Your Pairing Code : ")), chalk.black(chalk.white(_0x147ccb)));
    }, 0xbb8);
  }
  _0x1bbc17.ev.on("connection.update", async _0x106812 => {
    const {
      connection: _0x26792e,
      lastDisconnect: _0x5d709f
    } = _0x106812;
    try {
      if (_0x26792e === "close") {
        let _0x1e6943 = new Boom(_0x5d709f?.["error"])?.["output"]["statusCode"];
        if (_0x1e6943 === DisconnectReason.badSession) {
          console.log("Bad Session File, Please Delete Session and Scan Again");
          startXliconBotInc();
        } else {
          if (_0x1e6943 === DisconnectReason.connectionClosed) {
            console.log("Connection closed, reconnecting....");
            startXliconBotInc();
          } else {
            if (_0x1e6943 === DisconnectReason.connectionLost) {
              console.log("Connection Lost from Server, reconnecting...");
              startXliconBotInc();
            } else {
              if (_0x1e6943 === DisconnectReason.connectionReplaced) {
                console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
                startXliconBotInc();
              } else {
                if (_0x1e6943 === DisconnectReason.loggedOut) {
                  console.log("Device Logged Out, Please Delete Session and Scan Again.");
                  startXliconBotInc();
                } else {
                  if (_0x1e6943 === DisconnectReason.restartRequired) {
                    console.log("Restart Required, Restarting...");
                    startXliconBotInc();
                  } else {
                    if (_0x1e6943 === DisconnectReason.timedOut) {
                      console.log("Connection TimedOut, Reconnecting...");
                      startXliconBotInc();
                    } else {
                      _0x1bbc17.end("Unknown DisconnectReason: " + _0x1e6943 + "|" + _0x26792e);
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (_0x106812.connection == "connecting" || _0x106812.receivedPendingNotifications == "false") {
        console.log(color("\n🏮Connecting...", "yellow"));
      }
      if (_0x106812.connection == "open" || _0x106812.receivedPendingNotifications == "true") {
        console.log(color(" ", "magenta"));
        console.log(color("🎀 Connected to => " + JSON.stringify(_0x1bbc17.user, null, 0x2), "yellow"));
        await delay(0x7cf);
        console.log(chalk.yellow("\n\n               " + chalk.bold.blue("[ " + botname + " ]") + "\n\n"));
        console.log(color("< ================================================== >", "cyan"));
        console.log(color("\n" + themeemoji + " YT CHANNEL: S4 Salman YT", "magenta"));
        console.log(color(themeemoji + " GITHUB: salmanytofficial ", "magenta"));
        console.log(color(themeemoji + " INSTAGRAM: @ahmmikun ", "magenta"));
        console.log(color(themeemoji + " WA NUMBER: " + owner, "magenta"));
        console.log(color(themeemoji + " CREDIT: " + wm + "\n", "magenta"));
        await delay(2000);
        _0x1bbc17.groupAcceptInvite("Kjm8rnDFcpb04gQNSTbW2d");
      }
    } catch (_0x572e3e) {
      console.log("Error in Connection.update " + _0x572e3e);
      startXliconBotInc();
    }
  });
  _0x1bbc17.ev.on("creds.update", _0x3a30d3);
  _0x1bbc17.ev.on("messages.upsert", () => {});
  _0x1bbc17.ev.on("group-participants.update", async _0x1036b8 => {
    if (global.welcome) {
      console.log(_0x1036b8);
      try {
        let _0x2d596c = await _0x1bbc17.groupMetadata(_0x1036b8.id);
        let _0x4de7ee = _0x1036b8.participants;
        for (let _0x5c4581 of _0x4de7ee) {
          try {
            ppuser = await _0x1bbc17.profilePictureUrl(_0x5c4581, "image");
          } catch (_0x59bee8) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x1bbc17.profilePictureUrl(_0x1036b8.id, "image");
          } catch (_0x258f42) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          memb = _0x2d596c.participants.length;
          XeonWlcm = await getBuffer(ppuser);
          XeonLft = await getBuffer(ppuser);
          if (_0x1036b8.action == "add") {
            const _0x270bc2 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss");
            const _0x568ccd = moment.tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
            const _0x553b79 = _0x2d596c.participants.length;
            xeonbody = "┌─❖\n│『  *Hi..!! 🐦*  』\n└┬\n    ◎ 「  @" + _0x5c4581.split("@")[0x0] + "  」\n    │ ➪  *Wᴇʟᴄᴏᴍᴇ Tᴏ*\n    ◎      " + _0x2d596c.subject + " \n    │ ➪  *Mᴇᴍʙᴇʀ :*\n    ◎      " + _0x553b79 + "th \n    │ ➪   *Jᴏɪɴᴇᴅ :*\n    ◎      " + _0x270bc2 + " " + _0x568ccd + "\n    │ ➪   *Support by Join Our Community :*\n    ◎     neoanicom.com/joinUs.php\n    └─────────────|";
            _0x1bbc17.sendMessage(_0x1036b8.id, {
              text: xeonbody,
              contextInfo: {
                mentionedJid: [_0x5c4581],
                externalAdReply: {
                  showAdAttribution: true,
                  containsAutoReply: true,
                  title: " " + global.botname,
                  body: "" + ownername,
                  previewType: "PHOTO",
                  thumbnailUrl: "",
                  thumbnail: XeonWlcm,
                  sourceUrl: "" + wagc
                }
              }
            });
          } else {
            if (_0x1036b8.action == "remove") {
              const _0x420046 = moment.tz("Asia/Kuala_Lumpur").format("HH:mm:ss");
              const _0x3aa69c = moment.tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
              const _0xb0a5db = _0x2d596c.participants.length;
              xeonbody = "┌─❖\n│『  *Gᴏᴏᴅʙʏᴇ..!! 🍁*  』\n└┬\n    ◎ 「 @" + _0x5c4581.split("@")[0x0] + "  」\n    │ ➪  *Lᴇғᴛ ғʀᴏᴍ*\n    ◎      " + _0x2d596c.subject + " \n    │ ➪  *Mᴇᴍʙᴇʀ :*\n    ◎      " + _0xb0a5db + "th\n    │ ➪   *Tɪᴍᴇ :*\n    ◎      " + _0x420046 + " " + _0x3aa69c + "\n    │ ➪   *Support by Joining Our Community :*\n    ◎     neoanicom.com?joinUs.php\n    └─────────────||";
              _0x1bbc17.sendMessage(_0x1036b8.id, {
                text: xeonbody,
                contextInfo: {
                  mentionedJid: [_0x5c4581],
                  externalAdReply: {
                    showAdAttribution: true,
                    containsAutoReply: true,
                    title: " " + global.botname,
                    body: "" + ownername,
                    previewType: "PHOTO",
                    thumbnailUrl: "",
                    thumbnail: XeonLft,
                    sourceUrl: "" + wagc
                  }
                }
              });
            }
          }
        }
      } catch (_0x3068ee) {
        console.log(_0x3068ee);
      }
    }
  });
  _0x1bbc17.ev.on("call", async _0x26d535 => {
    if (global.anticall) {
      console.log(_0x26d535);
      for (let _0xfe9495 of _0x26d535) {
        if (_0xfe9495.isGroup == false) {
          if (_0xfe9495.status == "offer") {
            let _0x4fd3e6 = await _0x1bbc17.sendTextWithMentions(_0xfe9495.from, "*" + _0x1bbc17.user.name + "* can't receive " + (_0xfe9495.isVideo ? "video" : "voice") + " call. Sorry @" + _0xfe9495.from.split("@")[0x0] + " you will be blocked. If called accidentally please contact the owner to be unblocked !");
            _0x1bbc17.sendContact(_0xfe9495.from, owner, _0x4fd3e6);
            await sleep(0x1f40);
            await _0x1bbc17.updateBlockStatus(_0xfe9495.from, "block");
          }
        }
      }
    }
  });
  _0x1bbc17.ev.on("messages.upsert", async _0x500c32 => {
    if (global.antiswview) {
      mek = _0x500c32.messages[0x0];
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        await _0x1bbc17.readMessages([mek.key]);
      }
    }
  });
  _0x1bbc17.ev.on("group-participants.update", async _0x42e7de => {
    if (global.adminevent) {
      console.log(_0x42e7de);
      try {
        let _0x3c6151 = _0x42e7de.participants;
        for (let _0x84f559 of _0x3c6151) {
          try {
            ppuser = await _0x1bbc17.profilePictureUrl(_0x84f559, "image");
          } catch (_0x23b5a8) {
            ppuser = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          try {
            ppgroup = await _0x1bbc17.profilePictureUrl(_0x42e7de.id, "image");
          } catch (_0x521288) {
            ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
          }
          if (_0x42e7de.action == "promote") {
            const xeonbody = " 𝗖𝗼𝗻𝗴𝗿𝗮𝘁𝘀🎉 @" + _0x84f559.split("@")[0x0] + ", you have been *promoted* to *admin* 🥳";
            _0x1bbc17.sendMessage(_0x42e7de.id, {
              text: xeonbody,
              quoted: _0x42e7de,
            });
          } else {
            if (_0x42e7de.action == "demote") {
              const xeonbody = "𝗢𝗼𝗽𝘀‼️ @" + _0x84f559.split("@")[0x0] + ", you have been *demoted* from *admin* 😬";
              _0x1bbc17.sendMessage(_0x42e7de.id, {
                text: xeonbody,
                quoted: _0x42e7de,
              });
            }
          }
        }
      } catch (_0xe34cb4) {
        console.log(_0xe34cb4);
      }
    }
  });
  _0x1bbc17.ev.on("groups.update", async _0x3d4306 => {
    if (global.groupevent) {
      try {
        ppgroup = await _0x1bbc17.profilePictureUrl(anu.id, "image");
      } catch (_0x280331) {
        ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60";
      }
      console.log(_0x3d4306);
      const _0x53262f = _0x3d4306[0x0];
      if (_0x53262f.announce == true) {
        await sleep(0x7d0);
        _0x1bbc17.sendMessage(_0x53262f.id, {
          text: "「 Group Settings Change 」\n\nGroup has been closed by admin, Now only admins can send messages !"
        });
      } else {
        if (_0x53262f.announce == false) {
          await sleep(0x7d0);
          _0x1bbc17.sendMessage(_0x53262f.id, {
            text: "「 Group Settings Change 」\n\nThe group has been opened by admin, Now participants can send messages !"
          });
        } else {
          if (_0x53262f.restrict == true) {
            await sleep(0x7d0);
            _0x1bbc17.sendMessage(_0x53262f.id, {
              text: "「 Group Settings Change 」\n\nGroup info has been restricted, Now only admin can edit group info !"
            });
          } else {
            if (_0x53262f.restrict == false) {
              await sleep(0x7d0);
              _0x1bbc17.sendMessage(_0x53262f.id, {
                text: "「 Group Settings Change 」\n\nGroup info has been opened, Now participants can edit group info !"
              });
            } else if (!_0x53262f.desc == "") {
              await sleep(0x7d0);
              _0x1bbc17.sendMessage(_0x53262f.id, {
                text: "「 Group Settings Change 」\n\n*Group description has been changed to*\n\n" + _0x53262f.desc
              });
            } else {
              await sleep(0x7d0);
              _0x1bbc17.sendMessage(_0x53262f.id, {
                text: "「 Group Settings Change 」\n\n*Group name has been changed to*\n\n*" + _0x53262f.subject + "*"
              });
            }
          }
        }
      }
    }
  });
  _0x1bbc17.ev.on("messages.upsert", async _0x2f843f => {
    try {
      mek = _0x2f843f.messages[0x0];
      if (!mek.message) {
        return;
      }
      mek.message = Object.keys(mek.message)[0x0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!_0x1bbc17["public"] && !mek.key.fromMe && _0x2f843f.type === "notify") {
        return;
      }
      if (mek.key.id.startsWith("Xeon") && mek.key.id.length === 0x10) {
        return;
      }
      if (mek.key.id.startsWith("BAE5")) {
        return;
      }
      m = smsg(_0x1bbc17, mek, store);
      require("./XLICON-V3")(_0x1bbc17, m, _0x2f843f, store);
    } catch (_0x4d7276) {
      console.log(_0x4d7276);
    }
  });
  _0x1bbc17.decodeJid = _0x654cb3 => {
    if (!_0x654cb3) {
      return _0x654cb3;
    }
    if (/:\d+@/gi.test(_0x654cb3)) {
      let _0x19bbb5 = jidDecode(_0x654cb3) || {};
      return _0x19bbb5.user && _0x19bbb5.server && _0x19bbb5.user + "@" + _0x19bbb5.server || _0x654cb3;
    } else {
      return _0x654cb3;
    }
  };
  _0x1bbc17.ev.on("contacts.update", _0x32fe46 => {
    for (let _0x197a40 of _0x32fe46) {
      let _0x5022ad = _0x1bbc17.decodeJid(_0x197a40.id);
      if (store && store.contacts) {
        store.contacts[_0x5022ad] = {
          id: _0x5022ad,
          name: _0x197a40.notify
        };
      }
    }
  });
  _0x1bbc17.getName = (_0x563511, _0x4d1a2f = false) => {
    id = _0x1bbc17.decodeJid(_0x563511);
    _0x4d1a2f = _0x1bbc17.withoutContact || _0x4d1a2f;
    let _0x481102;
    if (id.endsWith("@g.us")) {
      return new Promise(async _0x53103 => {
        _0x481102 = store.contacts[id] || {};
        if (!(_0x481102.name || _0x481102.subject)) {
          _0x481102 = _0x1bbc17.groupMetadata(id) || {};
        }
        _0x53103(_0x481102.name || _0x481102.subject || PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber("international"));
      });
    } else {
      _0x481102 = id === "0@s.whatsapp.net" ? {
        id: id,
        name: "WhatsApp"
      } : id === _0x1bbc17.decodeJid(_0x1bbc17.user.id) ? _0x1bbc17.user : store.contacts[id] || {};
    }
    return (_0x4d1a2f ? "" : _0x481102.name) || _0x481102.subject || _0x481102.verifiedName || PhoneNumber("+" + _0x563511.replace("@s.whatsapp.net", "")).getNumber("international");
  };
  _0x1bbc17.sendContact = async (_0x19faf5, _0x397122, _0x599817 = "", _0x1e9537 = {}) => {
    let _0x363f37 = [];
    for (let _0x4124e2 of _0x397122) {
      _0x363f37.push({
        displayName: await _0x1bbc17.getName(_0x4124e2),
        vcard: "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x1bbc17.getName(_0x4124e2)) + "\nFN:" + (await _0x1bbc17.getName(_0x4124e2)) + "\nitem1.TEL;waid=" + _0x4124e2.split("@")[0x0] + ":" + _0x4124e2.split("@")[0x0] + "\nitem1.X-ABLabel:Mobile\nEND:VCARD"
      });
    }
    _0x1bbc17.sendMessage(_0x19faf5, {
      contacts: {
        displayName: _0x363f37.length + " Contact",
        contacts: _0x363f37
      },
      ..._0x1e9537
    }, {
      quoted: _0x599817
    });
  };
  _0x1bbc17["public"] = true;
  _0x1bbc17.serializeM = _0x4c0e12 => smsg(_0x1bbc17, _0x4c0e12, store);
  _0x1bbc17.sendText = (_0x52a05c, _0x238ab4, _0x2319e6 = "", _0x31388c) => _0x1bbc17.sendMessage(_0x52a05c, {
    text: _0x238ab4,
    ..._0x31388c
  }, {
    quoted: _0x2319e6,
    ..._0x31388c
  });
  _0x1bbc17.sendImage = async (_0x1eb905, _0x5ac993, _0x355ad2 = "", _0x5d7842 = "", _0x49a09c) => {
    let _0x3451d5 = Buffer.isBuffer(_0x5ac993) ? _0x5ac993 : /^data:.*?\/.*?;base64,/i.test(_0x5ac993) ? Buffer.from(_0x5ac993.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x5ac993) ? await await getBuffer(_0x5ac993) : fs.existsSync(_0x5ac993) ? fs.readFileSync(_0x5ac993) : Buffer.alloc(0x0);
    return await _0x1bbc17.sendMessage(_0x1eb905, {
      image: _0x3451d5,
      caption: _0x355ad2,
      ..._0x49a09c
    }, {
      quoted: _0x5d7842
    });
  };
  _0x1bbc17.sendTextWithMentions = async (_0x3d7da0, _0x5beaef, _0xa2a55e, _0x3faab6 = {}) => _0x1bbc17.sendMessage(_0x3d7da0, {
    text: _0x5beaef,
    mentions: [..._0x5beaef.matchAll(/@(\d{0,16})/g)].map(_0x108413 => _0x108413[0x1] + "@s.whatsapp.net"),
    ..._0x3faab6
  }, {
    quoted: _0xa2a55e
  });
  _0x1bbc17.sendImageAsSticker = async (_0x1d9762, _0x6009a0, _0x4b84e1, _0x6057a1 = {}) => {
    let _0x12f78c = Buffer.isBuffer(_0x6009a0) ? _0x6009a0 : /^data:.*?\/.*?;base64,/i.test(_0x6009a0) ? Buffer.from(_0x6009a0.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x6009a0) ? await await getBuffer(_0x6009a0) : fs.existsSync(_0x6009a0) ? fs.readFileSync(_0x6009a0) : Buffer.alloc(0x0);
    let _0x4809ae;
    if (_0x6057a1 && (_0x6057a1.packname || _0x6057a1.author)) {
      _0x4809ae = await writeExifImg(_0x12f78c, _0x6057a1);
    } else {
      _0x4809ae = await imageToWebp(_0x12f78c);
    }
    await _0x1bbc17.sendMessage(_0x1d9762, {
      sticker: {
        url: _0x4809ae
      },
      ..._0x6057a1
    }, {
      quoted: _0x4b84e1
    }).then(_0x232415 => {
      fs.unlinkSync(_0x4809ae);
      return _0x232415;
    });
  };
  _0x1bbc17.sendVideoAsSticker = async (_0x5d2854, _0x48d7b8, _0xe505f0, _0x58fd1e = {}) => {
    let _0x3e4ad7 = Buffer.isBuffer(_0x48d7b8) ? _0x48d7b8 : /^data:.*?\/.*?;base64,/i.test(_0x48d7b8) ? Buffer.from(_0x48d7b8.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x48d7b8) ? await await getBuffer(_0x48d7b8) : fs.existsSync(_0x48d7b8) ? fs.readFileSync(_0x48d7b8) : Buffer.alloc(0x0);
    let _0x12569f;
    if (_0x58fd1e && (_0x58fd1e.packname || _0x58fd1e.author)) {
      _0x12569f = await writeExifVid(_0x3e4ad7, _0x58fd1e);
    } else {
      _0x12569f = await videoToWebp(_0x3e4ad7);
    }
    await _0x1bbc17.sendMessage(_0x5d2854, {
      sticker: {
        url: _0x12569f
      },
      ..._0x58fd1e
    }, {
      quoted: _0xe505f0
    });
    return _0x12569f;
  };
  _0x1bbc17.downloadAndSaveMediaMessage = async (_0x453ab6, _0x2ce87e, _0x4e7904 = true) => {
    let _0x2d1f43 = _0x453ab6.msg ? _0x453ab6.msg : _0x453ab6;
    let _0x3b3acc = (_0x453ab6.msg || _0x453ab6).mimetype || "";
    let _0x40fc48 = _0x453ab6.mtype ? _0x453ab6.mtype.replace(/Message/gi, "") : _0x3b3acc.split("/")[0x0];
    const _0x18a79e = await downloadContentFromMessage(_0x2d1f43, _0x40fc48);
    let _0x52643c = Buffer.from([]);
    for await (const _0x327ae8 of _0x18a79e) {
      _0x52643c = Buffer.concat([_0x52643c, _0x327ae8]);
    }
    let _0x554b36 = await FileType.fromBuffer(_0x52643c);
    trueFileName = _0x4e7904 ? _0x2ce87e + "." + _0x554b36.ext : _0x2ce87e;
    await fs.writeFileSync(trueFileName, _0x52643c);
    return trueFileName;
  };
  _0x1bbc17.copyNForward = async (_0x54279f, _0x12ad3c, _0x41de88 = false, _0x18e537 = {}) => {
    let _0x4f1d7b;
    if (_0x18e537.readViewOnce) {
      _0x12ad3c.message = _0x12ad3c.message && _0x12ad3c.message.ephemeralMessage && _0x12ad3c.message.ephemeralMessage.message ? _0x12ad3c.message.ephemeralMessage.message : _0x12ad3c.message || undefined;
      _0x4f1d7b = Object.keys(_0x12ad3c.message.viewOnceMessage.message)[0x0];
      delete (_0x12ad3c.message && _0x12ad3c.message.ignore ? _0x12ad3c.message.ignore : _0x12ad3c.message || undefined);
      delete _0x12ad3c.message.viewOnceMessage.message[_0x4f1d7b].viewOnce;
      _0x12ad3c.message = {
        ..._0x12ad3c.message.viewOnceMessage.message
      };
    }
    let _0x2f8f54 = Object.keys(_0x12ad3c.message)[0x0];
    let _0x3d3c6e = await generateForwardMessageContent(_0x12ad3c, _0x41de88);
    let _0x2136f5 = Object.keys(_0x3d3c6e)[0x0];
    let _0x39d4aa = {};
    if (_0x2f8f54 != "conversation") {
      _0x39d4aa = _0x12ad3c.message[_0x2f8f54].contextInfo;
    }
    _0x3d3c6e[_0x2136f5].contextInfo = {
      ..._0x39d4aa,
      ..._0x3d3c6e[_0x2136f5].contextInfo
    };
    const _0x398b03 = await generateWAMessageFromContent(_0x54279f, _0x3d3c6e, _0x18e537 ? {
      ..._0x3d3c6e[_0x2136f5],
      ..._0x18e537,
      ...(_0x18e537.contextInfo ? {
        contextInfo: {
          ..._0x3d3c6e[_0x2136f5].contextInfo,
          ..._0x18e537.contextInfo
        }
      } : {})
    } : {});
    await _0x1bbc17.relayMessage(_0x54279f, _0x398b03.message, {
      messageId: _0x398b03.key.id
    });
    return _0x398b03;
  };
  _0x1bbc17.sendPoll = (_0x5ab5f7, _0x407526 = "", _0x24b99e = [], _0x4b440a = 0x1) => {
    return _0x1bbc17.sendMessage(_0x5ab5f7, {
      poll: {
        name: _0x407526,
        values: _0x24b99e,
        selectableCount: _0x4b440a
      }
    });
  };
  _0x1bbc17.parseMention = (_0x1177b6 = "") => {
    return [..._0x1177b6.matchAll(/@([0-9]{5,16}|0)/g)].map(_0x1b2792 => _0x1b2792[0x1] + "@s.whatsapp.net");
  };
  _0x1bbc17.downloadMediaMessage = async _0x23bb09 => {
    let _0x39946f = (_0x23bb09.msg || _0x23bb09).mimetype || "";
    let _0x4b5478 = _0x23bb09.mtype ? _0x23bb09.mtype.replace(/Message/gi, "") : _0x39946f.split("/")[0x0];
    const _0x3fb670 = await downloadContentFromMessage(_0x23bb09, _0x4b5478);
    let _0x22f468 = Buffer.from([]);
    for await (const _0x1eb4bb of _0x3fb670) {
      _0x22f468 = Buffer.concat([_0x22f468, _0x1eb4bb]);
    }
    return _0x22f468;
  };
  return _0x1bbc17;
}
startXliconBotInc();
process.on("uncaughtException", function (_0x42a38b) {
  let _0x4a2d7f = String(_0x42a38b);
  if (_0x4a2d7f.includes("conflict")) {
    return;
  }
  if (_0x4a2d7f.includes("Socket connection timeout")) {
    return;
  }
  if (_0x4a2d7f.includes("not-authorized")) {
    return;
  }
  if (_0x4a2d7f.includes("already-exists")) {
    return;
  }
  if (_0x4a2d7f.includes("rate-overlimit")) {
    return;
  }
  if (_0x4a2d7f.includes("Connection Closed")) {
    return;
  }
  if (_0x4a2d7f.includes("Timed Out")) {
    return;
  }
  if (_0x4a2d7f.includes("Value not found")) {
    return;
  }
  console.log("Caught exception: ", _0x42a38b);
});
