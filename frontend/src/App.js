import React from "react";
import "./App.css";
import { WebOSProvider } from "./components/WebOS/WebOSContext";
import Desktop from "./components/WebOS/Desktop";

function App() {
  return (
    <div className="App">
      <WebOSProvider>
        <Desktop />
      </WebOSProvider>
    </div>
  );
}

export default App;