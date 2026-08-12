import React, { useState } from "react";
import dataStore from "./dataStore";

const DataStorageContext = (props) => {
  const [location, setLocation] = useState("");
  const [sideSliderContainerData, setSideSliderContainerData] = useState({
    display: "block",
    right: "-35%",
    opacity: "0",
  });
  const [sideSliderData, setSideSliderData] = useState("11rem");

  const [loading, setLoading] = useState(false);

  return (
    <dataStore.Provider
      value={{
        location,
        setLocation,
        sideSliderContainerData,
        setSideSliderContainerData,
        sideSliderData,
        setSideSliderData,
        loading,
        setLoading,
      }}
    >
      {props.children}
    </dataStore.Provider>
  );
};

export default DataStorageContext;
