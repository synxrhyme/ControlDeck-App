const fs = require("fs")
const { ipcRenderer } = require("electron")
const path = require("path")

const ipc = ipcRenderer
const general_config = fs.readFileSync(path.join(path.dirname(__dirname), "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(path.dirname(__dirname), "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\n?\r/)

let headline = document.getElementById("headline-custom")
let redirect_span = document.getElementById("redirect-span")
let accept_span = document.getElementById("ok-span")

headline.innerHTML =  lang[175]
accept_span.innerHTML = lang[176]

document.getElementById("ok").addEventListener("click", () => {
    ipc.send("errorbox-name-incomplete-close")
})