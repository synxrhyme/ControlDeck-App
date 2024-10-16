const fs = require("fs")
const { SerialPort }  = require("serialport")
const { ipcRenderer, dialog } = require('electron')
const path = require("path")

const ipc = ipcRenderer
const assets_path = path.join(path.dirname(path.dirname(path.dirname(__dirname))), "resources", "assets")
const btn_cfg_path = path.join(path.dirname(__dirname), "btn-config.cfg")
const general_config = fs.readFileSync(path.join(assets_path, "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(assets_path, "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\r?\n/)

Object.defineProperties(Array.prototype, { count: { value: function(value) { return this.filter(x => x==value).length }}})
const conversion_hid_code_lang = { 0x00: lang[32], 0x04: lang[33], 0x05: lang[34], 0x06: lang[35], 0x07: lang[36], 0x08: lang[37], 0x09: lang[38], 0x0A: lang[39], 0x0B: lang[40], 0x0C: lang[41], 0x0D: lang[42], 0x0E: lang[43], 0x0F: lang[44], 0x10: lang[45], 0x11: lang[46], 0x12: lang[47], 0x13: lang[48], 0x14: lang[49], 0x15: lang[50], 0x16: lang[51], 0x17: lang[52], 0x18: lang[53], 0x19: lang[54], 0x1A: lang[55], 0x1B: lang[56], 0x1C: lang[57], 0x1D: lang[58], 0x1E: lang[60], 0x1F: lang[61], 0x20: lang[62], 0x21: lang[63], 0x22: lang[64], 0x23: lang[65], 0x24: lang[66], 0x25: lang[67], 0x26: lang[68], 0x27: lang[59], 0x28: lang[80], 0x29: lang[81], 0x2A: lang[82], 0x2B: lang[83], 0x2C: lang[84], 0x2D: lang[85], 0x2E: lang[86], 0x2F: lang[87], 0x30: lang[88], 0x31: lang[89], 0x33: lang[90], 0x34: lang[91], 0x35: lang[92], 0x36: lang[93], 0x37: lang[94], 0x39: lang[95], 0x3A: lang[96], 0x3B: lang[97], 0x3C: lang[98], 0x3D: lang[99], 0x3E: lang[100], 0x3F: lang[101], 0x40: lang[102], 0x41: lang[103], 0x42: lang[104], 0x43: lang[105], 0x44: lang[106], 0x45: lang[107], 0x46: lang[108], 0x47: lang[109], 0x48: lang[110], 0x49: lang[111], 0x4A: lang[112], 0x4B: lang[113], 0x4C: lang[114], 0x4D: lang[115], 0x4E: lang[116], 0x4F: lang[117], 0x50: lang[118], 0x51: lang[119], 0x52: lang[120], 0x53: lang[121], 0x54: lang[122], 0x55: lang[123], 0x56: lang[124], 0x57: lang[125], 0x58: lang[126], 0x59: lang[127], 0x5A: lang[128], 0x5B: lang[129], 0x5C: lang[130], 0x5D: lang[131], 0x5E: lang[132], 0x5F: lang[133], 0x60: lang[134], 0x61: lang[135], 0x62: lang[136], 0x4D: lang[137], 0x52: lang[138], 0x4E: lang[139], 0x50: lang[140], 0x4F: lang[141], 0x4A: lang[142], 0x51: lang[143], 0x4B: lang[144], 0x49: lang[145], 0x63: lang[146], 0x64: lang[147], 0x64: lang[148], 0x67: lang[149], 0x68: lang[150], 0x69: lang[151], 0x6A: lang[152], 0x6B: lang[153], 0x6C: lang[154], 0x6D: lang[155], 0x6E: lang[156], 0x6F: lang[157], 0x70: lang[158], 0x71: lang[159], 0x72: lang[160], 0x73: lang[161], 0xE0: lang[162], 0xE1: lang[163], 0xE2: lang[164], 0xE3: lang[165], 0xE4: lang[166], 0xE5: lang[167], 0xE6: lang[168], 0xE7: lang[169] }
const conversion_code_hid_lang = { [lang[32]]: 0x00, [lang[33]]: 0x04, [lang[34]]: 0x05, [lang[35]]: 0x06, [lang[36]]: 0x07, [lang[37]]: 0x08, [lang[38]]: 0x09, [lang[39]]: 0x0A, [lang[40]]: 0x0B, [lang[41]]: 0x0C, [lang[42]]: 0x0D, [lang[43]]: 0x0E, [lang[44]]: 0x0F, [lang[45]]: 0x10, [lang[46]]: 0x11, [lang[47]]: 0x12, [lang[48]]: 0x13, [lang[49]]: 0x14, [lang[50]]: 0x15, [lang[51]]: 0x16, [lang[52]]: 0x17, [lang[53]]: 0x18, [lang[54]]: 0x19, [lang[55]]: 0x1A, [lang[56]]: 0x1B, [lang[57]]: 0x1C, [lang[58]]: 0x1D, [lang[60]]: 0x1E, [lang[61]]: 0x1F, [lang[62]]: 0x20, [lang[63]]: 0x21, [lang[64]]: 0x22, [lang[65]]: 0x23, [lang[66]]: 0x24, [lang[67]]: 0x25, [lang[68]]: 0x26, [lang[59]]: 0x27, [lang[80]]: 0x28, [lang[81]]: 0x29, [lang[82]]: 0x2A, [lang[83]]: 0x2B, [lang[84]]: 0x2C, [lang[85]]: 0x2D, [lang[86]]: 0x2E, [lang[87]]: 0x2F, [lang[88]]: 0x30, [lang[89]]: 0x31, [lang[90]]: 0x33, [lang[91]]: 0x34, [lang[92]]: 0x35, [lang[93]]: 0x36, [lang[94]]: 0x37, [lang[95]]: 0x39, [lang[96]]: 0x3A, [lang[97]]: 0x3B, [lang[98]]: 0x3C, [lang[99]]: 0x3D, [lang[100]]: 0x3E, [lang[101]]: 0x3F, [lang[102]]: 0x40, [lang[103]]: 0x41, [lang[104]]: 0x42, [lang[105]]: 0x43,  [lang[106]]: 0x44,  [lang[107]]: 0x45,  [lang[108]]: 0x46, [lang[109]]: 0x47, [lang[110]]: 0x48, [lang[111]]: 0x49, [lang[112]]: 0x4A, [lang[113]]: 0x4B, [lang[114]]: 0x4C, [lang[115]]: 0x4D, [lang[116]]: 0x4E, [lang[117]]: 0x4F, [lang[118]]: 0x50, [lang[119]]: 0x51, [lang[120]]: 0x52, [lang[121]]: 0x53, [lang[122]]: 0x54, [lang[123]]: 0x55, [lang[124]]: 0x56, [lang[125]]: 0x57, [lang[126]]: 0x58, [lang[127]]: 0x59, [lang[128]]: 0x5A, [lang[129]]: 0x5B, [lang[130]]: 0x5C, [lang[131]]: 0x5D, [lang[132]]: 0x5E, [lang[133]]: 0x5F, [lang[134]]: 0x60, [lang[135]]: 0x61, [lang[136]]: 0x62, [lang[137]]: 0x4D, [lang[138]]: 0x52, [lang[139]]: 0x4E, [lang[140]]: 0x50, [lang[141]]: 0x4F, [lang[142]]: 0x4A, [lang[143]]: 0x51, [lang[144]]: 0x4B, [lang[145]]: 0x49, [lang[146]]: 0x63, [lang[147]]: 0x64, [lang[148]]: 0x64, [lang[149]]: 0x67, [lang[150]]: 0x68, [lang[151]]: 0x69, [lang[152]]: 0x6A, [lang[153]]: 0x6B, [lang[154]]: 0x6C, [lang[155]]: 0x6D, [lang[156]]: 0x6E, [lang[157]]: 0x6F, [lang[158]]: 0x70, [lang[159]]: 0x71, [lang[160]]: 0x72, [lang[161]]: 0x73, [lang[162]]: 0xE0, [lang[163]]: 0xE1, [lang[164]]: 0xE2, [lang[165]]: 0xE3, [lang[166]]: 0xE4, [lang[167]]: 0xE5, [lang[168]]: 0xE6, [lang[169]]: 0xE7 }

let firstTrigger = true

ipc.on("toRenderer_dialog-apply", (event, arg) => {
    apply()
    
    ipc.send("toMain_savedValues")
    ipc.send("toMain_dialog-close")

    window.location.href = path.join(path.dirname(path.dirname(__dirname)), "index.html")
})

ipc.on("toRenderer_disconnect", (event, arg) => {
    disconnect_cdeck()
})

let headline = document.getElementById("headline")
let log = document.getElementById("log")
let status_log = document.getElementById("status")

let name_span = document.getElementById("name-span")
let led_base_span = document.getElementById("led-base-span")
let led_fade_span = document.getElementById("led-fade-span")

let apply_span = document.getElementById("apply-span")
let back_span = document.getElementById("back-span")

document.title = lang[0]
headline.innerHTML = lang[12]

led_base_span.innerHTML = lang[21]
led_fade_span.innerHTML = lang[22]
name_span.innerHTML = lang[20]

log.innerHTML = lang[7]

apply_span.innerHTML = lang[25]
back_span.innerHTML = lang[26]

status_log.innerHTML = ""
status_log.style.color = "rgb(255, 230, 0)"
status_log.innerHTML = lang[9]

let keysPressed = []

let serialPort
let port

let led_base_input = document.getElementById("input_led_base")
let led_fade_input = document.getElementById("input_led_fade")

let port_serialNumber = "7&2E21021&0&0000"
let currently_connected = false
let firstTime = true

let gen_btn_cfg = fs.readFileSync(btn_cfg_path, "utf-8")
let gen_btn_cfg_array = gen_btn_cfg.split(/\r?\n/)

let hotkey        = []
let hotkeyCode    = []
let hotkeyDisplayFinal = []
let hotkeyDisplay = []

hotkeyDisplay.push(conversion_hid_code_lang[gen_btn_cfg_array[3]])
hotkeyDisplay.push(conversion_hid_code_lang[gen_btn_cfg_array[4]])
hotkeyDisplay.push(conversion_hid_code_lang[gen_btn_cfg_array[5]])
hotkeyDisplay.push(conversion_hid_code_lang[gen_btn_cfg_array[6]])
hotkeyDisplay.push(conversion_hid_code_lang[gen_btn_cfg_array[7]])

let config = []
let config_str = ""

let error_array = []
let error

let changed_values = false

let hovering_button = false
let recording = false
let started_record = false

const text_anim = [
    { opacity: 0 },
    { opacity: 1 },
]
  
const text_anim_timing = {
    duration: 180,
    iterations: 1,
}

len_left_output = document.getElementById("len_left")

name_input = document.getElementById("name_input")
name_input.addEventListener("input", () => {
    updateLenLeft()
    changed_values = true
})

led_base_input = document.getElementById("input_led_base")
led_fade_input = document.getElementById("input_led_fade")

led_base_input.value = gen_btn_cfg_array[1]
led_fade_input.value = gen_btn_cfg_array[2]

log = document.getElementById("log")
output = document.getElementById("output")

document.getElementById("back-button").addEventListener("click", () => {
    if (currently_connected) {
        if (name_input.value.length > 0) {
            if (changed_values) {
                ipc.send("toMain_askForExit")
            }
            else {
                window.location.href = "../../index.html"
            }
        }
        else {
            ipc.send("toMain_nameIncomplete")
        }
    }
    else if (!currently_connected && changed_values){
        ipc.send("toMain_controldeckNotConnected")
    }
    else {
        window.location.href = "../../index.html"
    }
})

document.getElementById("input_led_base").addEventListener("input", () => {
    changed_values = true
})

document.getElementById("input_led_fade").addEventListener("input", () => {
    changed_values = true
})

apply_btn = document.getElementById("apply")
apply_btn.addEventListener('click', apply)

start_btn = document.getElementById('start')
start_btn.addEventListener('click', () => {
    started_record = !started_record

    if (started_record) {
        changeStyleToRecording(start_btn)
        timeoutHandler = setTimeout(timeoutStopRecording, 3000)

        document.addEventListener('keydown', startRecording)
        document.addEventListener('keyup', stopRecording)
    } else {
        clearTimeout(timeoutHandler)
        exitStopRecording();
    }
})

start_btn_text = document.getElementById("text")
start_btn.addEventListener("mouseenter", makeReady)
start_btn.addEventListener("focus", makeReady)

function makeReady() {
    hovering_button = true
    start_btn.style.width = "170px"

    setTimeout(() => {
        start_btn_text.animate(text_anim, text_anim_timing)

        if (!started_record) {
            start_btn_text.insertAdjacentHTML("beforeend", lang[23])
            start_btn_text.innerHTML = lang[23]
        }
        else {
            start_btn_text.insertAdjacentHTML("beforeend", lang[24])
            start_btn_text.innerHTML = lang[24]
        }

    }, 180)
}

start_btn.addEventListener("mouseleave", unReady)
start_btn.addEventListener("focusout", unReady)

function unReady() {
    hovering_button = false;
    start_btn_text.innerHTML = ""
    start_btn.style.width = "40px"
    setTimeout(() => {
        start_btn_text.innerHTML = ""
    }, 180)
}

function changeStyleToRecording(element) {
    if (hovering_button) {
        start_btn_text.insertAdjacentHTML("beforeend", lang[24])
        start_btn_text.innerHTML = lang[24]
    }

    element.style.backgroundColor = "rgba(255, 0, 0, 0.7)"
    element.style.boxShadow = "0px 0px 15px 1px red"
    element.style.border = "1px solid red"
}

function changeStyleToNormal(element) {
    if (hovering_button) {
        start_btn_text.insertAdjacentHTML("beforeend", lang[23])
        start_btn_text.innerHTML = lang[23]
    }
    
    element.style.backgroundColor = ""
    element.style.boxShadow = ""
    element.style.border = ""
}

function startRecording(event) {
    if (!recording) {
        keysPressed = []
        hotkey = []
        hotkeyCode = []
        hotkeyDisplay = []
        hotkeyDisplayFinal = []
        recording = true
        clearTimeout(timeoutHandler)
        output.innerHTML = ""
    }

    if (!hotkey.includes(event.key)) {
        keysPressed.push(event.key)
        hotkey.push(event.key)

        if (event.getModifierState("NumLock")) {
            if (event.code.substring(0, 6) == "Numpad") {
                hotkeyCode.push(event.code + "NumLock")
            }
            else {
                hotkeyCode.push(event.code)
            }
        }
        else {
            hotkeyCode.push(event.code)
        }

        hotkeyDisplay.push(event.key.toUpperCase())
    }
}
    
function stopRecording(event, reason) {
    const index = keysPressed.indexOf(event.key);
    if (index > -1) {
        keysPressed.splice(index, 1)
    }
    if (keysPressed.length === 0 && recording && started_record) {
        document.removeEventListener('keydown', startRecording)
        document.removeEventListener('keyup', stopRecording)
        recording = false
        started_record = false
        changeStyleToNormal(start_btn)
    
        if (reason == null) {
            updateDisplayHotkey()
        }
    }
}

function timeoutStopRecording() {
    recording = false
    started_record = false
    changeStyleToNormal(start_btn);

    document.removeEventListener('keydown', startRecording)
    document.removeEventListener('keyup', stopRecording)
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function exitStopRecording() {
    recording = false
    started_record = false
    changeStyleToNormal(start_btn)

    document.removeEventListener('keydown', startRecording)
    document.removeEventListener('keyup', stopRecording)
}

function updateDisplayHotkey() {
    for (i = 0; i < hotkeyDisplay.length; i++) {
        if (hotkeyDisplay[i] != undefined) {
            if (i == hotkeyDisplay.length - 1) {
                output.insertAdjacentHTML("beforeend", hotkeyDisplay[i])
            }
            else {
                output.insertAdjacentHTML("beforeend", hotkeyDisplay[i] + " + ")
            }
        }
    }
}

function apply() {
    if (!currently_connected) {
        if (name_input.value.length > 0) {
            config[0] = name_input.value
            
            let led_base_clr = led_base_input.value
            let led_fade_clr = led_fade_input.value

            config[1] = led_base_clr
            config[2] = led_fade_clr

            hotkeyDisplayFinal = []

            for (var i = 0; i < hotkeyDisplay.length; i++) {
                hotkeyDisplayFinal.push(hotkeyDisplay[i])
            }

            if (hotkeyDisplay.length < 5) {
                for (var i = 4; i >= hotkeyDisplay.length; i--) {
                    console.log("i:", i)
                    hotkeyDisplayFinal[i] = lang[32]
                }
            }
            for (var i = 0; i < 5; i++) {
                config[i + 3] = conversion_code_hid_lang[hotkeyDisplayFinal[i]]
            }

            fs.writeFileSync(path.join(path.dirname(__dirname), "btn-config.cfg"), "")
            
            for (var i = 0; i < config.length; i++) {
                if (i == config.length - 1) {
                    console.log("cfg last:", i, "val:", config[i])
                    fs.appendFileSync(path.join(path.dirname(__dirname), "btn-config.cfg"), config[i].toString())
                }
                else {
                    console.log("cfg nrml, i:", i, "val:", config[i])
                    fs.appendFileSync(path.join(path.dirname(__dirname), "btn-config.cfg"), config[i].toString() + "\n")
                }
            }

            let led_base_clr_rgb = hexToRgb(led_base_clr)
            let led_fade_clr_rgb = hexToRgb(led_fade_clr)

            config[1] = led_base_clr_rgb.r + "/" + led_base_clr_rgb.g + "/" + led_base_clr_rgb.b
            config[2] = led_fade_clr_rgb.r + "/" + led_fade_clr_rgb.g + "/" + led_fade_clr_rgb.b

            //serialPort.write("name1,"    + config[0] + "\n")
            //serialPort.write("led1base," + config[1] + "\n")
            //serialPort.write("led1fade," + config[2] + "\n")
            
            var temp_str = "btn1,"

            for (var i = 3; i < config.length; i++) {
                if (i == config.length - 1) {
                    temp_str += config[i]
                }
                else {
                    temp_str += config[i] + "/"
                }
            }

            //serialPort.write(temp_str + "\n")

            ipc.send("toMain_savedValues")
            ipc.send("toMain_applied")

            changed_values = false
            firstTrigger = true
        }
        else {
            ipc.send("toMain_nameIncomplete")
        }
    }
    else {
        ipc.send("toMain_controldeckNotConnected")
    }
}

function connectCDeck() {
    serialPort = new SerialPort({
        path: port,
        baudRate: 115200
    })

    serialPort.on("open", () => {
        ipc.send("toMain_connected")
        document.getElementById("back-button").addEventListener("click", disconnect_cdeck)

        status_log.innerHTML = ""
        status_log.style.color = "rgb(50, 205, 50)"
        status_log.innerHTML = lang[11]

        currently_connected = true
        firstTime = true
    })

    serialPort.on("data", () => {
        ;
    })

    serialPort.on("close", () => {
        ipc.send("toMain_disconnected")
        document.getElementById("back-button").removeEventListener("click", disconnect_cdeck)

        status_log.innerHTML = ""
        status_log.style.color = "rgb(255, 230, 0)"
        status_log.innerHTML = lang[9]

        currently_connected = false
    })

    serialPort.on("error", function (err) {
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

async function init() {
    update_values()
    setTimeout(checkPorts, 100)
}

async function checkPorts() {
    setInterval(() => {
        SerialPort.list().then(function(ports) {
            ports.forEach(function(fn_port) {
                if (fn_port.serialNumber == port_serialNumber && !currently_connected) {
                    port = fn_port.path

                    let temp_general_config = fs.readFileSync(path.join(assets_path, "config.cfg"), "utf-8").split(/\r?\n/)

                    if (temp_general_config[0] != port) {
                        temp_config_save[0] = port
                        fs.writeFileSync(path.join(assets_path, "config.cfg"), "")

                        for (let i = 0; i < temp_general_config.length; i++) {
                            if (i != temp_general_config.length - 1) {
                                fs.appendFileSync(path.join(assets_path, "config.cfg"), temp_general_config[i] + "\n")
                            }
                            else {
                                fs.appendFileSync(path.join(assets_path, "config.cfg"), temp_general_config[i])
                            }
                        }
                    }        

                    connectCDeck()
                }
            })
        })
    }, 100)
}

function update_values() {
    btn_cfg = fs.readFileSync(btn_cfg_path, "utf-8")
    btn_cfg_array = btn_cfg.split(/\r?\n/)

    name_input.value = btn_cfg_array[0]
    updateLenLeft()

    led_base_input.value = btn_cfg_array[1]
    led_fade_input.value = btn_cfg_array[2]

    hotkeyDisplay = []

    hotkeyDisplay.push(conversion_hid_code_lang[btn_cfg_array[3]])
    hotkeyDisplay.push(conversion_hid_code_lang[btn_cfg_array[4]])
    hotkeyDisplay.push(conversion_hid_code_lang[btn_cfg_array[5]])
    hotkeyDisplay.push(conversion_hid_code_lang[btn_cfg_array[6]])
    hotkeyDisplay.push(conversion_hid_code_lang[btn_cfg_array[7]])

    output.innerHTML = ""

    if (hotkeyDisplay.count(lang[32]) == hotkeyDisplay.length) {
        output.innerHTML = lang[32]
    }
    else {
        for (var i = 4; i >= 0; i--) {
            if (hotkeyDisplay[i] == lang[32]) {
                hotkeyDisplay.pop(i)
            }
            else {
                break
            }
        }

        for (var i = 0; i < hotkeyDisplay.length; i++) {
            if (i == hotkeyDisplay.length - 1) {
                output.insertAdjacentHTML("beforeend", hotkeyDisplay[i])
            }
            else {
                output.insertAdjacentHTML("beforeend", hotkeyDisplay[i] + " + ")
            }
        }
    }
}

function disconnect_cdeck() {
    if (currently_connected) {
        serialPort.close()
    }
}

function updateLenLeft() {
    name_value = name_input.value
    name_len = name_value.length

    len_left = 20 - name_len

    if (len_left < 0) {
        len_left = 0
        name_input.value = name_value.substring(0, 20)
        len_left_output.style.color = "red"
        len_left_output.innerHTML = 0
    }
    else if (len_left <= 1) {
        len_left_output.style.color = "red"
    }
    else if (len_left <= 5) {
        len_left_output.style.color = "orange"
    }
    else {
        len_left_output.style.color = ""
    }

    len_left_output.innerHTML = len_left
}

setInterval(() => {
    if (changed_values && firstTrigger) {
        ipc.send("toMain_unsavedValues")

        firstTrigger = false
    }
}, 50)

window.onload = init()