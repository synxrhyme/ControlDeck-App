const fs = require('fs')
const { SerialPort }  = require('serialport')
const { ipcRenderer } = require("electron")

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\r?\n/)

let headline = document.getElementById("headline")

let log = document.getElementById("log")
let status_log = document.getElementById("status")
let edit_spans = document.getElementsByClassName("edit-span")
let back_span = document.getElementById("back-span")

document.title = lang[0]
headline.innerHTML = lang[3]

for (let i = 0; i < edit_spans.length; i++) {
    edit_spans[i].innerHTML = lang[8]
}

log.innerHTML = lang[7]
back_span.innerHTML = lang[6]

status_log.innerHTML = ""
status_log.style.color = "rgb(255, 230, 0)"
status_log.innerHTML = lang[9]

const conversion_hid_code_lang = {
    0x00: lang[32],
    0x04: lang[33],
    0x05: lang[34],
    0x06: lang[35],
    0x07: lang[36],
    0x08: lang[37],
    0x09: lang[38],
    0x0A: lang[39],
    0x0B: lang[40],
    0x0C: lang[41],
    0x0D: lang[42],
    0x0E: lang[43],
    0x0F: lang[44],
    0x10: lang[45],
    0x11: lang[46],
    0x12: lang[47],
    0x13: lang[48],
    0x14: lang[49],
    0x15: lang[50],
    0x16: lang[51],
    0x17: lang[52],
    0x18: lang[53],
    0x19: lang[54],
    0x1A: lang[55],
    0x1B: lang[56],
    0x1C: lang[57],
    0x1D: lang[58],
    0x1E: lang[60],
    0x1F: lang[61],
    0x20: lang[62],
    0x21: lang[63],
    0x22: lang[64],
    0x23: lang[65],
    0x24: lang[66],
    0x25: lang[67],
    0x26: lang[68],
    0x27: lang[59],
    0x28: lang[80],
    0x29: lang[81],
    0x2A: lang[82],
    0x2B: lang[83],
    0x2C: lang[84],
    0x2D: lang[85],
    0x2E: lang[86],
    0x2F: lang[87],
    0x30: lang[88],
    0x31: lang[89],
    0x33: lang[90],
    0x34: lang[91],
    0x35: lang[92],
    0x36: lang[93],
    0x37: lang[94],
    0x39: lang[95],
    0x3A: lang[96],
    0x3B: lang[97],
    0x3C: lang[98],
    0x3D: lang[99],
    0x3E: lang[100],
    0x3F: lang[101],
    0x40: lang[102],
    0x41: lang[103],
    0x42: lang[104],
    0x43: lang[105], 
    0x44: lang[106], 
    0x45: lang[107], 
    0x46: lang[108],
    0x47: lang[109],
    0x48: lang[110],
    0x49: lang[111],
    0x4A: lang[112],
    0x4B: lang[113],
    0x4C: lang[114],
    0x4D: lang[115],
    0x4E: lang[116],
    0x4F: lang[117],
    0x50: lang[118],
    0x51: lang[119],
    0x52: lang[120],
    0x53: lang[121],
    0x54: lang[122],
    0x55: lang[123],
    0x56: lang[124],
    0x57: lang[125],
    0x58: lang[126],
    0x59: lang[127],
    0x5A: lang[128],
    0x5B: lang[129],
    0x5C: lang[130],
    0x5D: lang[131],
    0x5E: lang[132],
    0x5F: lang[133],
    0x60: lang[134],
    0x61: lang[135],
    0x62: lang[136],
    0x4D: lang[137],
    0x52: lang[138],
    0x4E: lang[139],
    0x50: lang[140],
    0x4F: lang[141],
    0x4A: lang[142],
    0x51: lang[143],
    0x4B: lang[144],
    0x49: lang[145],
    0x63: lang[146],
    0x64: lang[147],
    0x64: lang[148],
    0x67: lang[149],
    0x68: lang[150],
    0x69: lang[151],
    0x6A: lang[152],
    0x6B: lang[153],
    0x6C: lang[154],
    0x6D: lang[155],
    0x6E: lang[156],
    0x6F: lang[157],
    0x70: lang[158],
    0x71: lang[159],
    0x72: lang[160],
    0x73: lang[161],
    0xE0: lang[162],
    0xE1: lang[163],
    0xE2: lang[164],
    0xE3: lang[165],
    0xE4: lang[166],
    0xE5: lang[167],
    0xE6: lang[168],
    0xE7: lang[169],
}

