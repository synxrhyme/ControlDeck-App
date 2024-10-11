const fs = require("fs")
const { SerialPort }  = require("serialport")
const { ipcRenderer, dialog } = require('electron')
const ipc = ipcRenderer

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\r?\n/)

let firstTrigger = true

let lang_32 =  lang[32] 
let lang_33 =  lang[33] 
let lang_34 =  lang[34] 
let lang_35 =  lang[35] 
let lang_36 =  lang[36] 
let lang_37 =  lang[37] 
let lang_38 =  lang[38] 
let lang_39 =  lang[39] 
let lang_40 =  lang[40] 
let lang_41 =  lang[41] 
let lang_42 =  lang[42] 
let lang_43 =  lang[43] 
let lang_44 =  lang[44] 
let lang_45 =  lang[45] 
let lang_46 =  lang[46] 
let lang_47 =  lang[47] 
let lang_48 =  lang[48] 
let lang_49 =  lang[49] 
let lang_50 =  lang[50] 
let lang_51 =  lang[51] 
let lang_52 =  lang[52] 
let lang_53 =  lang[53] 
let lang_54 =  lang[54] 
let lang_55 =  lang[55] 
let lang_56 =  lang[56] 
let lang_57 =  lang[57] 
let lang_58 =  lang[58] 
let lang_60 =  lang[60] 
let lang_61 =  lang[61] 
let lang_62 =  lang[62] 
let lang_63 =  lang[63] 
let lang_64 =  lang[64] 
let lang_65 =  lang[65] 
let lang_66 =  lang[66] 
let lang_67 =  lang[67] 
let lang_68 =  lang[68] 
let lang_59 =  lang[59] 
let lang_80 =  lang[80] 
let lang_81 =  lang[81] 
let lang_82 =  lang[82] 
let lang_83 =  lang[83] 
let lang_84 =  lang[84] 
let lang_85 =  lang[85] 
let lang_86 =  lang[86] 
let lang_87 =  lang[87] 
let lang_88 =  lang[88] 
let lang_89 =  lang[89] 
let lang_90 =  lang[90] 
let lang_91 =  lang[91] 
let lang_92 =  lang[92] 
let lang_93 =  lang[93] 
let lang_94 =  lang[94] 
let lang_95 =  lang[95] 
let lang_96 =  lang[96] 
let lang_97 =  lang[97] 
let lang_98 =  lang[98] 
let lang_99 =  lang[99] 
let lang_100 = lang[100]
let lang_101 = lang[101]
let lang_102 = lang[102]
let lang_103 = lang[103]
let lang_104 = lang[104]
let lang_105 = lang[105]
let lang_106 = lang[106]
let lang_107 = lang[107]
let lang_108 = lang[108]
let lang_109 = lang[109]
let lang_110 = lang[110]
let lang_111 = lang[111]
let lang_112 = lang[112]
let lang_113 = lang[113]
let lang_114 = lang[114]
let lang_115 = lang[115]
let lang_116 = lang[116]
let lang_117 = lang[117]
let lang_118 = lang[118]
let lang_119 = lang[119]
let lang_120 = lang[120]
let lang_121 = lang[121]
let lang_122 = lang[122]
let lang_123 = lang[123]
let lang_124 = lang[124]
let lang_125 = lang[125]
let lang_126 = lang[126]
let lang_127 = lang[127]
let lang_128 = lang[128]
let lang_129 = lang[129]
let lang_130 = lang[130]
let lang_131 = lang[131]
let lang_132 = lang[132]
let lang_133 = lang[133]
let lang_134 = lang[134]
let lang_135 = lang[135]
let lang_136 = lang[136]
let lang_137 = lang[137]
let lang_138 = lang[138]
let lang_139 = lang[139]
let lang_140 = lang[140]
let lang_141 = lang[141]
let lang_142 = lang[142]
let lang_143 = lang[143]
let lang_144 = lang[144]
let lang_145 = lang[145]
let lang_146 = lang[146]
let lang_147 = lang[147]
let lang_148 = lang[148]
let lang_149 = lang[149]
let lang_150 = lang[150]
let lang_151 = lang[151]
let lang_152 = lang[152]
let lang_153 = lang[153]
let lang_154 = lang[154]
let lang_155 = lang[155]
let lang_156 = lang[156]
let lang_157 = lang[157]
let lang_158 = lang[158]
let lang_159 = lang[159]
let lang_160 = lang[160]
let lang_161 = lang[161]
let lang_162 = lang[162]
let lang_163 = lang[163]
let lang_164 = lang[164]
let lang_165 = lang[165]
let lang_166 = lang[166]
let lang_167 = lang[167]
let lang_168 = lang[168]
let lang_169 = lang[169]

