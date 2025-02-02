const { ipcRenderer } = require("electron");
const { SerialPort }  = require('serialport');
const fs              = require('fs');
const path            = require("path");

const assets_path = path.join(path.dirname(__dirname), "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const keys_lang_path = path.join(assets_path, "lang", main_config.lang_name + "_keys.lang");
const keys_lang = fs.readFileSync(keys_lang_path, "utf-8").split(/\r?\n/);

Object.defineProperties(Array.prototype, { count: { value: function(value) { return this.filter(x => x==value).length }}})
const conversion_hid_code_lang = { 0x00: lang[32], 0x04: lang[33], 0x05: lang[34], 0x06: lang[35], 0x07: lang[36], 0x08: lang[37], 0x09: lang[38], 0x0A: lang[39], 0x0B: lang[40], 0x0C: lang[41], 0x0D: lang[42], 0x0E: lang[43], 0x0F: lang[44], 0x10: lang[45], 0x11: lang[46], 0x12: lang[47], 0x13: lang[48], 0x14: lang[49], 0x15: lang[50], 0x16: lang[51], 0x17: lang[52], 0x18: lang[53], 0x19: lang[54], 0x1A: lang[55], 0x1B: lang[56], 0x1C: lang[57], 0x1D: lang[58], 0x1E: lang[60], 0x1F: lang[61], 0x20: lang[62], 0x21: lang[63], 0x22: lang[64], 0x23: lang[65], 0x24: lang[66], 0x25: lang[67], 0x26: lang[68], 0x27: lang[59], 0x28: lang[80], 0x29: lang[81], 0x2A: lang[82], 0x2B: lang[83], 0x2C: lang[84], 0x2D: lang[85], 0x2E: lang[86], 0x2F: lang[87], 0x30: lang[88], 0x31: lang[89], 0x33: lang[90], 0x34: lang[91], 0x35: lang[92], 0x36: lang[93], 0x37: lang[94], 0x39: lang[95], 0x3A: lang[96], 0x3B: lang[97], 0x3C: lang[98], 0x3D: lang[99], 0x3E: lang[100], 0x3F: lang[101], 0x40: lang[102], 0x41: lang[103], 0x42: lang[104], 0x43: lang[105], 0x44: lang[106], 0x45: lang[107], 0x46: lang[108], 0x47: lang[109], 0x48: lang[110], 0x49: lang[111], 0x4A: lang[112], 0x4B: lang[113], 0x4C: lang[114], 0x4D: lang[115], 0x4E: lang[116], 0x4F: lang[117], 0x50: lang[118], 0x51: lang[119], 0x52: lang[120], 0x53: lang[121], 0x54: lang[122], 0x55: lang[123], 0x56: lang[124], 0x57: lang[125], 0x58: lang[126], 0x59: lang[127], 0x5A: lang[128], 0x5B: lang[129], 0x5C: lang[130], 0x5D: lang[131], 0x5E: lang[132], 0x5F: lang[133], 0x60: lang[134], 0x61: lang[135], 0x62: lang[136], 0x4D: lang[137], 0x52: lang[138], 0x4E: lang[139], 0x50: lang[140], 0x4F: lang[141], 0x4A: lang[142], 0x51: lang[143], 0x4B: lang[144], 0x49: lang[145], 0x63: lang[146], 0x64: lang[147], 0x64: lang[148], 0x67: lang[149], 0x68: lang[150], 0x69: lang[151], 0x6A: lang[152], 0x6B: lang[153], 0x6C: lang[154], 0x6D: lang[155], 0x6E: lang[156], 0x6F: lang[157], 0x70: lang[158], 0x71: lang[159], 0x72: lang[160], 0x73: lang[161], 0xE0: lang[162], 0xE1: lang[163], 0xE2: lang[164], 0xE3: lang[165], 0xE4: lang[166], 0xE5: lang[167], 0xE6: lang[168], 0xE7: lang[169] }

const btn1_cfg_path = path.join(__dirname, "button-1", "btn-config.json");
const btn2_cfg_path = path.join(__dirname, "button-2", "btn-config.json");
const btn3_cfg_path = path.join(__dirname, "button-3", "btn-config.json");
const btn4_cfg_path = path.join(__dirname, "button-4", "btn-config.json");
const btn5_cfg_path = path.join(__dirname, "button-5", "btn-config.json");
const btn6_cfg_path = path.join(__dirname, "button-6", "btn-config.json");
const btn7_cfg_path = path.join(__dirname, "button-7", "btn-config.json");
const btn8_cfg_path = path.join(__dirname, "button-8", "btn-config.json");

let btn1_cfg_raw = fs.readFileSync(btn1_cfg_path, "utf-8");
let btn2_cfg_raw = fs.readFileSync(btn2_cfg_path, "utf-8");
let btn3_cfg_raw = fs.readFileSync(btn3_cfg_path, "utf-8");
let btn4_cfg_raw = fs.readFileSync(btn4_cfg_path, "utf-8");
let btn5_cfg_raw = fs.readFileSync(btn5_cfg_path, "utf-8");
let btn6_cfg_raw = fs.readFileSync(btn6_cfg_path, "utf-8");
let btn7_cfg_raw = fs.readFileSync(btn7_cfg_path, "utf-8");
let btn8_cfg_raw = fs.readFileSync(btn8_cfg_path, "utf-8");

let btn1_cfg = JSON.parse(btn1_cfg_raw);
let btn2_cfg = JSON.parse(btn2_cfg_raw);
let btn3_cfg = JSON.parse(btn3_cfg_raw);
let btn4_cfg = JSON.parse(btn4_cfg_raw);
let btn5_cfg = JSON.parse(btn5_cfg_raw);
let btn6_cfg = JSON.parse(btn6_cfg_raw);
let btn7_cfg = JSON.parse(btn7_cfg_raw);
let btn8_cfg = JSON.parse(btn8_cfg_raw);

const serialNumber = "7&862CE5D&0&0000";

let serialPort;
let port_id = main_config.port_id;

const conversion_hid_lang = {
    0x00: keys_lang[0],
    0x04: keys_lang[1],
    0x05: keys_lang[2],
    0x06: keys_lang[3],
    0x07: keys_lang[4],
    0x08: keys_lang[5],
    0x09: keys_lang[6],
    0x0A: keys_lang[7],
    0x0B: keys_lang[8],
    0x0C: keys_lang[9],
    0x0D: keys_lang[10],
    0x0E: keys_lang[11],
    0x0F: keys_lang[12],
    0x10: keys_lang[13],
    0x11: keys_lang[14],
    0x12: keys_lang[15],
    0x13: keys_lang[16],
    0x14: keys_lang[17],
    0x15: keys_lang[18],
    0x16: keys_lang[19],
    0x17: keys_lang[20],
    0x18: keys_lang[21],
    0x19: keys_lang[22],
    0x1A: keys_lang[23],
    0x1B: keys_lang[24],
    0x1C: keys_lang[25],
    0x1D: keys_lang[26],
    0x1E: keys_lang[27],
    0x1F: keys_lang[28],
    0x20: keys_lang[29],
    0x21: keys_lang[30],
    0x22: keys_lang[31],
    0x23: keys_lang[32],
    0x24: keys_lang[33],
    0x25: keys_lang[34],
    0x26: keys_lang[35],
    0x27: keys_lang[36],
    0x28: keys_lang[37],
    0x29: keys_lang[38],
    0x2A: keys_lang[39],
    0x2B: keys_lang[40],
    0x2C: keys_lang[41],
    0x2D: keys_lang[42],
    0x2E: keys_lang[43],
    0x2F: keys_lang[44],
    0x30: keys_lang[45],
    0x31: keys_lang[46],
    0x32: keys_lang[47],
    0x33: keys_lang[48],
    0x34: keys_lang[49],
    0x35: keys_lang[50],
    0x36: keys_lang[51],
    0x37: keys_lang[52],
    0x38: keys_lang[53],
    0x39: keys_lang[54],
    0x3A: keys_lang[55],
    0x3B: keys_lang[56],
    0x3C: keys_lang[57],
    0x3D: keys_lang[58],
    0x3E: keys_lang[59],
    0x3F: keys_lang[60],
    0x40: keys_lang[61],
    0x41: keys_lang[62],
    0x42: keys_lang[63],
    0x43: keys_lang[64],
    0x44: keys_lang[65],
    0x45: keys_lang[66],
    0x46: keys_lang[67],
    0x47: keys_lang[68],
    0x48: keys_lang[69],
    0x49: keys_lang[70],
    0x4A: keys_lang[71],
    0x4B: keys_lang[72],
    0x4C: keys_lang[73],
    0x4D: keys_lang[74],
    0x4E: keys_lang[75],
    0x4F: keys_lang[76],
    0x50: keys_lang[77],
    0x51: keys_lang[78],
    0x52: keys_lang[79],
    0x53: keys_lang[80],
    0x54: keys_lang[81],
    0x55: keys_lang[82],
    0x56: keys_lang[83],
    0x57: keys_lang[84],
    0x58: keys_lang[85],
    0x59: keys_lang[86],
    0x5A: keys_lang[87],
    0x5B: keys_lang[88],
    0x5C: keys_lang[89],
    0x5D: keys_lang[90],
    0x5E: keys_lang[91],
    0x5F: keys_lang[92],
    0x60: keys_lang[93],
    0x61: keys_lang[94],
    0x62: keys_lang[95],
    0x63: keys_lang[96],
    0x64: keys_lang[97],
    0x67: keys_lang[98],
    0x68: keys_lang[99],
    0x69: keys_lang[100],
    0x6A: keys_lang[101],
    0x6B: keys_lang[102],
    0x6C: keys_lang[103],
    0x6D: keys_lang[104],
    0x6E: keys_lang[105],
    0x6F: keys_lang[106],
    0x70: keys_lang[107],
    0x71: keys_lang[108],
    0x72: keys_lang[109],
    0x73: keys_lang[110],
    0x74: keys_lang[111],
    0x75: keys_lang[112],
    0x76: keys_lang[113],
    0x77: keys_lang[114],
    0x78: keys_lang[115],
    0x79: keys_lang[116],
    0x7A: keys_lang[117],
    0x7B: keys_lang[118],
    0x7C: keys_lang[119],
    0x7D: keys_lang[120],
    0x7E: keys_lang[121],
    0x7F: keys_lang[122],
    0x80: keys_lang[123],
    0x81: keys_lang[124],
    0x82: keys_lang[125],
    0x83: keys_lang[126],
    0x84: keys_lang[127],
    0x85: keys_lang[128],
    0x86: keys_lang[129],
    0x9A: keys_lang[130],
    0x9B: keys_lang[131],
    0x9C: keys_lang[132],
    0xB0: keys_lang[133],
    0xB1: keys_lang[134],
    0xB2: keys_lang[135],
    0xB3: keys_lang[136],
    0xB4: keys_lang[137],
    0xB5: keys_lang[138],
    0xB6: keys_lang[139],
    0xB7: keys_lang[140],
    0xB8: keys_lang[141],
    0xB9: keys_lang[142],
    0xBA: keys_lang[143],
    0xBB: keys_lang[144],
    0xBC: keys_lang[145],
    0xBD: keys_lang[146],
    0xBE: keys_lang[147],
    0xBF: keys_lang[148],
    0xC0: keys_lang[149],
    0xC1: keys_lang[150],
    0xC2: keys_lang[151],
    0xC3: keys_lang[152],
    0xC4: keys_lang[153],
    0xC5: keys_lang[154],
    0xC6: keys_lang[155],
    0xC7: keys_lang[156],
    0xC8: keys_lang[157],
    0xC9: keys_lang[158],
    0xCA: keys_lang[159],
    0xCB: keys_lang[160],
    0xCC: keys_lang[161],
    0xCD: keys_lang[162],
    0xCE: keys_lang[163],
    0xCF: keys_lang[164],
    0xD7: keys_lang[165],
    0xE0: keys_lang[166],
    0xE1: keys_lang[167],
    0xE2: keys_lang[168],
    0xE3: keys_lang[169],
    0xE4: keys_lang[170],
    0xE5: keys_lang[171],
    0xE6: keys_lang[172],
    0xE7: keys_lang[173],
}

const headline   = document.getElementById("headline");
const log        = document.getElementById("log");
const status_log = document.getElementById("status");
const edit_spans = document.getElementsByClassName("edit-span");
const back_span  = document.getElementById("back-span");

document.title = lang[0];
headline.innerHTML = lang[3];
log.innerHTML = lang[7];
back_span.innerHTML = lang[6];

document.getElementById("back-button").addEventListener("click", returnToMainMenu);

for (let i = 0; i < edit_spans.length; i++) {
    edit_spans[i].innerHTML = lang[8];
}

document

let currently_connected = false;
let first_time_error = true;

const name_button_1 = document.getElementById("name-button-1");
const name_button_2 = document.getElementById("name-button-2");
const name_button_3 = document.getElementById("name-button-3");
const name_button_4 = document.getElementById("name-button-4");
const name_button_5 = document.getElementById("name-button-5");
const name_button_6 = document.getElementById("name-button-6");
const name_button_7 = document.getElementById("name-button-7");
const name_button_8 = document.getElementById("name-button-8");

const keys_button_1 = document.getElementById("keys-button-1");
const keys_button_2 = document.getElementById("keys-button-2");
const keys_button_3 = document.getElementById("keys-button-3");
const keys_button_4 = document.getElementById("keys-button-4");
const keys_button_5 = document.getElementById("keys-button-5");
const keys_button_6 = document.getElementById("keys-button-6");
const keys_button_7 = document.getElementById("keys-button-7");
const keys_button_8 = document.getElementById("keys-button-8");

let btn1_hotkeyDisplay = [];
let btn2_hotkeyDisplay = [];
let btn3_hotkeyDisplay = [];
let btn4_hotkeyDisplay = [];
let btn5_hotkeyDisplay = [];
let btn6_hotkeyDisplay = [];
let btn7_hotkeyDisplay = [];
let btn8_hotkeyDisplay = [];

function load_values() {
    name_button_1.innerHTML = (btn1_cfg.name).toString();
    name_button_2.innerHTML = (btn2_cfg.name).toString();
    name_button_3.innerHTML = (btn3_cfg.name).toString();
    name_button_4.innerHTML = (btn4_cfg.name).toString();
    name_button_5.innerHTML = (btn5_cfg.name).toString();
    name_button_6.innerHTML = (btn6_cfg.name).toString();
    name_button_7.innerHTML = (btn7_cfg.name).toString();
    name_button_8.innerHTML = (btn8_cfg.name).toString();

    btn1_hotkeyDisplay = [];
    btn2_hotkeyDisplay = [];
    btn3_hotkeyDisplay = [];
    btn4_hotkeyDisplay = [];
    btn5_hotkeyDisplay = [];
    btn6_hotkeyDisplay = [];
    btn7_hotkeyDisplay = [];
    btn8_hotkeyDisplay = [];

    btn1_hotkeyDisplay.push(conversion_hid_code_lang[btn1_cfg.keys.key1]);
    btn1_hotkeyDisplay.push(conversion_hid_code_lang[btn1_cfg.keys.key2]);
    btn1_hotkeyDisplay.push(conversion_hid_code_lang[btn1_cfg.keys.key3]);
    btn1_hotkeyDisplay.push(conversion_hid_code_lang[btn1_cfg.keys.key4]);
    btn1_hotkeyDisplay.push(conversion_hid_code_lang[btn1_cfg.keys.key5]);

    /*
    btn2_hotkeyDisplay.push(conversion_hid_code_lang[btn2_cfg.keys.key1]);
    btn2_hotkeyDisplay.push(conversion_hid_code_lang[btn2_cfg.keys.key2]);
    btn2_hotkeyDisplay.push(conversion_hid_code_lang[btn2_cfg.keys.key3]);
    btn2_hotkeyDisplay.push(conversion_hid_code_lang[btn2_cfg.keys.key4]);
    btn2_hotkeyDisplay.push(conversion_hid_code_lang[btn2_cfg.keys.key5]);

    btn3_hotkeyDisplay.push(conversion_hid_code_lang[btn3_cfg.keys.key1]);
    btn3_hotkeyDisplay.push(conversion_hid_code_lang[btn3_cfg.keys.key2]);
    btn3_hotkeyDisplay.push(conversion_hid_code_lang[btn3_cfg.keys.key3]);
    btn3_hotkeyDisplay.push(conversion_hid_code_lang[btn3_cfg.keys.key4]);
    btn3_hotkeyDisplay.push(conversion_hid_code_lang[btn3_cfg.keys.key5]);

    btn4_hotkeyDisplay.push(conversion_hid_code_lang[btn4_cfg.keys.key1]);
    btn4_hotkeyDisplay.push(conversion_hid_code_lang[btn4_cfg.keys.key2]);
    btn4_hotkeyDisplay.push(conversion_hid_code_lang[btn4_cfg.keys.key3]);
    btn4_hotkeyDisplay.push(conversion_hid_code_lang[btn4_cfg.keys.key4]);
    btn4_hotkeyDisplay.push(conversion_hid_code_lang[btn4_cfg.keys.key5]);

    btn5_hotkeyDisplay.push(conversion_hid_code_lang[btn5_cfg.keys.key1]);
    btn5_hotkeyDisplay.push(conversion_hid_code_lang[btn5_cfg.keys.key2]);
    btn5_hotkeyDisplay.push(conversion_hid_code_lang[btn5_cfg.keys.key3]);
    btn5_hotkeyDisplay.push(conversion_hid_code_lang[btn5_cfg.keys.key4]);
    btn5_hotkeyDisplay.push(conversion_hid_code_lang[btn5_cfg.keys.key5]);

    btn6_hotkeyDisplay.push(conversion_hid_code_lang[btn6_cfg.keys.key1]);
    btn6_hotkeyDisplay.push(conversion_hid_code_lang[btn6_cfg.keys.key2]);
    btn6_hotkeyDisplay.push(conversion_hid_code_lang[btn6_cfg.keys.key3]);
    btn6_hotkeyDisplay.push(conversion_hid_code_lang[btn6_cfg.keys.key4]);
    btn6_hotkeyDisplay.push(conversion_hid_code_lang[btn6_cfg.keys.key5]);

    btn7_hotkeyDisplay.push(conversion_hid_code_lang[btn7_cfg.keys.key1]);
    btn7_hotkeyDisplay.push(conversion_hid_code_lang[btn7_cfg.keys.key2]);
    btn7_hotkeyDisplay.push(conversion_hid_code_lang[btn7_cfg.keys.key3]);
    btn7_hotkeyDisplay.push(conversion_hid_code_lang[btn7_cfg.keys.key4]);
    btn7_hotkeyDisplay.push(conversion_hid_code_lang[btn7_cfg.keys.key5]);

    btn8_hotkeyDisplay.push(conversion_hid_code_lang[btn8_cfg.keys.key1]);
    btn8_hotkeyDisplay.push(conversion_hid_code_lang[btn8_cfg.keys.key2]);
    btn8_hotkeyDisplay.push(conversion_hid_code_lang[btn8_cfg.keys.key3]);
    btn8_hotkeyDisplay.push(conversion_hid_code_lang[btn8_cfg.keys.key4]);
    btn8_hotkeyDisplay.push(conversion_hid_code_lang[btn8_cfg.keys.key5]);
    */

    keys_button_1.innerHTML = "";
    keys_button_2.innerHTML = "";
    keys_button_3.innerHTML = "";
    keys_button_4.innerHTML = "";
    keys_button_5.innerHTML = "";
    keys_button_6.innerHTML = "";
    keys_button_7.innerHTML = "";
    keys_button_8.innerHTML = "";

    if (btn1_hotkeyDisplay.count(lang[32]) == btn1_hotkeyDisplay.length) {
        keys_button_1.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn1_hotkeyDisplay[i] == lang[32]) {
                btn1_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn1_hotkeyDisplay.length; i++) {
            if (i == btn1_hotkeyDisplay.length - 1) {
                keys_button_1.insertAdjacentHTML("beforeend", btn1_hotkeyDisplay[i]);
            }
            else {
                keys_button_1.insertAdjacentHTML("beforeend", btn1_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn2_hotkeyDisplay.count(lang[32]) == btn2_hotkeyDisplay.length) {
        keys_button_2.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn2_hotkeyDisplay[i] == lang[32]) {
                btn2_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn2_hotkeyDisplay.length; i++) {
            if (i == btn2_hotkeyDisplay.length - 1) {
                keys_button_2.insertAdjacentHTML("beforeend", btn2_hotkeyDisplay[i]);
            }
            else {
                keys_button_2.insertAdjacentHTML("beforeend", btn2_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn3_hotkeyDisplay.count(lang[32]) == btn3_hotkeyDisplay.length) {
        keys_button_3.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn3_hotkeyDisplay[i] == lang[32]) {
                btn3_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn2_hotkeyDisplay.length; i++) {
            if (i == btn3_hotkeyDisplay.length - 1) {
                keys_button_3.insertAdjacentHTML("beforeend", btn3_hotkeyDisplay[i]);
            }
            else {
                keys_button_3.insertAdjacentHTML("beforeend", btn3_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn4_hotkeyDisplay.count(lang[32]) == btn4_hotkeyDisplay.length) {
        keys_button_4.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn4_hotkeyDisplay[i] == lang[32]) {
                btn4_hotkeyDisplay.pop(i);
            }
            else {
                break
            }
        }

        for (var i = 0; i < btn3_hotkeyDisplay.length; i++) {
            if (i == btn3_hotkeyDisplay.length - 1) {
                keys_button_4.insertAdjacentHTML("beforeend", btn4_hotkeyDisplay[i]);
            }
            else {
                keys_button_4.insertAdjacentHTML("beforeend", btn4_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn5_hotkeyDisplay.count(lang[32]) == btn5_hotkeyDisplay.length) {
        keys_button_5.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn5_hotkeyDisplay[i] == lang[32]) {
                btn5_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn5_hotkeyDisplay.length; i++) {
            if (i == btn5_hotkeyDisplay.length - 1) {
                keys_button_5.insertAdjacentHTML("beforeend", btn5_hotkeyDisplay[i]);
            }
            else {
                keys_button_5.insertAdjacentHTML("beforeend", btn5_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn6_hotkeyDisplay.count(lang[32]) == btn6_hotkeyDisplay.length) {
        keys_button_6.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn6_hotkeyDisplay[i] == lang[32]) {
                btn6_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn6_hotkeyDisplay.length; i++) {
            if (i == btn6_hotkeyDisplay.length - 1) {
                keys_button_6.insertAdjacentHTML("beforeend", btn6_hotkeyDisplay[i]);
            }
            else {
                keys_button_6.insertAdjacentHTML("beforeend", btn6_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn7_hotkeyDisplay.count(lang[32]) == btn7_hotkeyDisplay.length) {
        keys_button_7.innerHTML = lang[32];
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn7_hotkeyDisplay[i] == lang[32]) {
                btn7_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn7_hotkeyDisplay.length; i++) {
            if (i == btn7_hotkeyDisplay.length - 1) {
                keys_button_7.insertAdjacentHTML("beforeend", btn7_hotkeyDisplay[i]);
            }
            else {
                keys_button_7.insertAdjacentHTML("beforeend", btn7_hotkeyDisplay[i] + " + ");
            }
        }
    }

    if (btn8_hotkeyDisplay.count(lang[32]) == btn8_hotkeyDisplay.length) {
        keys_button_8.innerHTML = lang[32]
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (btn8_hotkeyDisplay[i] == lang[32]) {
                btn8_hotkeyDisplay.pop(i);
            }
            else {
                break;
            }
        }

        for (var i = 0; i < btn8_hotkeyDisplay.length; i++) {
            if (i == btn8_hotkeyDisplay.length - 1) {
                keys_button_8.insertAdjacentHTML("beforeend", btn8_hotkeyDisplay[i]);
            }
            else {
                keys_button_8.insertAdjacentHTML("beforeend", btn8_hotkeyDisplay[i] + " + ");
            }
        }
    }
}

function connectCDeck() {
    serialPort = new SerialPort({
        path: port_id,
        baudRate: 115200
    })

    serialPort.on('open', (event) => {
        setStatusConnected();

        currently_connected = true
        first_time_error = true
    })

    serialPort.on('data', (event) => {
        let raw_data = Buffer.from(event).toString();
        let raw_data_buffer = "";
        
        if (raw_data.indexOf("\n") == -1) {
            raw_data_buffer += raw_data;
        }
        else {
            raw_data_buffer += raw_data;
            raw_data_buffer.replace("\n", "");

            try {
                let data = JSON.parse(raw_data_buffer);
     
                data.btn1.base_color_hex = rgbToHex(data.btn1.base_color.r, data.btn1.base_color.g, data.btn1.base_color.b);
                data.btn1.fade_color_hex = rgbToHex(data.btn1.fade_color.r, data.btn1.fade_color.g, data.btn1.fade_color.b);

                data.btn2.base_color_hex = rgbToHex(data.btn2.base_color.r, data.btn2.base_color.g, data.btn2.base_color.b);
                data.btn2.fade_color_hex = rgbToHex(data.btn2.fade_color.r, data.btn2.fade_color.g, data.btn2.fade_color.b);

                data.btn3.base_color_hex = rgbToHex(data.btn3.base_color.r, data.btn3.base_color.g, data.btn3.base_color.b);
                data.btn3.fade_color_hex = rgbToHex(data.btn3.fade_color.r, data.btn3.fade_color.g, data.btn3.fade_color.b);

                data.btn4.base_color_hex = rgbToHex(data.btn4.base_color.r, data.btn4.base_color.g, data.btn4.base_color.b);
                data.btn4.fade_color_hex = rgbToHex(data.btn4.fade_color.r, data.btn4.fade_color.g, data.btn4.fade_color.b);

                data.btn5.base_color_hex = rgbToHex(data.btn5.base_color.r, data.btn5.base_color.g, data.btn5.base_color.b);
                data.btn5.fade_color_hex = rgbToHex(data.btn5.fade_color.r, data.btn5.fade_color.g, data.btn5.fade_color.b);

                data.btn6.base_color_hex = rgbToHex(data.btn6.base_color.r, data.btn6.base_color.g, data.btn6.base_color.b);
                data.btn6.fade_color_hex = rgbToHex(data.btn6.fade_color.r, data.btn6.fade_color.g, data.btn6.fade_color.b);

                data.btn7.base_color_hex = rgbToHex(data.btn7.base_color.r, data.btn7.base_color.g, data.btn7.base_color.b);
                data.btn7.fade_color_hex = rgbToHex(data.btn7.fade_color.r, data.btn7.fade_color.g, data.btn7.fade_color.b);

                data.btn8.base_color_hex = rgbToHex(data.btn8.base_color.r, data.btn8.base_color.g, data.btn8.base_color.b);
                data.btn8.fade_color_hex = rgbToHex(data.btn8.fade_color.r, data.btn8.fade_color.g, data.btn8.fade_color.b);

                btn1_cfg = data.btn1;
                btn2_cfg = data.btn2;
                btn3_cfg = data.btn3;
                btn4_cfg = data.btn4;
                btn5_cfg = data.btn5;
                btn6_cfg = data.btn6;
                btn7_cfg = data.btn7;
                btn8_cfg = data.btn8;

                load_values();
     
                fs.writeFileSync(btn1_cfg_path, JSON.stringify(btn1_cfg));
                fs.writeFileSync(btn2_cfg_path, JSON.stringify(btn2_cfg));
                fs.writeFileSync(btn3_cfg_path, JSON.stringify(btn3_cfg));
                fs.writeFileSync(btn4_cfg_path, JSON.stringify(btn4_cfg));
                fs.writeFileSync(btn5_cfg_path, JSON.stringify(btn5_cfg));
                fs.writeFileSync(btn6_cfg_path, JSON.stringify(btn6_cfg));
                fs.writeFileSync(btn7_cfg_path, JSON.stringify(btn7_cfg));
                fs.writeFileSync(btn8_cfg_path, JSON.stringify(btn8_cfg));
            } catch (error) {
                console.log("error: " + error);
                console.log("data: " + raw_data);
                console.log("data_buffer: " + raw_data_buffer);
                console.log("raw_data_buffer: " + JSON.stringify(raw_data_buffer));
            }
        
            raw_data_buffer = ""
        }
    })

    serialPort.on('close', (event) => {
        setStatusNotConnected();
        currently_connected = false;
    })

    serialPort.on('error', function (error) {
        let error_split = error.toString().split(":");
        let _error = error_split[2];
    
        if (_error == " Access denied" && first_time_error) {
            setStatusError();
            first_time_error = false;
        }
    })
}

function setStatusConnected() {
    status_log.innerHTML = "";
    status_log.style.color = "rgb(50, 205, 50)";
    status_log.innerHTML = lang[11];
}

function setStatusError() {
    status_log.innerHTML = "";
    status_log.style.color = "rgb(255, 90, 0)";
    status_log.innerHTML = lang[10];
}

function setStatusNotConnected() {
    status_log.innerHTML = ""
    status_log.style.color = "rgb(255, 230, 0)"
    status_log.innerHTML = lang[9]
}

async function check_ports() {
    SerialPort.list().then(function(ports) {
        ports.forEach(function(port) {
            if (port.serialNumber == serialNumber && !currently_connected) {
                port_id = port.path;
    
                if (main_config.port_id != port_id) {
                    main_config.port_id = port_id;
                    fs.writeFileSync(path.join(assets_path, "config.json"), JSON.stringify(main_config));
                }
    
                connectCDeck();
            }
        });
    });
}

function returnToMainMenu() {
    if (currently_connected) {
        serialPort.close();
    }

    window.location.href = "../index.html";
}

function main() {
    setStatusNotConnected();
    
    document.getElementById("button-1-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-1/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-2-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-2/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-3-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-3/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-4-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-4/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-5-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-5/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-6-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-6/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-7-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-7/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    document.getElementById("button-8-config").addEventListener("click", () => {
        if (currently_connected) {
            if (currently_connected) {
                serialPort.close();
            }
            
            window.location.href = "./button-8/index.html";
        }
        else {
            ipcRenderer.send("toMain_controldeckNotConnected_cfgSite");
        }
    });

    setInterval(check_ports, 50);
    load_values();
}

window.onload = main();