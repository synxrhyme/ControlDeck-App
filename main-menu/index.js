const fs = require("fs")
const { ipcRenderer } = require('electron')
ipc = ipcRenderer

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\n?\r/)

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
    ipc.send("manualClose")
})