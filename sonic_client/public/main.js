const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
// const execP = (command) => new Promise((r) => exec(command, r));
const execP = util.promisify(exec);

// TODO: Map vs Object?
const fileExtensions = {
    c: "c",
    cpp: "cpp",
    java: "java",
    python: "py",
    javascript: "js",
};

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            // devTools: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    if (app.isPackaged) win.loadFile(path.join(__dirname, "index.html"));
    else win.loadURL("http://localhost:3000");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle("saveProgram", async (_, programString, language) => {
        try {
            // TODO: test this exception, redundant?
            if (!fileExtensions[language])
                throw new Error("Fatal error fileExtensions[language] is undefined!");

            await util.promisify(fs.writeFile)(
                `./workspace/test.${fileExtensions[language]}`,
                programString
            );
        } catch (err) {
            return err;
        }
    });

    ipcMain.handle("compileInterprete", async () => {
        // FIXME: doesn't (IMMEDIATELY?) kill the process if TLE
        try {
            await execP("gcc --std=c11 -o ./workspace/test ./workspace/test.c", {
            // await execP("g++ --std=c++17 -o ./workspace/test ./workspace/test.cpp", {
                timeout: 3000,
                killSignal: "SIGKILL",
            });
            // TODO: ignore compilation output (warnings?)?

            return (
                await execP('printf "1" | ./workspace/test', {
                    timeout: 3000,
                    killSignal: "SIGKILL",
                })
            ).stdout;
        } catch (err) {
            // console.log(JSON.stringify(err, null, 4));

            if (err.killed) return "Time Limit Exceeded";
            else return err.stderr;
        }
    });

    createWindow();

    app.on("activate", () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});
