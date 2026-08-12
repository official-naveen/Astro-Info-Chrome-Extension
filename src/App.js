import React, { useContext } from "react";
import "./components/styles/app.css";
import MainBody from "./components/screens/MainBody";
import dataStore from "./context/valueStorage/dataStore";
import LoadingSpinner from "./components/screens/LoadingSpinner";

function App() {
  const { loading } = useContext(dataStore);
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      {loading ? <LoadingSpinner /> : <MainBody />}
    </div>
  );
}

export default App;

// https://api.nasa.gov/planetary/apod?api_key=Cr2BhJAbRjyFHOTFdUbpWmv5I3L6kgNsCZ3vZsUK
