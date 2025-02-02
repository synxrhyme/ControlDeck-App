const { ipcRenderer } = require('electron');
const fs              = require("fs");
const path            = require("path");

const assets_path = path.join(path.dirname(__dirname), "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const headline = document.getElementById("headline");

const settings_span = document.getElementById("settings-span");
const configure_span = document.getElementById("configure-span");
const copyright_span = document.getElementById("copyright-span");
const exit_span = document.getElementById("exit-span");

document.title = lang[0];
headline.innerHTML = lang[1];

settings_span.innerHTML = lang[2];
configure_span.innerHTML = lang[3];
copyright_span.innerHTML = lang[4];
exit_span.innerHTML = lang[5];

document.getElementById("exit-btn").addEventListener("click", () => {
    ipcRenderer.send("toMain_manualClose");
});