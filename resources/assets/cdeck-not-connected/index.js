const fs = require("fs")
const { ipcRenderer } = require("electron")
const path = require("path")

const ipc = ipcRenderer
const general_config = fs.readFileSync(path.join(path.dirname(__dirname), "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(path.dirname(__dirname), "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\r?\n/)

let headline      = document.getElementById("headline-custom")
let text_span     = document.getElementById("text-span")
let redirect_span = document.getElementById("redirect-span")
let accept_span   = document.getElementById("ok-span")

headline.innerHTML =  lang[177]
text_span.innerHTML = lang[178]
redirect_span.innerHTML = lang[182]
accept_span.innerHTML = lang[181]

document.getElementById("ok").addEventListener("click",       () => { ipc.send("toMain_errorbox-close")    })
document.getElementById("redirect").addEventListener("click", () => { ipc.send("toMain_errorbox-redirect") })