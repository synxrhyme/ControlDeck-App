const { error } = require('console')
const { ipcMain, Menu, Tray, Notification, dialog } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const fs = require("fs")
const path = require("path")

if (require('electron-squirrel-startup')) { app.quit() }

const icon_path = path.join(__dirname, 'icon.ico')
const assets_path = path.join(__dirname, "resources", "assets")
const general_config = fs.readFileSync(path.join(assets_path, "config.cfg"), "utf-8").split(/\r?\n/)

let lang_name = general_config[1]
let lang_str = fs.readFileSync(path.join(assets_path, "lang", lang_name + ".lang"), "utf-8")
const lang = lang_str.split(/\r?\n/)

let alwaysOnTop_array = general_config[2].split("=")
let alwaysOnTop_str = alwaysOnTop_array[1]
let alwaysOnTop = (alwaysOnTop_str === "true")

let dialogWindow = null
let errorBox = null

let unsaved_changes = false
let currently_connected = false

const createWindow = () => {
    const win = new BrowserWindow({
        show: false,
        minWidth: 800,
        minHeight: 950,
        width: 1600,
        height: 1000,
        icon: icon_path,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    win.toggleDevTools()

    function createCustomDialog() {
        dialogWindow = new BrowserWindow({
            width: 450,
            height: 165,
            resizable: false,
            frame: false,
            modal: true,
            parent: win,
            show: false,
            icon: icon_path,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
            }
        })

        dialogWindow.loadFile(path.join(assets_path, "dialog-window", "index.html"))
        dialogWindow.webContents.toggleDevTools()

        dialogWindow.once('ready-to-show', ()      => { dialogWindow.show()    })
        dialogWindow.on("close",           (event) => {
            event.preventDefault()
            dialogWindow.destroy()
        })
    }

    function createErrorBox(type) {
        errorBox = new BrowserWindow({
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

        errorBox.loadFile(path.join(assets_path, type, "index.html"))
        errorBox.webContents.toggleDevTools()

        errorBox.once('ready-to-show',  ()      => { errorBox.show() })
        errorBox.on("close",            (event) => {
            event.preventDefault()
            errorBox.destroy()
        })
    }

    ipcMain.on("toMain_dialog-apply", () => {
        win.webContents.send("toRenderer_disconnect")
        win.webContents.send("toRenderer_dialog-apply")
    })
    ipcMain.on("toMain_dialog-close", () => { dialogWindow.destroy() })
    ipcMain.on("toMain_dialog-exit",  () => {
        win.webContents.send("toRenderer_disconnect")
        win.loadFile(path.join(__dirname, "config-site", "index.html"))
        dialogWindow.destroy()
    })

    ipcMain.on("toMain_errorbox-close",    () => { errorBox.destroy() })
    ipcMain.on("toMain_errorbox-redirect", () => {
        win.loadFile(path.join(__dirname, "config-site", "index.html"))
        errorBox.destroy(0)
    })

    ipcMain.on("toMain_connected",               () => { currently_connected = true            })
    ipcMain.on("toMain_disconnected",            () => { currently_connected = false           })
    ipcMain.on("toMain_unsavedValues",           () => { unsaved_changes = true                })
    ipcMain.on("toMain_savedValues",             () => { unsaved_changes = false               })
    ipcMain.on("toMain_askForExit",              () => { createCustomDialog()                  })
    ipcMain.on("toMain_nameIncomplete",          () => { createErrorBox("name-incomplete")     })
    ipcMain.on("toMain_controldeckNotConnected", () => { createErrorBox("cdeck-not-connected") })

    win.on('close', (event) => {
        if (unsaved_changes && currently_connected) {
            event.preventDefault()
            createCustomDialog()
        }
    })

    win.removeMenu()
    win.loadFile(path.join(__dirname, "main-menu", "index.html"))

    win.setAlwaysOnTop(alwaysOnTop, "screen")

    win.once('ready-to-show', () => {
        win.show()
    })

    const to_tray   = () => { win.hide() }
    const from_tray = () => { win.show() }
    const close_app = () => { app.quit() }

    const tray = new Tray(icon_path)

    const contextMenu = Menu.buildFromTemplate([
        { label: "Minimize to tray", click: to_tray   },
        { label: "Show Window",      click: from_tray },
        { label: "Close",            click: close_app },
    ])
    
    tray.setToolTip(lang[1])
    tray.setContextMenu(contextMenu)
    tray.on("click", () => { win.isVisible()?win.minimize():win.show() })

    ipcMain.on("toMain_alwaysOnTop", () => {
        alwaysOnTop = !alwaysOnTop
        win.setAlwaysOnTop(alwaysOnTop, "screen")
    })

    ipcMain.on("toMain_manualClose", () => { app.exit(0) })

    ipcMain.on("toMain_applied", () => {
        let notification = new Notification({
            title: lang[180],
            body: "",
            icon: icon_path,
        })
        notification.show()

        setTimeout(() => {
            notification.close()
        }, 3000)
    })

    win.webContents.on("render-process-gone", function(event, detailed) {
        if (detailed.reason == "crashed") {
            app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) })
            async function showCrashedBox() { 
                dialog.showErrorBox(lang[183], lang[184])
            }

            showCrashedBox()
            app.exit(0)
        }
    })
}

app.setName(lang[0])
app.setAppUserModelId(app.name)

app.whenReady().then(() => { createWindow() })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})