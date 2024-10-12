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
const lang = lang_str.split(/\n?\r/)

let firstTrigger = true

const lang_32 = lang[32]; const lang_33 = lang[33]; const lang_34 = lang[34]; const lang_35 = lang[35]; const lang_36 = lang[36]; const lang_37 = lang[37]; const lang_38 = lang[38]; const lang_39 = lang[39]; const lang_40 = lang[40]; const lang_41 = lang[41]; const lang_42 = lang[42]; const lang_43 = lang[43]; const lang_44 = lang[44]; const lang_45 = lang[45]; const lang_46 = lang[46]; const lang_47 = lang[47]; const lang_48 = lang[48]; const lang_49 = lang[49]; const lang_50 = lang[50]; const lang_51 = lang[51]; const lang_52 = lang[52]; const lang_53 = lang[53]; const lang_54 = lang[54]; const lang_55 = lang[55]; const lang_56 = lang[56]; const lang_57 = lang[57]; const lang_58 = lang[58]; const lang_60 = lang[60]; const lang_61 = lang[61]; const lang_62 = lang[62]; const lang_63 = lang[63]; const lang_64 = lang[64]; const lang_65 = lang[65]; const lang_66 = lang[66]; const lang_67 = lang[67]; const lang_68 = lang[68]; const lang_59 = lang[59]; const lang_80 = lang[80]; const lang_81 = lang[81]; const lang_82 = lang[82]; const lang_83 = lang[83]; const lang_84 = lang[84]; const lang_85 = lang[85]; const lang_86 = lang[86]; const lang_87 = lang[87]; const lang_88 = lang[88]; const lang_89 = lang[89]; const lang_90 = lang[90]; const lang_91 = lang[91]; const lang_92 = lang[92]; const lang_93 = lang[93]; const lang_94 = lang[94]; const lang_95 = lang[95]; const lang_96 = lang[96]; const lang_97 = lang[97]; const lang_98 = lang[98]; const lang_99 = lang[99]; const lang_100 = lang[100]; const lang_101 = lang[101]; const lang_102 = lang[102]; const lang_103 = lang[103]; const lang_104 = lang[104]; const lang_105 = lang[105]; const lang_106 = lang[106]; const lang_107 = lang[107]; const lang_108 = lang[108]; const lang_109 = lang[109]; const lang_110 = lang[110]; const lang_111 = lang[111]; const lang_112 = lang[112]; const lang_113 = lang[113]; const lang_114 = lang[114]; const lang_115 = lang[115]; const lang_116 = lang[116]; const lang_117 = lang[117]; const lang_118 = lang[118]; const lang_119 = lang[119]; const lang_120 = lang[120]; const lang_121 = lang[121]; const lang_122 = lang[122]; const lang_123 = lang[123]; const lang_124 = lang[124]; const lang_125 = lang[125]; const lang_126 = lang[126]; const lang_127 = lang[127]; const lang_128 = lang[128]; const lang_129 = lang[129]; const lang_130 = lang[130]; const lang_131 = lang[131]; const lang_132 = lang[132]; const lang_133 = lang[133]; const lang_134 = lang[134]; const lang_135 = lang[135]; const lang_136 = lang[136]; const lang_137 = lang[137]; const lang_138 = lang[138]; const lang_139 = lang[139]; const lang_140 = lang[140]; const lang_141 = lang[141]; const lang_142 = lang[142]; const lang_143 = lang[143]; const lang_144 = lang[144]; const lang_145 = lang[145]; const lang_146 = lang[146]; const lang_147 = lang[147]; const lang_148 = lang[148]; const lang_149 = lang[149]; const lang_150 = lang[150]; const lang_151 = lang[151]; const lang_152 = lang[152]; const lang_153 = lang[153]; const lang_154 = lang[154]; const lang_155 = lang[155]; const lang_156 = lang[156]; const lang_157 = lang[157]; const lang_158 = lang[158]; const lang_159 = lang[159]; const lang_160 = lang[160]; const lang_161 = lang[161]; const lang_162 = lang[162]; const lang_163 = lang[163]; const lang_164 = lang[164]; const lang_165 = lang[165]; const lang_166 = lang[166]; const lang_167 = lang[167]; const lang_168 = lang[168]; const lang_169 = lang[169]

