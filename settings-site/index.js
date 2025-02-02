const { ipcRenderer } = require('electron');
const fs              = require("fs");
const path            = require("path");

const ipc = ipcRenderer;

const assets_path = path.join(path.dirname(__dirname), "resources", "assets");

const main_config_path = path.join(assets_path, "config.cfg");
const main_config = fs.readFileSync(main_config_path, "utf-8");

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const headline = document.getElementById("headline");

const always_on_top_checkbox = document.getElementById("checkbox-always-on-top");
const always_on_top_checkbox_span = document.getElementById("toggle-span");

const lang_select = document.getElementById("lang-select");
const lang_select_span = document.getElementById("lang-select-span");

const back_span = document.getElementById("back-span");

document.title = lang[0];
headline.innerHTML = lang[2];
always_on_top_checkbox_span.innerHTML = lang[27];
lang_select_span.innerHTML = lang[28];

back_span.innerHTML = lang[6];

document.getElementById("checkbox-always-on-top").addEventListener("click", () => {
    ipcRenderer.send("alwaysOnTop");

    if (main_config.always_on_top != always_on_top_checkbox.checked) {
        main_config.always_on_top = always_on_top_checkbox.checked;

        fs.writeFileSync(path.join(assets_path, "config.json"), main_config);
    }
});

lang_select.addEventListener("change", () => {
    let selected_lang_name = lang_select.value;

    if (main_config.lang_name != selected_lang_name) {
        main_config.lang_name = selected_lang_name;

        fs.writeFileSync(main_config_path, main_config);
        window.location.href = "./index.html";
    }
});

document.getElementById("back-button").addEventListener("click", () => {
    window.location.href = "../main-menu/index.html";
});

function updateElements() {
    if (main_config.always_on_top) {
        always_on_top_checkbox.checked = true;
    }
    else {
        always_on_top_checkbox.checked = false;
    }

    lang_select.value = main_config.lang_name;
}

window.onload = updateElements();