const conversion_hid_code_lang = {
    0x00: [lang_32],
    0x04: [lang_33],
    0x05: [lang_34],
    0x06: [lang_35],
    0x07: [lang_36],
    0x08: [lang_37],
    0x09: [lang_38],
    0x0A: [lang_39],
    0x0B: [lang_40],
    0x0C: [lang_41],
    0x0D: [lang_42],
    0x0E: [lang_43],
    0x0F: [lang_44],
    0x10: [lang_45],
    0x11: [lang_46],
    0x12: [lang_47],
    0x13: [lang_48],
    0x14: [lang_49],
    0x15: [lang_50],
    0x16: [lang_51],
    0x17: [lang_52],
    0x18: [lang_53],
    0x19: [lang_54],
    0x1A: [lang_55],
    0x1B: [lang_56],
    0x1C: [lang_57],
    0x1D: [lang_58],
    0x1E: [lang_60],
    0x1F: [lang_61],
    0x20: [lang_62],
    0x21: [lang_63],
    0x22: [lang_64],
    0x23: [lang_65],
    0x24: [lang_66],
    0x25: [lang_67],
    0x26: [lang_68],
    0x27: [lang_59],
    0x28: [lang_80],
    0x29: [lang_81],
    0x2A: [lang_82],
    0x2B: [lang_83],
    0x2C: [lang_84],
    0x2D: [lang_85],
    0x2E: [lang_86],
    0x2F: [lang_87],
    0x30: [lang_88],
    0x31: [lang_89],
    0x33: [lang_90],
    0x34: [lang_91],
    0x35: [lang_92],
    0x36: [lang_93],
    0x37: [lang_94],
    0x39: [lang_95],
    0x3A: [lang_96],
    0x3B: [lang_97],
    0x3C: [lang_98],
    0x3D: [lang_99],
    0x3E: [lang_100],
    0x3F: [lang_101],
    0x40: [lang_102],
    0x41: [lang_103],
    0x42: [lang_104],
    0x43: [lang_105], 
    0x44: [lang_106], 
    0x45: [lang_107], 
    0x46: [lang_108],
    0x47: [lang_109],
    0x48: [lang_110],
    0x49: [lang_111],
    0x4A: [lang_112],
    0x4B: [lang_113],
    0x4C: [lang_114],
    0x4D: [lang_115],
    0x4E: [lang_116],
    0x4F: [lang_117],
    0x50: [lang_118],
    0x51: [lang_119],
    0x52: [lang_120],
    0x53: [lang_121],
    0x54: [lang_122],
    0x55: [lang_123],
    0x56: [lang_124],
    0x57: [lang_125],
    0x58: [lang_126],
    0x59: [lang_127],
    0x5A: [lang_128],
    0x5B: [lang_129],
    0x5C: [lang_130],
    0x5D: [lang_131],
    0x5E: [lang_132],
    0x5F: [lang_133],
    0x60: [lang_134],
    0x61: [lang_135],
    0x62: [lang_136],
    0x4D: [lang_137],
    0x52: [lang_138],
    0x4E: [lang_139],
    0x50: [lang_140],
    0x4F: [lang_141],
    0x4A: [lang_142],
    0x51: [lang_143],
    0x4B: [lang_144],
    0x49: [lang_145],
    0x63: [lang_146],
    0x64: [lang_147],
    0x64: [lang_148],
    0x67: [lang_149],
    0x68: [lang_150],
    0x69: [lang_151],
    0x6A: [lang_152],
    0x6B: [lang_153],
    0x6C: [lang_154],
    0x6D: [lang_155],
    0x6E: [lang_156],
    0x6F: [lang_157],
    0x70: [lang_158],
    0x71: [lang_159],
    0x72: [lang_160],
    0x73: [lang_161],
    0xE0: [lang_162],
    0xE1: [lang_163],
    0xE2: [lang_164],
    0xE3: [lang_165],
    0xE4: [lang_166],
    0xE5: [lang_167],
    0xE6: [lang_168],
    0xE7: [lang_169],
}

