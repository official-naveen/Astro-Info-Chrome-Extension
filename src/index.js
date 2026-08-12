import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import InformationContext from "./context/infoContext/InformationContext";
import DataStorageContext from "./context/valueStorage/DataStorageContext";
import Functionalities from "./context/functions/Functionalities";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InformationContext>
      <DataStorageContext>
        <Functionalities>
          <App />
        </Functionalities>
      </DataStorageContext>
    </InformationContext>
  </React.StrictMode>
);
