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

let AoT_checkbox = document.getElementById("checkbox-always-on-top")
let AoT_checkbox_span = document.getElementById("toggle-span")
let lang_select_span = document.getElementById("lang-select-span")
let record_select_span = document.getElementById("record-select-span")

let record_select = document.getElementById("record-select")
let back_span = document.getElementById("back-span")

document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../main-menu/index.html"
})

let lang_select = document.getElementById("lang-select")
lang_select.addEventListener("change", () => {
    selected_lang_name = lang_select.value

    let temp_general_config = fs.readFileSync("./resources/app/assets/config.cfg", "utf-8").split(/\r?\n/)

    if (temp_general_config[1] != selected_lang_name) {
        temp_general_config[1] = selected_lang_name

        fs.writeFileSync("./resources/app/assets/config.cfg", "")

        for (let i = 0; i < temp_general_config.length; i++) {
            if (i != temp_general_config.length - 1) {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i] + "\n")
            }
            else {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i])
            }
        }

        window.location.href = "./index.html"
    }
})

record_select.addEventListener("change", () => {
    let record_select_val = record_select.value

    let temp_general_config = fs.readFileSync("./resources/app/assets/config.cfg", "utf-8").split(/\r?\n/)

    if (temp_general_config[3] != record_select_val) {
        temp_general_config[3] = record_select_val

        fs.writeFileSync("./resources/app/assets/config.cfg", "")

        for (let i = 0; i < temp_general_config.length; i++) {
            if (i != temp_general_config.length - 1) {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i] + "\n")
            }
            else {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i])
            }
        }
    }
})

document.title = lang[0]
headline.innerHTML = lang[2]
AoT_checkbox_span.innerHTML = lang[27]
lang_select_span.innerHTML = lang[28]
record_select_span.innerHTML = lang[29]

record_select.options[0].innerHTML = lang[30];
record_select.options[1].innerHTML = lang[31];

back_span.innerHTML = lang[6]

document.getElementById("checkbox-always-on-top").addEventListener("click", () => {
    ipc.invoke("alwaysOnTop")

    let temp_general_config = fs.readFileSync("./resources/app/assets/config.cfg", "utf-8").split(/\r?\n/)

    if (temp_general_config[2] != "ontop=" + AoT_checkbox.checked.toString()) {
        temp_general_config[2] = "ontop=" + AoT_checkbox.checked.toString()

        fs.writeFileSync("./resources/app/assets/config.cfg", "")

        for (let i = 0; i < temp_general_config.length; i++) {
            if (i != temp_general_config.length - 1) {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i] + "\n")
            }
            else {
                fs.appendFileSync("./resources/app/assets/config.cfg", temp_general_config[i])
            }
        }
    }
})

function updateElements() {
    record_select.value = general_config[3]

    if (general_config[2] == "ontop=true") {
        AoT_checkbox.checked = true
    }
    else {
        AoT_checkbox.checked = false
    }

    temp1 = general_config[1].split("/")
    temp2 = temp1[3].split(".")
    lang_select.value = temp2[0]
}

window.onload = updateElements()