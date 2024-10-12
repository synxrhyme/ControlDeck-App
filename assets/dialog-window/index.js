const fs = require("fs")
const { ipcRenderer } = require("electron")
const ipc = ipcRenderer

let general_config = fs.readFileSync("./resources/app/assets/config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync("./resources/app/assets/lang/" + lang_name + ".lang", "utf-8")
let lang = lang_str.split(/\n?\r/)

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