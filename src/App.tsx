import React from "react";
import { useState } from "react";
import "./App.css";
import Toast from "@components/toast/Toast";
import { WordleAppContainer } from "@components/wordle-app/WordleApp";
export const ModalContext = React.createContext<any>(undefined);

function App() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <ModalContext.Provider value={{ setShowOverlay, setMessage }}>
      <WordleAppContainer />
      <Toast showOverlay={showOverlay} message={message} setShowOverlay={setShowOverlay} />
    </ModalContext.Provider>
  );
}

export default App;
