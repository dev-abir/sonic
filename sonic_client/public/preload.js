const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("vroomAPI", {
    saveProgram: (programString, language) =>
        ipcRenderer.invoke("saveProgram", programString, language),
    compileInterprete: () => ipcRenderer.invoke("compileInterprete"),
});
