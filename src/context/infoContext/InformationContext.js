import React, { useState, useEffect } from "react";
import nasaDetails from "./nasaDetails";

const InformationContext = (props) => {
  const [mainData, setMainData] = useState({
    date: "",
    explanation: "",
    hdURL: "",
    title: "",
    url: "",
  });
  const details = async () => {
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=Cr2BhJAbRjyFHOTFdUbpWmv5I3L6kgNsCZ3vZsUK"
    );
    const data = await res.json();
    setMainData({
      date: data.date,
      explanation: data.explanation,
      hdURL: data.hdurl,
      title: data.title,
      url: data.url,
    });
  };

  useEffect(() => {
    details();
  }, []);

  return (
    <nasaDetails.Provider value={{ mainData }}>
      {props.children}
    </nasaDetails.Provider>
  );
};

export default InformationContext;
