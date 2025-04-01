const { ipcMain, Menu, Tray, Notification, dialog } = require('electron');
const { app, BrowserWindow }                        = require('electron/main');
const { updateElectronApp }                         = require("update-electron-app");
const fs                                            = require("fs");
const path                                          = require("path");

const singleInstance = app.requestSingleInstanceLock();
if (!singleInstance) { app.quit(); }
if (require('electron-squirrel-startup')) { app.quit(); }

updateElectronApp();

const icon_path = path.join(__dirname, 'icon.ico');
const assets_path = path.join(__dirname, "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

let always_on_top = main_config.always_on_top;

let dialogWindow = null;
let errorBox = null;

let name_incomplete = false;
let unsaved_changes = false;
let currently_connected = false;

let firmware_version;

function createWindow() {
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
    });

    win.webContents.toggleDevTools();

    if (singleInstance) {
        app.on("second-instance", (event, commandLine, workingDirectory, additionalData) => {
            win.show();
            if (win.isMinimized()) { win.restore(); }
            win.focus();
        })
    }

    function createCustomDialog(type) {
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
        });

        if (type == "updating-xdeck") {
            dialogWindow.loadFile(path.join(assets_path, "updating-xdeck", "index.html"));

            dialogWindow.on("close", (event) => {
                event.preventDefault();
            });

            dialogWindow.webContents.on("toMain_close-updater", () => {
                dialogWindow.destroy();
            });
        }
        else {
            dialogWindow.loadFile(path.join(assets_path, "dialog-window", "index.html"));
            
            if (type == "close") {
                setTimeout(() => {
                    dialogWindow.webContents.send("toDialog_close-type");
                }, 100);
            }
            else if (type == "redirect") {
                setTimeout(() => {
                    dialogWindow.webContents.send("toDialog_redirect-type");
                }, 100);
            }
            else if (type == "redirect_nameIncomplete") {
                setTimeout(() => {
                    dialogWindow.webContents.send("toDialog_redirect-type-nameIncomplete");
                }, 100);
            }

            dialogWindow.on("close", (event) => {
                event.preventDefault();
                dialogWindow.destroy();
            });
        }

        dialogWindow.once('ready-to-show', () => { dialogWindow.show(); });
    }

    function createErrorBox(type) {
        let errorbox_height;
        
        if (type == "name-incomplete") {
            errorbox_height = 160;
        }
        else {
            errorbox_height = 200;
        }

        errorBox = new BrowserWindow({
            width: 450,
            height: errorbox_height,
            resizable: false,
            frame: false,
            modal: true,
            parent: win,
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        errorBox.loadFile(path.join(assets_path, type, "index.html"));

        errorBox.once('ready-to-show', () => { errorBox.show() });
        errorBox.on("close", (event) => {
            event.preventDefault();
            errorBox.destroy();
        });
    }

    ipcMain.on("toMain_dialog-apply-redirect", () => {
        win.webContents.send("toRenderer_dialog-apply");
    })
    ipcMain.on("toMain_dialog-apply-close", () => {
        win.webContents.send("toRenderer_dialog-apply");
    })

    ipcMain.on("toMain_dialog-exit-redirect", () => {
        win.webContents.send("toRenderer_disconnect");
        win.loadFile(path.join(__dirname, "config-site", "index.html"));
        dialogWindow.destroy();
    })
    ipcMain.on("toMain_dialog-exit-close",  () => {
        dialogWindow.destroy();
        app.exit(0);
    })

    ipcMain.on("toMain_dialog-close", () => { dialogWindow.destroy(); })

    ipcMain.on("toMain_errorbox-close",    () => { errorBox.destroy(); })
    ipcMain.on("toMain_errorbox-redirect", () => {
        win.loadFile(path.join(__dirname, "config-site", "index.html"));
        errorBox.destroy();
    })

    ipcMain.on("toMain_errorbox-cfgsite-close",    () => { errorBox.destroy(); })
    ipcMain.on("toMain_errorbox-cfgsite-redirect", () => {
        errorBox.destroy();
        app.exit(0);
    })

    ipcMain.on("toMain_connected",                       () => { currently_connected = true;                     });
    ipcMain.on("toMain_disconnected",                    () => { currently_connected = false;                    });
    ipcMain.on("toMain_unsavedValues",                   () => { unsaved_changes = true;                         });
    ipcMain.on("toMain_savedValues",                     () => { unsaved_changes = false;                        });
    ipcMain.on("toMain_nameIncompleteVal",               () => { name_incomplete = true;                         });
    ipcMain.on("toMain_nameCompleteVal",                 () => { name_incomplete = false;                        });
    ipcMain.on("toMain_askForExit",                      () => { createCustomDialog("redirect");                 });
    ipcMain.on("toMain_askForExit_nameIncomplete",       () => { createCustomDialog("redirect-nameIncomplete");  });
    ipcMain.on("toMain_dialog-updating-xdeck",           () => { createCustomDialog("updating-xdeck");           });
    ipcMain.on("toMain_nameIncomplete",                  () => { createErrorBox("name-incomplete");              });
    ipcMain.on("toMain_controldeckNotConnected",         () => { createErrorBox("xdeck-not-connected");          });
    ipcMain.on("toMain_controldeckNotConnected_cfgSite", () => { createErrorBox("xdeck-not-connected-config");   });

    ipcMain.on("toMain_dialog-get-last-xdeck-version",   ()            => { win.webContents.send("toRenderer_xdeck-firmware-version", { data: firmware_version }); });
    ipcMain.on("toMain_dialog-set-last-xdeck-version",   (event, args) => { firmware_version = args.data; });


    win.on('close', (event) => {
        if (currently_connected) {
            event.preventDefault();

            if (name_incomplete) {
                createErrorBox("name-incomplete");
            }
            else if (unsaved_changes) {
                createCustomDialog("close");
            }
            else {
                app.exit(0);
            }
        }
    });

    win.removeMenu();
    win.loadFile(path.join(__dirname, "main-menu", "index.html"));

    win.setAlwaysOnTop(always_on_top, "screen");

    win.once('ready-to-show', () => { win.show(); })

    function to_tray() {
        win.hide();

        if (errorBox) {
            if (!errorBox.isDestroyed()) {
                errorBox.hide();
            }
        }
        if (dialogWindow) {
            if (!dialogWindow.isDestroyed()) {
                dialogWindow.hide();
            }
        }
    }

    function from_tray() {
        win.show();

        if (errorBox) {
            if (!errorBox.isDestroyed()) {
                errorBox.show();
            }
        }
        if (dialogWindow) {
            if (!dialogWindow.isDestroyed()) {
                dialogWindow.show();
            }
        }
    }

    const tray = new Tray(icon_path)

    const contextMenu = Menu.buildFromTemplate([
        { label: "Minimize to tray", click: to_tray              },
        { label: "Show Window",      click: from_tray            },
        { label: "Close",            click: () => { app.quit(); }},
    ])
    
    tray.setTitle(lang[1]);
    tray.setToolTip(lang[1]);
    tray.setContextMenu(contextMenu);
    tray.on("click", from_tray);

    ipcMain.on("toMain_alwaysOnTop", () => {
        always_on_top = !always_on_top;
        win.setAlwaysOnTop(always_on_top, "screen");
    })

    ipcMain.on("toMain_manualClose", () => { app.exit(0); });

    ipcMain.on("toMain_applied", () => {
        let notification = new Notification({
            title: lang[42],
            body: "",
            icon: icon_path,
        })
        notification.show();

        setTimeout(() => {
            notification.close();
        }, 3000);
    });

    win.webContents.on("render-process-gone", function(event, detailed) {
        if (detailed.reason == "crashed") {
            app.relaunch({ args: process.argv.slice(1).concat(["--relaunch"]) });
            async function showCrashedBox() { 
                dialog.showErrorBox(lang[45], lang[46]);
            }

            showCrashedBox();
            app.exit(0);
        }
    });
}

app.setName(lang[0]);
app.setAppUserModelId(app.name);

app.whenReady().then(() => { createWindow() });

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }
});