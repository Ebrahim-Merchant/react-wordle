import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  showOverlay?: boolean;
  message: string;
  setShowOverlay: Function;
};

const ToastParent = ({ children }: { children: React.ReactNode }) => {
  const element = document.createElement("div");

  useEffect(() => {
    document.body.appendChild(element);
    return () => {
      document.body.removeChild(element);
    };
  }, [element]);

  return ReactDOM.createPortal(children, element);
};

export default function Toast({ showOverlay, message, setShowOverlay }: Props) {
  setTimeout(() => {
    setShowOverlay(false);
  }, 5000);
  return showOverlay ? (
    <ToastParent>
      <div className="alert-container">
        <div className="alert">
          <p>{message}</p>
        </div>
      </div>
    </ToastParent>
  ) : null;
}