let port_serialNumber = "7&2E21021&0&0000"

let record_method = general_config[3]

let serialPort
let currently_connected = false
let firstTime = true

let led1base_rgb = []
let led1base_hex = ""
let led2base_rgb = []
let led2base_hex = ""
let led3base_rgb = []
let led3base_hex = ""
let led4base_rgb = []
let led4base_hex = ""
let led5base_rgb = []
let led5base_hex = ""
let led6base_rgb = []
let led6base_hex = ""
let led7base_rgb = []
let led7base_hex = ""
let led8base_rgb = []
let led8base_hex = ""

let data_array = []
let data_array_newline = []
let complete_data_str = ""
let data_str = ""
let newData = true

let led1fade_rgb = []
let led1fade_hex
let led2fade_rgb = []
let led2fade_hex
let led3fade_rgb = []
let led3fade_hex
let led4fade_rgb = []
let led4fade_hex
let led5fade_rgb = []
let led5fade_hex
let led6fade_rgb = []
let led6fade_hex
let led7fade_rgb = []
let led7fade_hex
let led8fade_rgb = []
let led8fade_hex

let btn1_cfg = ""
let btn2_cfg = ""
let btn3_cfg = ""
let btn4_cfg = ""
let btn5_cfg = ""
let btn6_cfg = ""
let btn7_cfg = ""
let btn8_cfg = ""

let btn1_cfg_array = []
let btn2_cfg_array = []
let btn3_cfg_array = []
let btn4_cfg_array = []
let btn5_cfg_array = []
let btn6_cfg_array = []
let btn7_cfg_array = []
let btn8_cfg_array = []

let name_button_1 = document.getElementById("name-button-1")
let name_button_2 = document.getElementById("name-button-2")
let name_button_3 = document.getElementById("name-button-3")
let name_button_4 = document.getElementById("name-button-4")
let name_button_5 = document.getElementById("name-button-5")
let name_button_6 = document.getElementById("name-button-6")
let name_button_7 = document.getElementById("name-button-7")
let name_button_8 = document.getElementById("name-button-8")

let keys_button_1 = document.getElementById("keys-button-1")
let keys_button_2 = document.getElementById("keys-button-2")
let keys_button_3 = document.getElementById("keys-button-3")
let keys_button_4 = document.getElementById("keys-button-4")
let keys_button_5 = document.getElementById("keys-button-5")
let keys_button_6 = document.getElementById("keys-button-6")
let keys_button_7 = document.getElementById("keys-button-7")
let keys_button_8 = document.getElementById("keys-button-8")

checkPorts()

