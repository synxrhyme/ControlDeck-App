const fs = require("fs")
const { ipcRenderer } = require('electron')
const path = require("path")

const ipc = ipcRenderer
const assets_path = path.join(path.dirname(__dirname), "resources", "assets")
const general_config = fs.readFileSync(path.join(assets_path, "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(assets_path, "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\r?\n/)

let headline = document.getElementById("headline")

let settings_span = document.getElementById("settings-span")
let configure_span = document.getElementById("configure-span")
let copyright_span = document.getElementById("copyright-span")
let exit_span = document.getElementById("exit-span")

document.title = lang[0]
headline.innerHTML = lang[1]

settings_span.innerHTML = lang[2]
configure_span.innerHTML = lang[3]
copyright_span.innerHTML = lang[4]
exit_span.innerHTML = lang[5]

document.getElementById("exit-btn").addEventListener("click", () => {
    ipc.send("toMain_manualClose")
})