const conversion_code_hid_lang = {
    [lang_32]: 0x00,
    [lang_33]: 0x04,
    [lang_34]: 0x05,
    [lang_35]: 0x06,
    [lang_36]: 0x07,
    [lang_37]: 0x08,
    [lang_38]: 0x09,
    [lang_39]: 0x0A,
    [lang_40]: 0x0B,
    [lang_41]: 0x0C,
    [lang_42]: 0x0D,
    [lang_43]: 0x0E,
    [lang_44]: 0x0F,
    [lang_45]: 0x10,
    [lang_46]: 0x11,
    [lang_47]: 0x12,
    [lang_48]: 0x13,
    [lang_49]: 0x14,
    [lang_50]: 0x15,
    [lang_51]: 0x16,
    [lang_52]: 0x17,
    [lang_53]: 0x18,
    [lang_54]: 0x19,
    [lang_55]: 0x1A,
    [lang_56]: 0x1B,
    [lang_57]: 0x1C,
    [lang_58]: 0x1D,
    [lang_60]: 0x1E,
    [lang_61]: 0x1F,
    [lang_62]: 0x20,
    [lang_63]: 0x21,
    [lang_64]: 0x22,
    [lang_65]: 0x23,
    [lang_66]: 0x24,
    [lang_67]: 0x25,
    [lang_68]: 0x26,
    [lang_59]: 0x27,
    [lang_80]: 0x28,
    [lang_81]: 0x29,
    [lang_82]: 0x2A,
    [lang_83]: 0x2B,
    [lang_84]: 0x2C,
    [lang_85]: 0x2D,
    [lang_86]: 0x2E,
    [lang_87]: 0x2F,
    [lang_88]: 0x30,
    [lang_89]: 0x31,
    [lang_90]: 0x33,
    [lang_91]: 0x34,
    [lang_92]: 0x35,
    [lang_93]: 0x36,
    [lang_94]: 0x37,
    [lang_95]: 0x39,
    [lang_96]: 0x3A,
    [lang_97]: 0x3B,
    [lang_98]: 0x3C,
    [lang_99]: 0x3D,
    [lang_100]: 0x3E,
    [lang_101]: 0x3F,
    [lang_102]: 0x40,
    [lang_103]: 0x41,
    [lang_104]: 0x42,
    [lang_105]: 0x43, 
    [lang_106]: 0x44, 
    [lang_107]: 0x45, 
    [lang_108]: 0x46,
    [lang_109]: 0x47,
    [lang_110]: 0x48,
    [lang_111]: 0x49,
    [lang_112]: 0x4A,
    [lang_113]: 0x4B,
    [lang_114]: 0x4C,
    [lang_115]: 0x4D,
    [lang_116]: 0x4E,
    [lang_117]: 0x4F,
    [lang_118]: 0x50,
    [lang_119]: 0x51,
    [lang_120]: 0x52,
    [lang_121]: 0x53,
    [lang_122]: 0x54,
    [lang_123]: 0x55,
    [lang_124]: 0x56,
    [lang_125]: 0x57,
    [lang_126]: 0x58,
    [lang_127]: 0x59,
    [lang_128]: 0x5A,
    [lang_129]: 0x5B,
    [lang_130]: 0x5C,
    [lang_131]: 0x5D,
    [lang_132]: 0x5E,
    [lang_133]: 0x5F,
    [lang_134]: 0x60,
    [lang_135]: 0x61,
    [lang_136]: 0x62,
    [lang_137]: 0x4D,
    [lang_138]: 0x52,
    [lang_139]: 0x4E,
    [lang_140]: 0x50,
    [lang_141]: 0x4F,
    [lang_142]: 0x4A,
    [lang_143]: 0x51,
    [lang_144]: 0x4B,
    [lang_145]: 0x49,
    [lang_146]: 0x63,
    [lang_147]: 0x64,
    [lang_148]: 0x64,
    [lang_149]: 0x67,
    [lang_150]: 0x68,
    [lang_151]: 0x69,
    [lang_152]: 0x6A,
    [lang_153]: 0x6B,
    [lang_154]: 0x6C,
    [lang_155]: 0x6D,
    [lang_156]: 0x6E,
    [lang_157]: 0x6F,
    [lang_158]: 0x70,
    [lang_159]: 0x71,
    [lang_160]: 0x72,
    [lang_161]: 0x73,
    [lang_162]: 0xE0,
    [lang_163]: 0xE1,
    [lang_164]: 0xE2,
    [lang_165]: 0xE3,
    [lang_166]: 0xE4,
    [lang_167]: 0xE5,
    [lang_168]: 0xE6,
    [lang_169]: 0xE7,
}