function update_values() {
    document.getElementById("button-1-config").addEventListener("click", () => {
        window.location.href = "./button-1/" + record_method + "/index.html"
    })
    /*
    document.getElementById("button-2-config").addEventListener("click", () => {
        window.location.href = "./button-2/" + record_method + "/index.html"
    })
    document.getElementById("button-3-config").addEventListener("click", () => {
        window.location.href = "./button-3/" + record_method + "/index.html"
    })
    document.getElementById("button-4-config").addEventListener("click", () => {
        window.location.href = "./button-4/" + record_method + "/index.html"
    })
    document.getElementById("button-5-config").addEventListener("click", () => {
        window.location.href = "./button-5/" + record_method + "/index.html"
    })
    document.getElementById("button-6-config").addEventListener("click", () => {
        window.location.href = "./button-6/" + record_method + "/index.html"
    })
    document.getElementById("button-7-config").addEventListener("click", () => {
        window.location.href = "./button-7/" + record_method + "/index.html"
    })
    document.getElementById("button-8-config").addEventListener("click", () => {
        window.location.href = "./button-8/" + record_method + "/index.html"
    })
    */

    btn1_cfg = fs.readFileSync("./config-site/button-1/config.cfg", "utf-8")
    btn2_cfg = fs.readFileSync("./config-site/button-2/config.cfg", "utf-8")
    btn3_cfg = fs.readFileSync("./config-site/button-3/config.cfg", "utf-8")
    btn4_cfg = fs.readFileSync("./config-site/button-4/config.cfg", "utf-8")
    btn5_cfg = fs.readFileSync("./config-site/button-5/config.cfg", "utf-8")
    btn6_cfg = fs.readFileSync("./config-site/button-6/config.cfg", "utf-8")
    btn7_cfg = fs.readFileSync("./config-site/button-7/config.cfg", "utf-8")
    btn8_cfg = fs.readFileSync("./config-site/button-8/config.cfg", "utf-8")

    btn1_cfg_array = btn1_cfg.split(/\r?\n/)
    btn2_cfg_array = btn2_cfg.split(/\r?\n/)
    btn3_cfg_array = btn3_cfg.split(/\r?\n/)
    btn4_cfg_array = btn4_cfg.split(/\r?\n/)
    btn5_cfg_array = btn5_cfg.split(/\r?\n/)
    btn6_cfg_array = btn6_cfg.split(/\r?\n/)
    btn7_cfg_array = btn7_cfg.split(/\r?\n/)
    btn8_cfg_array = btn8_cfg.split(/\r?\n/)

    name_button_1.innerHTML = btn1_cfg_array[0].toString()
    name_button_2.innerHTML = btn2_cfg_array[0].toString()
    name_button_3.innerHTML = btn3_cfg_array[0].toString()
    name_button_4.innerHTML = btn4_cfg_array[0].toString()
    name_button_5.innerHTML = btn5_cfg_array[0].toString()
    name_button_6.innerHTML = btn6_cfg_array[0].toString()
    name_button_7.innerHTML = btn7_cfg_array[0].toString()
    name_button_8.innerHTML = btn8_cfg_array[0].toString()

    keys_button_1.innerHTML = ""
    keys_button_2.innerHTML = ""
    keys_button_3.innerHTML = ""
    keys_button_4.innerHTML = ""
    keys_button_5.innerHTML = ""
    keys_button_6.innerHTML = ""
    keys_button_7.innerHTML = ""
    keys_button_8.innerHTML = ""

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_1.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn1_cfg_array[i]])
        } else {
            keys_button_1.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn1_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_2.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn2_cfg_array[i]])
        } else {
            keys_button_2.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn2_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_3.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn3_cfg_array[i]])
        } else {
            keys_button_3.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn3_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_4.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn4_cfg_array[i]])
        } else {
            keys_button_4.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn4_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_5.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn5_cfg_array[i]])
        } else {
            keys_button_5.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn5_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_6.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn6_cfg_array[i]])
        } else {
            keys_button_6.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn6_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_7.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn7_cfg_array[i]])
        } else {
            keys_button_7.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn7_cfg_array[i]] + " + ")
        }
    }

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            keys_button_8.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn8_cfg_array[i]])
        } else {
            keys_button_8.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn8_cfg_array[i]] + " + ")
        }
    }
}

