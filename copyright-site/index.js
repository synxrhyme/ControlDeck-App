const fs = require("fs")
const path = require("path")

const assets_path = path.join(path.dirname(__dirname), "resources", "assets")
const general_config = fs.readFileSync(path.join(assets_path, "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(assets_path, "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\r?\n/)

let headline = document.getElementById("headline")

let copyright_text = document.getElementById("copyright")
let back_span = document.getElementById("back-span")

document.title = lang[0]
headline.innerHTML = lang[4]

back_span.innerHTML = lang[6]