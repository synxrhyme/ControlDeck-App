const fs = require("fs")
const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

let general_config = fs.readFileSync("./resources/app/assets/config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync("./resources/app/assets/lang/" + lang_name + ".lang", "utf-8")
let lang = lang_str.split(/\n?\r/)

let headline = document.getElementById("headline-custom")
let text_span = document.getElementById("text-span")
let redirect_span = document.getElementById("redirect-span")
let accept_span = document.getElementById("ok-span")

headline.innerHTML =  lang[177]
text_span.innerHTML = lang[178]
redirect_span.innerHTML = lang[182]
accept_span.innerHTML = lang[181]

document.getElementById("ok").addEventListener("click", () => {
    ipc.send("errorbox-name-incomplete-close")
})

document.getElementById("redirect").addEventListener("click", () => {
    ipc.send("errorbox-name-incomplete-redirect")
})