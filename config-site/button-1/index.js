const { SerialPort }  = require("serialport");
const { ipcRenderer } = require("electron");
const fs              = require("fs");
const path            = require("path");

const ipc = ipcRenderer
const assets_path = path.join(path.dirname(path.dirname(__dirname)), "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const btn_cfg_path = path.join(__dirname, "btn-config.json");
let btn_cfg = JSON.parse(fs.readFileSync(btn_cfg_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const keys_lang_path = path.join(assets_path, "lang", main_config.lang_name + "_keys.lang");
const keys_lang = fs.readFileSync(keys_lang_path, "utf-8").split(/\r?\n/);

const serialNumber = main_config.serialNumber;

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

const headline = document.getElementById("headline");
const status_log = document.getElementById("status");

const name_span = document.getElementById("name-span");
const led_base_span = document.getElementById("led-base-span");
const led_fade_span = document.getElementById("led-fade-span");

const apply_span = document.getElementById("apply-span");
const back_span = document.getElementById("back-span");

const name_input = document.getElementById("name_input");
const len_left_output = document.getElementById("len_left");

const led_base_input = document.getElementById("input_led_base");
const led_fade_input = document.getElementById("input_led_fade");

const selects_keys = document.getElementsByClassName("key-input");

const apply_btn = document.getElementById("apply-button");
const back_btn = document.getElementById("back-button");

document.title = lang[0];
headline.innerHTML = lang[12];

led_base_span.innerHTML = lang[21];
led_fade_span.innerHTML = lang[22];
name_span.innerHTML = lang[20];

apply_span.innerHTML = lang[25];
back_span.innerHTML = lang[26];

status_log.innerHTML = "";
status_log.style.color = "rgb(255, 230, 0)";
status_log.innerHTML = lang[9];

let currently_connected = false;
let first_time_error = true;

let first_trigger_unsaved_values = true;
let changed_values = false;

name_input.addEventListener("input", () => {
    updateLenLeft();
    changed_values = true;
});

led_base_input.addEventListener("input", () => { changed_values = true });
led_fade_input.addEventListener("input", () => { changed_values = true });

for (var i = 0; i < 5; i++) {
    Object.keys(conversion_hid_lang).forEach((val) => {
        var opt = document.createElement("option");
        opt.value = val;
        opt.text = conversion_hid_lang[val];

        selects_keys[i].options.add(opt);
    });
}

apply_btn.addEventListener("click", apply);

back_btn.addEventListener("click", () => {
    if (currently_connected) {
        if (changed_values) {
            if (name_input.value.length > 0) {
                ipc.send("toMain_askForExit");
            }
            else {
                ipc.send("toMain_askForExit_nameIncomplete");
            }
        }
        else {
            returnToMainMenu();
        }
    }
    else if (!currently_connected && changed_values){
        ipc.send("toMain_controldeckNotConnected")
    }
    else {
        window.location.href = "../index.html";
    }
});

function apply() {
    if (currently_connected) {
        if (name_input.value.length > 0) {      
            let led_base_clr = led_base_input.value;
            let led_fade_clr = led_fade_input.value;

            let led_base_clr_rgb = hexToRgb(led_base_clr);
            let led_fade_clr_rgb = hexToRgb(led_fade_clr);

            data = {
                type: "update-btn1",

                name: name_input.value,
                base_color: {
                    r: led_base_clr_rgb.r,
                    g: led_base_clr_rgb.g,
                    b: led_base_clr_rgb.b,
                },
                fade_color: {
                    r: led_fade_clr_rgb.r,
                    g: led_fade_clr_rgb.g,
                    b: led_fade_clr_rgb.b,
                },
                keys: {
                    key1: parseInt(document.getElementById("key1-select").value),
                    key2: parseInt(document.getElementById("key2-select").value),
                    key3: parseInt(document.getElementById("key3-select").value),
                    key4: parseInt(document.getElementById("key4-select").value),
                    key5: parseInt(document.getElementById("key5-select").value),
                }
            };

            serialPort.write(JSON.stringify(data) + "\n");

            ipc.send("toMain_savedValues");
            ipc.send("toMain_applied");

            changed_values = false;
            firstTrigger = true;
        }
        else {
            ipc.send("toMain_nameIncomplete");
        }
    }
    else {
        ipc.send("toMain_controldeckNotConnected");
    }
}

function connectXDeck() {
    serialPort = new SerialPort({
        path: port_id,
        baudRate: 115200
    });

    serialPort.on("open", (event) => {
        ipc.send("toMain_connected");
        let data = { type: "request-update" };

        setTimeout(() => {
            serialPort.write(JSON.stringify(data) + "\n");
        }, 50);

        setStatusConnected();

        currently_connected = true;
        first_time_error = true;
    })

    serialPort.on("data", (event) => {
        let raw_data_single = Buffer.from(event).toString();
        let raw_data_buffer = "";
        
        if (raw_data_single.indexOf("\n") == -1) {
            raw_data_buffer += raw_data_single;
        }
        else {
            raw_data_buffer += raw_data_single;
            raw_data_buffer.replace("\n", "");

            try {
                let data = JSON.parse(raw_data_buffer);
                delete data.type;
    
                data.btn1.base_color_hex = rgbToHex(data.btn1.base_color.r, data.btn1.base_color.g, data.btn1.base_color.b);
                data.btn1.fade_color_hex = rgbToHex(data.btn1.fade_color.r, data.btn1.fade_color.g, data.btn1.fade_color.b);

                btn_cfg = data.btn1;

                name_input.value = data.btn1.name;
                updateLenLeft();

                led_base_input.value = data.btn1.base_color_hex;
                led_fade_input.value = data.btn1.fade_color_hex;

                hotkeyDisplay = [];

                hotkeyDisplay.push(data.btn1.keys.key1);
                hotkeyDisplay.push(data.btn1.keys.key2);
                hotkeyDisplay.push(data.btn1.keys.key3);
                hotkeyDisplay.push(data.btn1.keys.key4);
                hotkeyDisplay.push(data.btn1.keys.key5);

                for (var i = 0; i < hotkeyDisplay.length; i++) {
                    selects_keys[i].value = hotkeyDisplay[i];
                }
    
                fs.writeFileSync(btn_cfg_path, JSON.stringify(data.btn1, null, 2));
            } catch (error) {
                console.log("error: " + error);
                console.log("data: " + raw_data_single);
                console.log("data_buffer: " + raw_data_buffer);
                console.log("raw_data_buffer: " + JSON.stringify(raw_data_buffer));
            }

            raw_data_single = "";
            raw_data_buffer = "";
        }
    });

    serialPort.on("close", () => {
        ipc.send("toMain_disconnected");
        setStatusNotConnected();
        currently_connected = false;
    });

    serialPort.on("error", function (error) {
        let error_split = error.toString().split(":");
        let _error = error_split[2];
    
        if (_error == " Access denied" && first_time_error) {
            setStatusError();
            firstTime = false;
        }
    });
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
                    fs.writeFileSync(path.join(assets_path, "config.json"), JSON.stringify(main_config, null, 2));
                }
    
                connectXDeck();
            }
        });
    });
}

