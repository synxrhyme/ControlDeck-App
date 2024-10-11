const fs = require("fs")

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\n?\r/)

let headline = document.getElementById("headline")

let copyright_text = document.getElementById("copyright")
let back_span = document.getElementById("back-span")

document.title = lang[0]
headline.innerHTML = lang[4]

back_span.innerHTML = lang[6]