const conversion_hid_code_lang = { 0x00: [lang_32], 0x04: [lang_33], 0x05: [lang_34], 0x06: [lang_35], 0x07: [lang_36], 0x08: [lang_37], 0x09: [lang_38], 0x0A: [lang_39], 0x0B: [lang_40], 0x0C: [lang_41], 0x0D: [lang_42], 0x0E: [lang_43], 0x0F: [lang_44], 0x10: [lang_45], 0x11: [lang_46], 0x12: [lang_47], 0x13: [lang_48], 0x14: [lang_49], 0x15: [lang_50], 0x16: [lang_51], 0x17: [lang_52], 0x18: [lang_53], 0x19: [lang_54], 0x1A: [lang_55], 0x1B: [lang_56], 0x1C: [lang_57], 0x1D: [lang_58], 0x1E: [lang_60], 0x1F: [lang_61], 0x20: [lang_62], 0x21: [lang_63], 0x22: [lang_64], 0x23: [lang_65], 0x24: [lang_66], 0x25: [lang_67], 0x26: [lang_68], 0x27: [lang_59], 0x28: [lang_80], 0x29: [lang_81], 0x2A: [lang_82], 0x2B: [lang_83], 0x2C: [lang_84], 0x2D: [lang_85], 0x2E: [lang_86], 0x2F: [lang_87], 0x30: [lang_88], 0x31: [lang_89], 0x33: [lang_90], 0x34: [lang_91], 0x35: [lang_92], 0x36: [lang_93], 0x37: [lang_94], 0x39: [lang_95], 0x3A: [lang_96], 0x3B: [lang_97], 0x3C: [lang_98], 0x3D: [lang_99], 0x3E: [lang_100], 0x3F: [lang_101], 0x40: [lang_102], 0x41: [lang_103], 0x42: [lang_104], 0x43: [lang_105],  0x44: [lang_106],  0x45: [lang_107],  0x46: [lang_108], 0x47: [lang_109], 0x48: [lang_110], 0x49: [lang_111], 0x4A: [lang_112], 0x4B: [lang_113], 0x4C: [lang_114], 0x4D: [lang_115], 0x4E: [lang_116], 0x4F: [lang_117], 0x50: [lang_118], 0x51: [lang_119], 0x52: [lang_120], 0x53: [lang_121], 0x54: [lang_122], 0x55: [lang_123], 0x56: [lang_124], 0x57: [lang_125], 0x58: [lang_126], 0x59: [lang_127], 0x5A: [lang_128], 0x5B: [lang_129], 0x5C: [lang_130], 0x5D: [lang_131], 0x5E: [lang_132], 0x5F: [lang_133], 0x60: [lang_134], 0x61: [lang_135], 0x62: [lang_136], 0x4D: [lang_137], 0x52: [lang_138], 0x4E: [lang_139], 0x50: [lang_140], 0x4F: [lang_141], 0x4A: [lang_142], 0x51: [lang_143], 0x4B: [lang_144], 0x49: [lang_145], 0x63: [lang_146], 0x64: [lang_147], 0x64: [lang_148], 0x67: [lang_149], 0x68: [lang_150], 0x69: [lang_151], 0x6A: [lang_152], 0x6B: [lang_153], 0x6C: [lang_154], 0x6D: [lang_155], 0x6E: [lang_156], 0x6F: [lang_157], 0x70: [lang_158], 0x71: [lang_159], 0x72: [lang_160], 0x73: [lang_161], 0xE0: [lang_162], 0xE1: [lang_163], 0xE2: [lang_164], 0xE3: [lang_165], 0xE4: [lang_166], 0xE5: [lang_167], 0xE6: [lang_168], 0xE7: [lang_169] }
const conversion_code_hid_lang = { [lang_32]: 0x00, [lang_33]: 0x04, [lang_34]: 0x05, [lang_35]: 0x06, [lang_36]: 0x07, [lang_37]: 0x08, [lang_38]: 0x09, [lang_39]: 0x0A, [lang_40]: 0x0B, [lang_41]: 0x0C, [lang_42]: 0x0D, [lang_43]: 0x0E, [lang_44]: 0x0F, [lang_45]: 0x10, [lang_46]: 0x11, [lang_47]: 0x12, [lang_48]: 0x13, [lang_49]: 0x14, [lang_50]: 0x15, [lang_51]: 0x16, [lang_52]: 0x17, [lang_53]: 0x18, [lang_54]: 0x19, [lang_55]: 0x1A, [lang_56]: 0x1B, [lang_57]: 0x1C, [lang_58]: 0x1D, [lang_60]: 0x1E, [lang_61]: 0x1F, [lang_62]: 0x20, [lang_63]: 0x21, [lang_64]: 0x22, [lang_65]: 0x23, [lang_66]: 0x24, [lang_67]: 0x25, [lang_68]: 0x26, [lang_59]: 0x27, [lang_80]: 0x28, [lang_81]: 0x29, [lang_82]: 0x2A, [lang_83]: 0x2B, [lang_84]: 0x2C, [lang_85]: 0x2D, [lang_86]: 0x2E, [lang_87]: 0x2F, [lang_88]: 0x30, [lang_89]: 0x31, [lang_90]: 0x33, [lang_91]: 0x34, [lang_92]: 0x35, [lang_93]: 0x36, [lang_94]: 0x37, [lang_95]: 0x39, [lang_96]: 0x3A, [lang_97]: 0x3B, [lang_98]: 0x3C, [lang_99]: 0x3D, [lang_100]: 0x3E, [lang_101]: 0x3F, [lang_102]: 0x40, [lang_103]: 0x41, [lang_104]: 0x42, [lang_105]: 0x43,  [lang_106]: 0x44,  [lang_107]: 0x45,  [lang_108]: 0x46, [lang_109]: 0x47, [lang_110]: 0x48, [lang_111]: 0x49, [lang_112]: 0x4A, [lang_113]: 0x4B, [lang_114]: 0x4C, [lang_115]: 0x4D, [lang_116]: 0x4E, [lang_117]: 0x4F, [lang_118]: 0x50, [lang_119]: 0x51, [lang_120]: 0x52, [lang_121]: 0x53, [lang_122]: 0x54, [lang_123]: 0x55, [lang_124]: 0x56, [lang_125]: 0x57, [lang_126]: 0x58, [lang_127]: 0x59, [lang_128]: 0x5A, [lang_129]: 0x5B, [lang_130]: 0x5C, [lang_131]: 0x5D, [lang_132]: 0x5E, [lang_133]: 0x5F, [lang_134]: 0x60, [lang_135]: 0x61, [lang_136]: 0x62, [lang_137]: 0x4D, [lang_138]: 0x52, [lang_139]: 0x4E, [lang_140]: 0x50, [lang_141]: 0x4F, [lang_142]: 0x4A, [lang_143]: 0x51, [lang_144]: 0x4B, [lang_145]: 0x49, [lang_146]: 0x63, [lang_147]: 0x64, [lang_148]: 0x64, [lang_149]: 0x67, [lang_150]: 0x68, [lang_151]: 0x69, [lang_152]: 0x6A, [lang_153]: 0x6B, [lang_154]: 0x6C, [lang_155]: 0x6D, [lang_156]: 0x6E, [lang_157]: 0x6F, [lang_158]: 0x70, [lang_159]: 0x71, [lang_160]: 0x72, [lang_161]: 0x73, [lang_162]: 0xE0, [lang_163]: 0xE1, [lang_164]: 0xE2, [lang_165]: 0xE3, [lang_166]: 0xE4, [lang_167]: 0xE5, [lang_168]: 0xE6, [lang_169]: 0xE7 }

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
    else if (!currently_connected && changed_values){
        ipc.send("controldeckNotConnected")
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
                    fs.appendFileSync(path.join(assets_path, "config.cfg"), config[i].toString())
                }
                else {
                    fs.appendFileSync(path.join(assets_path, "config.cfg"), config[i].toString() + "\n")
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