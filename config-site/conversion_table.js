const conversion_code_hid = {
    "None":                         0x00, // 0x01 & 0x02 & 0x03 reserved
    "KeyA":                         0x04, // A
    "KeyB":                         0x05, // B
    "KeyC":                         0x06, // C
    "KeyD":                         0x07, // D
    "KeyE":                         0x08, // E
    "KeyF":                         0x09, // F
    "KeyG":                         0x0A, // G
    "KeyH":                         0x0B, // H
    "KeyI":                         0x0C, // I
    "KeyJ":                         0x0D, // J
    "KeyK":                         0x0E, // K
    "KeyL":                         0x0F, // L
    "KeyM":                         0x10, // M
    "KeyN":                         0x11, // N
    "KeyO":                         0x12, // O
    "KeyP":                         0x13, // P
    "KeyQ":                         0x14, // Q
    "KeyR":                         0x15, // R
    "KeyS":                         0x16, // S
    "KeyT":                         0x17, // T
    "KeyU":                         0x18, // U
    "KeyV":                         0x19, // V
    "KeyW":                         0x1A, // W
    "KeyX":                         0x1B, // X
    "KeyY":                         0x1C, // Y
    "KeyZ":                         0x1D, // Z
    "Digit1":                       0x1E, // 1
    "Digit2":                       0x1F, // 2
    "Digit3":                       0x20, // 3
    "Digit4":                       0x21, // 4
    "Digit5":                       0x22, // 5
    "Digit6":                       0x23, // 6
    "Digit7":                       0x24, // 7
    "Digit8":                       0x25, // 8
    "Digit9":                       0x26, // 9
    "Digit0":                       0x27, // 0
    "Enter":                        0x28, // Carriage Return
    "Escape":                       0x29, // Escape
    "Backspace":                    0x2A,
    "Tab":                          0x2B,
    "Space":                        0x2C,
    "Equal":                        0x2D, // `
    "Minus":                        0x2E, // ß
    "BracketLeft":                  0x2F, // Ü
    "BracketRight":                 0x30, // +
    "Backslash":                    0x31, // 0x31 & 0x32 = #
    "Semicolon":                    0x33, // Ö
    "Quote":                        0x34, // Ä
    "Backquote":                    0x35, // ^
    "Comma":                        0x36, // ,
    "Period":                       0x37, // .
    "CapsLock":                     0x39,
    "F1":                           0x3A, // F1
    "F2":                           0x3B, // F2
    "F3":                           0x3C, // F3
    "F4":                           0x3D, // F4
    "F5":                           0x3E, // F5
    "F6":                           0x3F, // F6
    "F7":                           0x40, // F7
    "F8":                           0x41, // F8
    "F9":                           0x42, // F9
    "F10":                          0x43, // F10
    "F11":                          0x44, // F11
    "F12":                          0x45, // F12
    "Print":                        0x46,
    "ScrollLock":                   0x47,
    "Pause":                        0x48, // Pause
    "Insert":                       0x49, // Paste
    "Home":                         0x4A, // Pos1
    "PageUp":                       0x4B,
    "Delete":                       0x4C,
    "End":                          0x4D,
    "PageDown":                     0x4E,
    "ArrowRight":                   0x4F,
    "ArrowLeft":                    0x50,
    "ArrowUp":                      0x51,
    "ArrowDown":                    0x52,
    "NumLock":                      0x53,
    "NumpadDivide":                 0x54, // /
    "NumpadMultiply":               0x55, // *
    "NumpadSubtract":               0x56, // -
    "NumpadAdd":                    0x57, // +
    "NumpadEnter":                  0x58, // Enter
    "Numpad1NumLock":               0x59, // 1                                                     SELF-DEFINED
    "Numpad2NumLock":               0x5A, // 2                                                     SELF-DEFINED
    "Numpad3NumLock":               0x5B, // 3                                                     SELF-DEFINED
    "Numpad4NumLock":               0x5C, // 4                                                     SELF-DEFINED
    "Numpad5NumLock":               0x5D, // 5                                                     SELF-DEFINED
    "Numpad6NumLock":               0x5E, // 6                                                     SELF-DEFINED
    "Numpad7NumLock":               0x5F, // 7                                                     SELF-DEFINED
    "Numpad8NumLock":               0x60, // 8                                                     SELF-DEFINED
    "Numpad9NumLock":               0x61, // 9                                                     SELF-DEFINED
    "Numpad0NumLock":               0x62, // 0                                                     SELF-DEFINED
    "Numpad1":                      0x4D, // End
    "Numpad2":                      0x52, // Arrow Down
    "Numpad3":                      0x4E, // Page Down
    "Numpad4":                      0x50, // Arrow Left
    "Numpad6":                      0x4F, // Arrow Right
    "Numpad7":                      0x4A, // Pos1
    "Numpad8":                      0x51, // Arrow Up
    "Numpad9":                      0x4B, // Page Up
    "Numpad0":                      0x49, // Insert
    "NumpadDecimal":                0x63, // Delete without NumLock, Comma with NumLock
    "SmallerThan":                  0x64, // <                                                     SELF-DEFINED
    "BiggerThan":                   0x64, // >                                                     SELF-DEFINED
    "NumpadEqual":                  0x67, // ???                                                   SELF-DEFINED
    "F13":                          0x68, // F13
    "F14":                          0x69, // F14
    "F15":                          0x6A, // F15
    "F16":                          0x6B, // F16
    "F17":                          0x6C, // F17
    "F18":                          0x6D, // F18
    "F19":                          0x6E, // F19
    "F20":                          0x6F, // F20
    "F21":                          0x70, // F21
    "F22":                          0x71, // F22
    "F23":                          0x72, // F23
    "F24":                          0x73, // F24
    "ControlLeft":                  0xE0,
    "ShiftLeft":                    0xE1,
    "AltLeft":                      0xE2,
    "MetaLeft":                     0xE3,
    "ControlRight":                 0xE4,
    "ShiftRight":                   0xE5,
    "AltRight":                     0xE6,
    "MetaRight":                    0xE7,
}

