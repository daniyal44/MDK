import React from "react";
import "./App.css";
import { WebOSProvider } from "./components/WebOS/WebOSContext";
import { NotificationProvider } from "./components/WebOS/NotificationContext";
import { FileSystemProvider } from "./components/WebOS/FileSystemContext";
import { WorkspaceProvider } from "./components/WebOS/WorkspaceManager";
import Desktop from "./components/WebOS/Desktop";

function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <FileSystemProvider>
          <WorkspaceProvider>
            <WebOSProvider>
              <Desktop />
            </WebOSProvider>
          </WorkspaceProvider>
        </FileSystemProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;