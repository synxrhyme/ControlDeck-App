const { ipcRenderer } = require("electron");
const fs              = require("fs");
const path            = require("path");

const ipc = ipcRenderer;

const assets_path = path.dirname(__dirname);

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

let type = "redirect";
let type2 = "";

ipc.on("toDialog_close-type", () => {
    type = "close";
});

ipc.on("toDialog_redirect-type", () => {
    type = "redirect";
});

ipc.on("toDialog_redirect-type-nameIncomplete", () => {
    type = "redirect";
    type2 = "name-incomplete";
});

const headline    = document.getElementById("headline-custom");
const apply_span  = document.getElementById("apply-span");
const exit_span   = document.getElementById("exit-span");
const cancel_span = document.getElementById("cancel-span");

headline.innerHTML    = lang[35];
apply_span.innerHTML  = lang[32];
exit_span.innerHTML   = lang[33];
cancel_span.innerHTML = lang[34];

document.getElementById("apply").addEventListener("click", () => {
    if (type == "redirect" && type2 == "name-incomplete") {
        ipc.send("toMain_nameIncomplete");
    }
    else {
        ipc.send("toMain_savedValues");
        ipc.send("toMain_dialog-apply-" + type);
    }
});

document.getElementById("exit").addEventListener("click", () => {
    if (type == "redirect" && type2 == "name-incomplete") {
        ipc.send("toMain_nameIncomplete");
    }
    else {
        ipc.send("toMain_savedValues");
        ipc.send("toMain_dialog-exit-" + type);
    }
});

document.getElementById("cancel").addEventListener("click", () => {
    ipc.send("toMain_dialog-close");
});