const conversion_hid_code = {
    0x00:                           "None",              // 0x01 & 0x02 & 0x03 reserved
    0x04:                           "A",              // A
    0x05:                           "B",              // B
    0x06:                           "C",              // C
    0x07:                           "D",              // D
    0x08:                           "E",              // E
    0x09:                           "F",              // F
    0x0A:                           "G",              // G
    0x0B:                           "H",              // H
    0x0C:                           "I",              // I
    0x0D:                           "J",              // J
    0x0E:                           "K",              // K
    0x0F:                           "L",              // L
    0x10:                           "M",              // M
    0x11:                           "N",              // N
    0x12:                           "O",              // O
    0x13:                           "P",              // P
    0x14:                           "Q",              // Q
    0x15:                           "R",              // R
    0x16:                           "S",              // S
    0x17:                           "T",              // T
    0x18:                           "U",              // U
    0x19:                           "V",              // V
    0x1A:                           "W",              // W
    0x1B:                           "X",              // X
    0x1C:                           "Y",              // Y
    0x1D:                           "Z",              // Z
    0x1E:                           "1",              // 1
    0x1F:                           "2",              // 2
    0x20:                           "3",              // 3
    0x21:                           "4",              // 4
    0x22:                           "5",              // 5
    0x23:                           "6",              // 6
    0x24:                           "7",              // 7
    0x25:                           "8",              // 8
    0x26:                           "9",              // 9
    0x27:                           "0",              // 0
    0x28:                           "Enter",          // Carriage Return
    0x29:                           "Escape",         // Escape
    0x2A:                           "Backspace",
    0x2B:                           "Tab",
    0x2C:                           "Space",
    0x2D:                           "Equal",          // `
    0x2E:                           "Minus",          // ß
    0x2F:                           "Bracket Left",   // Ü
    0x30:                           "Bracket Right",  // +
    0x31:                           "Backslash",      // 0x31 & 0x32 = #
    0x33:                           "Semicolon",      // Ö
    0x34:                           "Quote",          // Ä
    0x35:                           "Backquote",      // ^
    0x36:                           "Comma",          // ,
    0x37:                           "Period",         // .
    0x39:                           "CapsLock",
    0x3A:                           "F1",                // F1
    0x3B:                           "F2",                // F2
    0x3C:                           "F3",                // F3
    0x3D:                           "F4",                // F4
    0x3E:                           "F5",                // F5
    0x3F:                           "F6",                // F6
    0x40:                           "F7",                // F7
    0x41:                           "F8",                // F8
    0x42:                           "F9",                // F9
    0x43:                           "F10",               // F10
    0x44:                           "F11",               // F11
    0x45:                           "F12",               // F12
    0x46:                           "Print",
    0x47:                           "ScrollLock",
    0x48:                           "Pause",             // Pause
    0x49:                           "Insert",            // Paste
    0x4A:                           "Home",              // Pos1
    0x4B:                           "Page Up",
    0x4C:                           "Delete",
    0x4D:                           "End",
    0x4E:                           "Page Down",
    0x4F:                           "Arrow Right",
    0x50:                           "Arrow Left",
    0x51:                           "Arrow Up",
    0x52:                           "Arrow Down",
    0x53:                           "NumLock",
    0x54:                           "Numpad Divide",     // /
    0x55:                           "Numpad Multiply",   // *
    0x56:                           "Numpad Subtract",   // -
    0x57:                           "Numpad Add",        // +
    0x58:                           "Numpad Enter",      // Enter
    0x59:                           "Numpad 1 NumLock",  // 1                                                     SELF-DEFINED
    0x5A:                           "Numpad 2 NumLock",  // 2                                                     SELF-DEFINED
    0x5B:                           "Numpad 3 NumLock",  // 3                                                     SELF-DEFINED
    0x5C:                           "Numpad 4 NumLock",  // 4                                                     SELF-DEFINED
    0x5D:                           "Numpad 5 NumLock",  // 5                                                     SELF-DEFINED
    0x5E:                           "Numpad 6 NumLock",  // 6                                                     SELF-DEFINED
    0x5F:                           "Numpad 7 NumLock",  // 7                                                     SELF-DEFINED
    0x60:                           "Numpad 8 NumLock",  // 8                                                     SELF-DEFINED
    0x61:                           "Numpad 9 NumLock",  // 9                                                     SELF-DEFINED
    0x62:                           "Numpad 0 NumLock",  // 0                                                     SELF-DEFINED
    0x4D:                           "Numpad 1",          // End
    0x52:                           "Numpad 2",          // Arrow Down
    0x4E:                           "Numpad 3",          // Page Down
    0x50:                           "Numpad 4",          // Arrow Left
    0x4F:                           "Numpad 6",          // Arrow Right
    0x4A:                           "Numpad 7",          // Pos1
    0x51:                           "Numpad 8",          // Arrow Up
    0x4B:                           "Numpad 9",          // Page Up
    0x49:                           "Numpad 0",          // Insert
    0x63:                           "Numpad Decimal",    // Delete without NumLock, Comma with NumLock
    0x64:                           "Smaller Than",      // <                                                     SELF-DEFINED
    0x64:                           "Bigger Than",       // >                                                     SELF-DEFINED
    0x67:                           "Numpad Equal",      // Clear
    0x68:                           "F13",               // F13
    0x69:                           "F14",               // F14
    0x6A:                           "F15",               // F15
    0x6B:                           "F16",               // F16
    0x6C:                           "F17",               // F17
    0x6D:                           "F18",               // F18
    0x6E:                           "F19",               // F19
    0x6F:                           "F20",               // F20
    0x70:                           "F21",               // F21
    0x71:                           "F22",               // F22
    0x72:                           "F23",               // F23
    0x73:                           "F24",               // F24
    0xE0:                           "Control Left",
    0xE1:                           "Shift Left",
    0xE2:                           "Alt Left",
    0xE3:                           "Meta Left",
    0xE4:                           "Control Right",
    0xE5:                           "Shift Right",
    0xE6:                           "Alt Right",
    0xE7:                           "Meta Right"
}

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