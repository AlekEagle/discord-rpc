/// <reference types="electron" />
export {};

declare global {
  interface Window {
    electron: {
      ipcRenderer: Electron.IpcRenderer;
    };
  }
}