ipc.on("dialog-apply", (event, arg) => {
    apply()
    window.location.href = "../../index.html"
    
    ipc.send("savedValues")
    ipc.send("dialog-close")
})

ipc.on("dialog-exit", (event, arg) => {
    window.location.href = "../../index.html"

    ipc.send("savedValues")
    ipc.send("dialog-close")
})

ipc.on("dialog-cancel", (event, arg) => {
    ipc.send("dialog-close")
})

ipc.on("errorbox-redirect", () => {
    window.location.href = "../../index.html"
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

let current_path = "./config-site/button-1/"

let keysPressed = []

let serialPort
let port

let port_serialNumber = "7&2E21021&0&0000"
let currently_connected = false
let firstTime = true

let key1
let key2
let key3
let key4
let key5

let hotkey = []
let hotkeyCode = []
let hotkeyHIDCode = []
let hotkeyDisplay = []

let led_base
let led_fade

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

led_base_input.value = led_base
led_fade_input.value = led_fade

hotkeyDisplay.push(key1)
hotkeyDisplay.push(key2)
hotkeyDisplay.push(key3)
hotkeyDisplay.push(key4)
hotkeyDisplay.push(key5)

updateDisplayHotkey()

log = document.getElementById("log")
output = document.getElementById("output")

document.getElementById("back-button").addEventListener("click", () => {
    if (currently_connected) {
        if (name_input.value.length > 0) {
            if (changed_values) {
                ipc.send("askForExit")
            }
            else {
                window.location.href = "../../index.html"
            }
        }
        else {
            ipc.send("nameIncomplete")
        }
    }
    else {
        ipc.send("controldeckNotConnected")
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
        hotkeyHIDCode = []
        hotkeyDisplay = []
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

            hotkeyCode.forEach((key) => {
                hotkeyHIDCode.push(conversion_hid_code_lang[key])
            })
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
    if (currently_connected) {
        if (name_input.value.length > 0) {
            config[0] = name_input.value
            config[1] = led_base_input.value
            config[2] = led_fade_input.value

            for (i in hotkeyDisplay) {
                h = parseInt(i) + 3
                config[h] = conversion_code_hid_lang[hotkeyDisplay[i]]
            }

            hotkey_length = hotkeyDisplay.length

            if (hotkey_length < 5) {
                for (let i = 5; i <= hotkeyDisplay.length; i--) {
                    config[i + 3] = 0
                }
            }

            fs.writeFileSync(current_path + "config.cfg", "")
            
            for (var i = 0; i < config.length; i++) {
                if (i == config.length - 1) {
                    fs.appendFileSync(current_path + "config.cfg", config[i].toString())
                }
                else {
                    fs.appendFileSync(current_path + "config.cfg", config[i].toString() + "\n")
                }
            }

            serialPort.write("name1," + config[0] + "\n")
            serialPort.write("led1base," + config[1] + "\n")
            serialPort.write("led1fade," + config[2] + "\n")
            
            var temp_str = "btn1,"

            for (var i = 3; i < config.length; i++) {
                if (config[i] == config.length - 1) {
                    temp_str += config[i]
                }
                else {
                    temp_str += config[i] + "/"
                }
            }

            serialPort.write(temp_str + "\n")

            ipc.send("savedValues")
            ipc.send("applied")

            changed_values = false
            firstTrigger = true
        }
        else {
            ipc.send("nameIncomplete")
        }
    }
    else {
        ipc.send("controldeckNotConnected")
    }
}

function componentToHex(c) {
    hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

function connectCDeck() {
    serialPort = new SerialPort({
        path: port,
        baudRate: 115200
    })

    serialPort.on("open", () => {
        ipc.send("connected")
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
        ipc.send("disconnected")
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

function update_values() {
    btn_cfg = fs.readFileSync(current_path + "config.cfg", "utf-8")
    btn_cfg_array = btn_cfg.split(/\r?\n/)

    name_input.value = btn_cfg_array[0]
    updateLenLeft()

    led_base_input.value = btn_cfg_array[1]
    led_fade_input.value = btn_cfg_array[2]

    output.innerHTML = ""

    for (i = 3; i < 8; i++) {
        if (i == 7) {
            output.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn_cfg_array[i]])
        } else {
            output.insertAdjacentHTML("beforeend", conversion_hid_code_lang[btn_cfg_array[i]] + " + ")
        }
    }
}

function disconnect_cdeck() {
    serialPort.close()
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
        ipc.send("unsavedValues")

        firstTrigger = false
    }
}, 50)

window.onload = init()