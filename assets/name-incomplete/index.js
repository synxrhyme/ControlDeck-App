const fs = require("fs")
const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\n?\r/)

let headline = document.getElementById("headline-custom")
let redirect_span = document.getElementById("redirect-span")
let accept_span = document.getElementById("ok-span")

headline.innerHTML =  lang[175]
accept_span.innerHTML = lang[176]

document.getElementById("ok").addEventListener("click", () => {
    ipc.send("errorbox-name-incomplete-close")
})