function load_values() {
    name_input.value = btn_cfg.name;
    updateLenLeft();

    led_base_input.value = btn_cfg.base_color_hex;
    led_fade_input.value = btn_cfg.fade_color_hex;

    hotkeyDisplay = [];

    hotkeyDisplay.push(btn_cfg.keys.key1);
    hotkeyDisplay.push(btn_cfg.keys.key2);
    hotkeyDisplay.push(btn_cfg.keys.key3);
    hotkeyDisplay.push(btn_cfg.keys.key4);
    hotkeyDisplay.push(btn_cfg.keys.key5);

    for (var i = 0; i < hotkeyDisplay.length; i++) {
        selects_keys[i].value = hotkeyDisplay[i]
    }
}

function returnToMainMenu() {
    if (currently_connected) {
        serialPort.close();
    }

    window.location.href = "../index.html";
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
  
function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function updateLenLeft() {
    name_value = name_input.value;
    name_len = name_value.length;

    len_left = 20 - name_len;

    if (len_left < 0) {
        len_left = 0;
        name_input.value = name_value.substring(0, 20);
        len_left_output.style.color = "red";
        len_left_output.innerHTML = 0;
    }
    else if (len_left <= 1) {
        len_left_output.style.color = "red";
    }
    else if (len_left <= 5) {
        len_left_output.style.color = "orange";
    }
    else {
        len_left_output.style.color = "";
    }

    len_left_output.innerHTML = len_left;
}

function main() {
    setStatusNotConnected();
    
    setInterval(() => {
        if (changed_values && first_trigger_unsaved_values) {
            ipc.send("toMain_unsavedValues");
            first_trigger_unsaved_values = false;
        }
    
        check_ports();
    }, 50);

    load_values();
}

ipc.on("toRenderer_dialog-apply", (event, arg) => {
    apply();
    
    ipc.send("toMain_savedValues");
    ipc.send("toMain_dialog-close");

    window.location.href = path.join(path.dirname(__dirname), "index.html");
})

ipc.on("toRenderer_disconnect", (event, arg) => {
    returnToMainMenu();
})

window.onload = main();