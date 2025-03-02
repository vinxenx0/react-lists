import React, { createContext, useState } from "react";
import FlashMessage from "../components/FlashMessage";

export const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000); // Ocultar el mensaje después de 3 segundos
  };

  return (
    <FlashMessageContext.Provider value={{ showMessage }}>
      <div className="flash-message-container">
        {message && <FlashMessage message={message} />}
      </div>
      {children}
    </FlashMessageContext.Provider>
  );
};
