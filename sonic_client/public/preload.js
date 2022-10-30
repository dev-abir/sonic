const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sonicAPI", {
    getSettings: () => ipcRenderer.invoke("getSettings"),
    saveProgram: (programString, language) =>
        ipcRenderer.invoke("saveProgram", programString, language),
    compileInterprete: (language) => ipcRenderer.invoke("compileInterprete", language),
});