function connectCDeck() {
    serialPort = new SerialPort({
        path: port,
        baudRate: 115200
    })

    serialPort.on('open', () => {  
        document.getElementById("button-1-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-2-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-3-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-4-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-5-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-6-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-7-config").addEventListener("click", disconnect_cdeck)
        document.getElementById("button-8-config").addEventListener("click", disconnect_cdeck)

        document.getElementById("back-button").addEventListener("click", disconnect_cdeck)

        status_log.innerHTML = ""
        status_log.style.color = "rgb(50, 205, 50)"
        status_log.innerHTML = lang[11]

        currently_connected = true
        firstTime = true

        setTimeout(() => {
            serialPort.write("cdeck_program_open\n", function(err) {})
        }, 100)
    })

    serialPort.on('data', function (data) {
        data_str = data.toString()

        if (newData) {
            complete_data_str = ""
            complete_data_str = data_str
        }
        else {
            complete_data_str = complete_data_str.concat(data_str)
        }

        if (data_str.indexOf("-") == -1) {
            newData = false
        }
        else {
            newData = true

            end_marker_index = complete_data_str.indexOf("-")
            complete_data_str = complete_data_str.slice(0, end_marker_index) + complete_data_str.slice(end_marker_index + 1)

            data_array_newline = complete_data_str.split(/\r?\n/)
            data_array_newline.length = data_array_newline.length - 1

            for (line_index in data_array_newline) {
                line = data_array_newline[line_index]
                data_array = line.split(",")

                if (data_array[0] == "name1") {
                    btn1_name = data_array[1]
                    fs.writeFileSync("./config-site/button-1/config.cfg", btn1_name + "\n")
                }
                else if (data_array[0] == "name2") {
                    btn2_name = data_array[1]
                    fs.writeFileSync("./config-site/button-2/config.cfg", btn2_name + "\n")
                }
                else if (data_array[0] == "name3") {
                    btn3_name = data_array[1]
                    fs.writeFileSync("./config-site/button-3/config.cfg", btn3_name + "\n")
                }
                else if (data_array[0] == "name4") {
                    btn4_name = data_array[1]
                    fs.writeFileSync("./config-site/button-4/config.cfg", btn4_name + "\n")
                }
                else if (data_array[0] == "name5") {
                    btn5_name = data_array[1]
                    fs.writeFileSync("./config-site/button-5/config.cfg", btn5_name + "\n")
                }  
                else if (data_array[0] == "name6") {
                    btn6_name = data_array[1]
                    fs.writeFileSync("./config-site/button-6/config.cfg", btn6_name + "\n")
                }
                else if (data_array[0] == "name7") {
                    btn7_name = data_array[1]
                    fs.writeFileSync("./config-site/button-7/config.cfg", btn7_name + "\n")
                }
                else if (data_array[0] == "name8") {
                    btn8_name = data_array[1]
                    fs.writeFileSync("./config-site/button-8/config.cfg", btn8_name + "\n")
                }
                else if (data_array[0] == "led1base") {
                    values = data_array[1].toString()
                    led1base_rgb = values.split("/")
                    led1base_hex = rgbToHex(parseInt(led1base_rgb[0]), parseInt(led1base_rgb[1]), parseInt(led1base_rgb[2]))
                    fs.appendFileSync("./config-site/button-1/config.cfg", led1base_hex + "\n")
                }
                else if (data_array[0] == "led2base") {
                    values = data_array[1].toString()
                    led2base_rgb = values.split("/")
                    led2base_hex = rgbToHex(parseInt(led2base_rgb[0]), parseInt(led2base_rgb[1]), parseInt(led2base_rgb[2]))
                    fs.appendFileSync("./config-site/button-2/config.cfg", led2base_hex + "\n")
                }
                else if (data_array[0] == "led3base") {
                    values = data_array[1].toString()
                    led3base_rgb = values.split("/")
                    led3base_hex = rgbToHex(parseInt(led3base_rgb[0]), parseInt(led3base_rgb[1]), parseInt(led3base_rgb[2]))
                    fs.appendFileSync("./config-site/button-3/config.cfg", led3base_hex + "\n")
                }
                else if (data_array[0] == "led4base") {
                    values = data_array[1].toString()
                    led4base_rgb = values.split("/")
                    led4base_hex = rgbToHex(parseInt(led4base_rgb[0]), parseInt(led4base_rgb[1]), parseInt(led4base_rgb[2]))
                    fs.appendFileSync("./config-site/button-4/config.cfg", led4base_hex + "\n")
                }
                else if (data_array[0] == "led5base") {
                    values = data_array[1].toString()
                    led5base_rgb = values.split("/")
                    led5base_hex = rgbToHex(parseInt(led5base_rgb[0]), parseInt(led5base_rgb[1]), parseInt(led5base_rgb[2]))
                    fs.appendFileSync("./config-site/button-5/config.cfg", led5base_hex + "\n")
                }
                else if (data_array[0] == "led6base") {
                    values = data_array[1].toString()
                    led6base_rgb = values.split("/")
                    led6base_hex = rgbToHex(parseInt(led6base_rgb[0]), parseInt(led6base_rgb[1]), parseInt(led6base_rgb[2]))
                    fs.appendFileSync("./config-site/button-6/config.cfg", led6base_hex + "\n")
                }
                else if (data_array[0] == "led7base") {
                    values = data_array[1].toString()
                    led7base_rgb = values.split("/")
                    led7base_hex = rgbToHex(parseInt(led7base_rgb[0]), parseInt(led7base_rgb[1]), parseInt(led7base_rgb[2]))
                    fs.appendFileSync("./config-site/button-7/config.cfg", led7base_hex + "\n")
                }
                else if (data_array[0] == "led8base") {
                    values = data_array[1].toString()
                    led8base_rgb = values.split("/")
                    led8base_hex = rgbToHex(parseInt(led8base_rgb[0]), parseInt(led8base_rgb[1]), parseInt(led8base_rgb[2]))
                    fs.appendFileSync("./config-site/button-8/config.cfg", led8base_hex + "\n")
                }
                else if (data_array[0] == "led1fade") {
                    values = data_array[1].toString()
                    led1fade_rgb = values.split("/")
                    led1fade_hex = rgbToHex(parseInt(led1fade_rgb[0]), parseInt(led1fade_rgb[1]), parseInt(led1fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-1/config.cfg", led1fade_hex + "\n")
                }
                else if (data_array[0] == "led2fade") {
                    values = data_array[1].toString()
                    led2fade_rgb = values.split("/")
                    led2fade_hex = rgbToHex(parseInt(led2fade_rgb[0]), parseInt(led2fade_rgb[1]), parseInt(led2fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-2/config.cfg", led2fade_hex + "\n")
                }
                else if (data_array[0] == "led3fade") {
                    values = data_array[1].toString()
                    led3fade_rgb = values.split("/")
                    led3fade_hex = rgbToHex(parseInt(led3fade_rgb[0]), parseInt(led3fade_rgb[1]), parseInt(led3fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-3/config.cfg", led3fade_hex + "\n")
                }
                else if (data_array[0] == "led4fade") {
                    values = data_array[1].toString()
                    led4fade_rgb = values.split("/")
                    led4fade_hex = rgbToHex(parseInt(led4fade_rgb[0]), parseInt(led4fade_rgb[1]), parseInt(led4fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-4/config.cfg", led4fade_hex + "\n")
                }
                else if (data_array[0] == "led5fade") {
                    values = data_array[1].toString()
                    led5fade_rgb = values.split("/")
                    led5fade_hex = rgbToHex(parseInt(led5fade_rgb[0]), parseInt(led5fade_rgb[1]), parseInt(led5fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-5/config.cfg", led5fade_hex + "\n")
                }
                else if (data_array[0] == "led6fade") {
                    values = data_array[1].toString()
                    led6fade_rgb = values.split("/")
                    led6fade_hex = rgbToHex(parseInt(led6fade_rgb[0]), parseInt(led6fade_rgb[1]), parseInt(led6fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-6/config.cfg", led6fade_hex + "\n")
                }
                else if (data_array[0] == "led7fade") {
                    values = data_array[1].toString()
                    led7fade_rgb = values.split("/")
                    led7fade_hex = rgbToHex(parseInt(led7fade_rgb[0]), parseInt(led7fade_rgb[1]), parseInt(led7fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-7/config.cfg", led7fade_hex + "\n")
                }
                else if (data_array[0] == "led8fade") {
                    values = data_array[1].toString()
                    led8fade_rgb = values.split("/")
                    led8fade_hex = rgbToHex(parseInt(led8fade_rgb[0]), parseInt(led8fade_rgb[1]), parseInt(led8fade_rgb[2]))
                    fs.appendFileSync("./config-site/button-8/config.cfg", led8fade_hex + "\n")
                }
                else if (data_array[0] == "btn1") {
                    values = data_array[1].toString()
                    btn1_keys = values.split("/")
                    for (key in btn1_keys) {
                        if (key != btn1_keys.length - 1) {
                            fs.appendFileSync("./config-site/button-1/config.cfg", btn1_keys[key] + "\n")
                        } else {
                            fs.appendFileSync("./config-site/button-1/config.cfg", btn1_keys[key])
                        }
                    }
                }
                else if (data_array[0] == "btn2") {
                    values = data_array[1].toString()
                    btn2_keys = values.split("/")
                    for (key in btn2_keys) {
                          if (key != btn2_keys.length - 1) {
                              fs.appendFileSync("./config-site/button-2/config.cfg", btn2_keys[key] + "\n")
                          } else {
                              fs.appendFileSync("./config-site/button-2/config.cfg", btn2_keys[key])
                          }
                    }
                }
                else if (data_array[0] == "btn3") {
                    values = data_array[1].toString()
                    btn3_keys = values.split("/")
                    for (key in btn3_keys) {
                        if (key != btn3_keys.length - 1) {
                            fs.appendFileSync("./config-site/button-3/config.cfg", btn3_keys[key] + "\n")
                        } else {
                            fs.appendFileSync("./config-site/button-3/config.cfg", btn3_keys[key])
                        }
                    }
                }
                else if (data_array[0] == "btn4") {
                    values = data_array[1].toString()
                    btn4_keys = values.split("/")
                    for (key in btn4_keys) {
                        if (key != btn4_keys.length - 1) {
                          fs.appendFileSync("./config-site/button-4/config.cfg", btn4_keys[key] + "\n")
                          } else {
                              fs.appendFileSync("./config-site/button-4/config.cfg", btn4_keys[key])
                          }
                }
                }
                else if (data_array[0] == "btn5") {
                    values = data_array[1].toString()
                    btn5_keys = values.split("/")
                    for (key in btn5_keys) {
                        if (key != btn5_keys.length - 1) {
                            fs.appendFileSync("./config-site/button-5/config.cfg", btn5_keys[key] + "\n")
                        }
                        else {
                            fs.appendFileSync("./config-site/button-5/config.cfg", btn5_keys[key])
                        }
                    }
                }
                else if (data_array[0] == "btn6") {
                    values = data_array[1].toString()
                    btn6_keys = values.split("/")
                    for (key in btn6_keys) {
                        if (key != btn6_keys.length - 1) {
                            fs.appendFileSync("./config-site/button-6/config.cfg", btn6_keys[key] + "\n")
                        }
                        else {
                            fs.appendFileSync("./config-site/button-6/config.cfg", btn6_keys[key])
                        }
                    }
                }
                else if (data_array[0] == "btn7") {
                    values = data_array[1].toString()
                    btn7_keys = values.split("/")
                    for (key in btn7_keys) {
                        if (key != btn7_keys.length - 1) {
                              fs.appendFileSync("./config-site/button-7/config.cfg", btn7_keys[key] + "\n")
                        }
                        else {
                              fs.appendFileSync("./config-site/button-7/config.cfg", btn7_keys[key])
                        }
                    }
                }
                else if (data_array[0] == "btn8") {
                    values = data_array[1].toString()
                    btn8_keys = values.split("/")
                    for (key in btn8_keys) {
                        if (key != btn8_keys.length - 1) {
                            fs.appendFileSync("./config-site/button-8/config.cfg", btn8_keys[key] + "\n")
                        }
                        else {
                            fs.appendFileSync("./config-site/button-8/config.cfg", btn8_keys[key])
                        }
                    }
                }
            }
        }

        update_values()
    })

    serialPort.on('close', () => {
        document.getElementById("button-1-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-2-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-3-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-4-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-5-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-6-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-7-config").removeEventListener("click", disconnect_cdeck)
        document.getElementById("button-8-config").removeEventListener("click", disconnect_cdeck)

        document.getElementById("back-button").removeEventListener("click", disconnect_cdeck)

        status_log.innerHTML = ""
        status_log.style.color = "rgb(255, 230, 0)"
        status_log.innerHTML = lang[9]

        currently_connected = false
    })

    serialPort.on('error', function (err) {
        err_str = err.toString()
        error_array = err_str.split(":")
        error = error_array[2]
    
        if (error == " Access denied" && firstTime) {
            status_log.innerHTML = ""
            status_log.style.color = "rgb(255, 90, 0)"
            status_log.innerHTML = lang[10]

            firstTime = false
        }
    })
}

async function checkPorts() {
    setInterval(() => {
        SerialPort.list().then(function(ports) {
            ports.forEach(function(fn_port) {
                if (fn_port.serialNumber == port_serialNumber && !currently_connected) {
                    port = fn_port.path

                    let temp_general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)

                    if (temp_general_config[0] != port) {
                        temp_config_save[0] = port
                        fs.writeFileSync("./config.cfg", "")

                        for (let i = 0; i < temp_general_config.length; i++) {
                            if (i != temp_general_config.length - 1) {
                                fs.appendFileSync("./config.cfg", temp_general_config[i] + "\n")
                            }
                            else {
                                fs.appendFileSync("./config.cfg", temp_general_config[i])
                            }
                        }
                    }        

                    connectCDeck()
                }
            })
        })
    }, 100)
}

function componentToHex(c) {
    hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function disconnect_cdeck() {
    serialPort.close()
}

window.onload = update_values()