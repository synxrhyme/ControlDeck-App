const fs = require("fs")
const { ipcRenderer } = require("electron")
const path = require("path")

const ipc = ipcRenderer
const general_config = fs.readFileSync(path.join(path.dirname(__dirname), "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(path.dirname(__dirname), "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\n?\r/)

let headline = document.getElementById("headline-custom")
let apply_span = document.getElementById("apply-span")
let exit_span = document.getElementById("exit-span")
let cancel_span = document.getElementById("cancel-span")

headline.innerHTML =  lang[173]
apply_span.innerHTML = lang[170]
exit_span.innerHTML = lang[171]
cancel_span.innerHTML = lang[172]

document.getElementById("apply").addEventListener("click", () => {
    ipc.send("dialog-apply")
})

document.getElementById("exit").addEventListener("click", () => {
    ipc.send("dialog-exit")
})

document.getElementById("cancel").addEventListener("click", () => {
    ipc.send("dialog-cancel")
})