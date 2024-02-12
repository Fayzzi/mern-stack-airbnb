import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./Components/Context/UserContext/UserContext.jsx";
import { AcomContextProvider } from "./Components/Context/AcomadationContext/AccomContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <AcomContextProvider>
      {" "}
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </AcomContextProvider>
  </UserContextProvider>
);
