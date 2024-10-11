const { ipcMain, Menu, Tray, Notification, dialog } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const fs = require("fs")

let general_config = fs.readFileSync("./config.cfg", "utf-8").split(/\r?\n/)
let lang_name = general_config[1]

let lang_str = fs.readFileSync(lang_name, "utf-8")
let lang = lang_str.split(/\r?\n/)

const options_errorbox = {
    type: "error",
    buttons: [lang[177]],
    defaultId: 0,
    title: lang[170],
    message: lang[171],
    detail: "Gib einen Namen an!",
    modal: true
}

let alwaysOnTop_array = general_config[2].split("=")
let alwaysOnTop_str = alwaysOnTop_array[1]
let alwaysOnTop = (alwaysOnTop_str === "true")

let unsaved_changes = false
let currently_connected = false

let tray = null

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        minWidth: 800,
        minHeight: 950,
        width: 1600,
        height: 1000,
        icon: "./assets/icon.ico",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    function createCustomDialog() {
        const dialogWindow = new BrowserWindow({
            width: 450,
            height: 165,
            resizable: false,
            frame: false,
            modal: true,
            parent: win,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
      
        dialogWindow.loadFile("./assets/dialog-window/index.html")

        dialogWindow.once('ready-to-show', () => {
            dialogWindow.show()
        })

        ipcMain.on("dialog-close", () => {
            dialogWindow.destroy()
        })

        ipcMain.on("dialog-apply", () => {
            win.webContents.send("dialog-apply")
        })
        ipcMain.on("dialog-exit", () => {
            win.webContents.send("dialog-exit")
        })
        ipcMain.on("dialog-cancel", () => {
            win.webContents.send("dialog-cancel")
        })
    }

    function createErrorBox(type) {
        const errorBox = new BrowserWindow({
            width: 450,
            height: 200,
            resizable: false,
            frame: false,
            modal: true,
            parent: win,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })
      
        errorBox.loadFile("./assets/" + type + "/index.html")

        errorBox.once('ready-to-show', () => {
            errorBox.show()
        })

        ipcMain.on("errorbox-" + type + "-close", () => {
            errorBox.destroy()
        })
        
        ipcMain.on("errorbox-name-incomplete-redirect", () => {
            win.webContents.send("errorbox-redirect")

            errorBox.destroy()
        })

        ipcMain.on("errorbox-name-incomplete-close", () => {
            errorBox.destroy()
        })
    }

    win.on('close', function(event) {
        if (unsaved_changes && currently_connected) {
            event.preventDefault()
            createCustomDialog()
        }
    })

    //win.removeMenu() //remove electron bar
    win.loadFile("./main-menu/index.html")

    win.setAlwaysOnTop(alwaysOnTop, "screen")

    win.once('ready-to-show', () => {
        win.show()
    })

    const to_tray   = () => { win.hide() }
    const from_tray = () => { win.show() }
    const close_app = () => { app.quit() }

    tray = new Tray("./assets/icon.ico")
    const contextMenu = Menu.buildFromTemplate([
        { label: "Minimize to tray", click: to_tray },
        { label: "Show Window", click: from_tray    },
        { label: "Close", click: close_app          },
    ])

    tray.setToolTip('ControlDeck-App')
    tray.setContextMenu(contextMenu)
    tray.on("click", () => {
        win.isVisible()?win.minimize():win.show()
    })

    ipcMain.on("alwaysOnTop", () => {
        alwaysOnTop = !alwaysOnTop
        win.setAlwaysOnTop(alwaysOnTop, "screen")
    })

    ipcMain.on("manualClose", () => {
        app.exit(0)
    })

    ipcMain.on("unsavedValues", () => {
        unsaved_changes = true
    })

    ipcMain.on("savedValues", () => {
        unsaved_changes = false
    })

    ipcMain.on("connected", () => {
        currently_connected = true
    })

    ipcMain.on("disconnected", () => {
        currently_connected = false
    })

    ipcMain.on("restartApp", () => {
        app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) })
        app.exit(0)
    })

    ipcMain.on("askForExit", () => {
        createCustomDialog()
    })

    ipcMain.on("nameIncomplete", () => {
        createErrorBox("name-incomplete")
    })

    ipcMain.on("controldeckNotConnected", () => {
        createErrorBox("cdeck-not-connected")
    })

    ipcMain.on("applied", () => {
        new Notification({
            title: lang[180],
            body: "",
            icon: "./assets/icon.ico",
          }).show()
    })

    win.webContents.on("render-process-gone", function(event, detailed) {
        if (detailed.reason == "crashed") {
            app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) })
            dialog.showErrorBox(win, lang[170], lang[171])

            app.exit(0)
        }
    })
}

app.setName(lang[0])
app.setAppUserModelId(app.name)

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})