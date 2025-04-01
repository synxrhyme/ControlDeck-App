const { ipcRenderer } = require("electron");
const fs              = require("fs");
const path            = require("path");

const assets_path = path.dirname(__dirname);

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const headline      = document.getElementById("headline-custom");
const text_span     = document.getElementById("text-span");

headline.innerHTML  = lang[52];
text_span.innerHTML = lang[53];

ipcRenderer.send("toMain_close-updater");