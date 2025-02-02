const fs   = require("fs");
const path = require("path");

const assets_path = path.join(path.dirname(__dirname), "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const headline = document.getElementById("headline");

const copyright_text = document.getElementById("copyright");
const back_span = document.getElementById("back-span");

document.title = lang[0];
headline.innerHTML = lang[4];

back_span.innerHTML = lang[6]