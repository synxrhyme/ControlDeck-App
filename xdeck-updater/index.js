const { SerialPort }  = require('serialport');
const fs              = require('fs');
const path            = require("path");
const { ipcRenderer } = require("electron");

const assets_path = path.join(path.dirname(__dirname), "resources", "assets");

const main_config_path = path.join(assets_path, "config.json");
const main_config = JSON.parse(fs.readFileSync(main_config_path, "utf-8"));

const lang_path = path.join(assets_path, "lang", main_config.lang_name + ".lang");
const lang = fs.readFileSync(lang_path, "utf-8").split(/\r?\n/);

const serialNumber = main_config.serialNumber;

const headline = document.getElementById("headline");
const status_log = document.getElementById("status");
const pre_version = document.getElementById("pre-version");
const version_log = document.getElementById("version");
const pre_newest_version = document.getElementById("pre-newest-version");
const newest_version_log = document.getElementById("newest-version");
const update_check_span = document.getElementById("update-check-span");
const pre_connection_status_log = document.getElementById("pre-connection-status");
const connection_status_log = document.getElementById("connection-status");
const back_span = document.getElementById("back-span");

document.title = lang[0];
headline.innerHTML = lang[48];
pre_version.innerHTML = lang[49];
version_log.innerHTML = lang[50];
pre_newest_version.innerHTML = lang[54];
newest_version_log.innerHTML = lang[50];
update_check_span.innerHTML = lang[51];
back_span.innerHTML = lang[6];

let ws;
let checking_for_updates;
let scanning_active = true;

document.getElementById("check-for-updates").addEventListener("click", () => {
    if (!checking_for_updates) {
        checkForUpdates();
    }
});

document.getElementById("back-btn").addEventListener("click", returnToMainMenu);

let serialPort;
let port_id = main_config.port_id;

let currently_connected = false;
let first_time_error = true;

let xdeck_version = main_config.xdeck_version;
let newest_version;

function connectXDeck() {
    serialPort = new SerialPort({
        path: port_id,
        baudRate: 115200
    });

    serialPort.on('open', (event) => {
        setStatusConnected();

        setTimeout(() => {
            let request = {
                type: "get-version"
            }

            serialPort.write(JSON.stringify(request) + "\n");
        }, 100);

        currently_connected = true
        first_time_error = true
    });

    serialPort.on('data', (event) => {
        let raw_data = Buffer.from(event).toString();

        try {
            let data = JSON.parse(raw_data);

            if (data.header == "version_update") {
                xdeck_version = data.version;
                version_log.innerHTML = xdeck_version;
            }
        }
        catch (error) {
            console.warn(error);
        }
    });

    serialPort.on('close', (event) => {
        setStatusNotConnected();
        currently_connected = false;
    });

    serialPort.on('error', function (error) {
        let error_split = error.toString().split(":");
        let _error = error_split[2];
    
        if (_error == " Access denied" && first_time_error) {
            setStatusError();
            first_time_error = false;
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
                if (main_config.port_id != port_id) {
                    main_config.port_id = port_id;
                    fs.writeFileSync(path.join(assets_path, "config.json"), JSON.stringify(main_config));
                }
                
                if (scanning_active) {
                    connectXDeck();
                }
            }
        });
    });
}

function returnToMainMenu() {
    if (currently_connected) {
        scanning_active = false;
        serialPort.close();
    }

    if (ws) {
        if (ws.readyState == WebSocket.CLOSED) {
            ws.close();
        }
    }

    window.location.href = "../main-menu/index.html";
}

function checkForUpdates() {
    checking_for_updates = true;

    pre_connection_status_log.innerHTML = lang[56];

    connection_status_log.innerHTML = "";
    connection_status_log.style.color = "rgb(40, 230, 255)";
    connection_status_log.innerHTML = lang[57];

    update_check_span.innerHTML = "";
    update_check_span.style.color = "lightblue";
    update_check_span.innerHTML = lang[55];

    let x = 0;
    let loading_interval = setInterval(() => {
        if (x > 3) {
            update_check_span.innerHTML = lang[51];
        }
        else {
            x = 0;
            update_check_span.insertAdjacentHTML("beforeend", ".");
        }

        x += 1;
    }, 500);

    let connect_timeout = setTimeout(() => {
        checking_for_updates = false;
        clearInterval(loading_interval);
        update_check_span.innerHTML = lang[51];
        return;
    }, 10000);

    ws = new WebSocket("ws://schmotzgisserver.ddns.net:3000");

    ws.addEventListener("open", () => {
        update_check_span.innerHTML = lang[51];

        connection_status_log.innerHTML = "";
        connection_status_log.style.color = "rgb(50, 205, 50)";
        connection_status_log.innerHTML = lang[58];

        clearTimeout(connect_timeout);
        clearInterval(loading_interval);

        setTimeout(() => {
            let message = {
                type: "get_version"
            }
            
            ws.send(JSON.stringify(message));
        }, 500);
    });

    ws.addEventListener("message", (event) => {
        try {
            let data = JSON.parse((event.data).toString());

            if (data.type == "version_update") {
                newest_version = data.body.version;
                newest_version_log.innerHTML = newest_version;

                ipcRenderer.send("toMain_dialog-set-last-xdeck-version", { data: newest_version });

                if (newest_version != xdeck_version && currently_connected) {
                    ipcRenderer.send("toMain_dialog-updating-xdeck");

                    let request = {
                        type: "get_update",
                        version: newest_version,
                    }
                    
                    ws.send(JSON.stringify(request));
                }
                else {
                    checking_for_updates = false;
                    return ws.close();
                }
            }
            else if (data.type == "update") {
                const update_buffer = Buffer.from(data.data, 'base64');
                fs.writeFileSync(path.join(assets_path, "temp", data.version + ".bin"), update_buffer);

                main_config.xdeck_version = data.version;
                fs.writeFileSync(path.join(assets_path, "config.json"), JSON.stringify(main_config));
            }
        }
        catch (error) {
            console.warn(error);
        }
    });

    ws.addEventListener("error", (error) => {
        console.log(error);

        connection_status_log.innerHTML = "";
        connection_status_log.style.color = "rgb(255, 90, 0)";
        connection_status_log.innerHTML = lang[59];

        update_check_span.innerHTML = "";
        update_check_span.style.color = "";
        update_check_span.innerHTML = lang[51];

        clearTimeout(connect_timeout);
        clearInterval(loading_interval);

        update_check_span.innerHTML = lang[51];
        checking_for_updates = false;
        return;
    });
}

function main() {
    ipcRenderer.on("toRenderer_xdeck-firmware-version", (event, data) => {
        let version = data.data;

        if (version) {
            newest_version_log.innerHTML = version;
        }
    });
    
    setTimeout(() => {
        ipcRenderer.send("toMain_dialog-get-last-xdeck-version");
    }, 100);

    setStatusNotConnected();

    setInterval(check_ports, 50);
}

window.onload = main();