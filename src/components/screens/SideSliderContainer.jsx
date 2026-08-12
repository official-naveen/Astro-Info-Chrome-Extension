import React, { useContext, useEffect, useState } from "react";
import "../styles/sideSliderContainer.css";
import nasaDetails from "../../context/infoContext/nasaDetails";
import dataStore from "../../context/valueStorage/dataStore";
import functionality from "../../context/functions/functionalitiesContext";

const SideSliderContainer = () => {
  const { mainData } = useContext(nasaDetails);
  const {
    data,
    changeNotification,
    clickedDataShowerOfMyHistory,
    clickedDataShowerOfMyFavorites,
  } = useContext(functionality);
  const { location, sideSliderContainerData } = useContext(dataStore);
  const [uniqueDataListOfMyHistory, setUniqueDataListOfMyHistory] = useState(
    []
  );
  const [uniqueDataListOfOfMyFavorites, setUniqueDataListOfMyFavorites] =
    useState([]);

  useEffect(() => {
    if (localStorage.getItem("myHistory")) {
      setUniqueDataListOfMyHistory(
        JSON.parse(localStorage.getItem("myHistory"))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("myHistory")]);

  useEffect(() => {
    if (localStorage.getItem("myFavorites")) {
      setUniqueDataListOfMyFavorites(
        JSON.parse(localStorage.getItem("myFavorites"))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("myFavorites")]);
  return (
    <>
      <div className="sideSliderContainer" style={sideSliderContainerData}>
        <h1 className="heading">{location ? location : "Explanation"}</h1>
        {location === "Explanation" ? (
          <p className="description">
            <b style={{ fontFamily: "sans-serif" }}>
              {changeNotification ? data.title : mainData.title}:
            </b>
            <br />
            {changeNotification ? data.explanation : mainData.explanation}
          </p>
        ) : location === "History" ? (
          <div className="descriptionHistory">
            {uniqueDataListOfMyHistory.map((name, index) => {
              return (
                <div key={index} onClick={clickedDataShowerOfMyHistory}>
                  <div className="dataContainer">
                    <div className="dataInfo">
                      <h6>{name.date}</h6>
                      <h4>
                        {name.title.length > 10
                          ? name.title.slice(0, 19) + "..."
                          : name.title}
                      </h4>
                    </div>
                    <img className="favoritesImage" src={name.hdURL} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="descriptionHistory">
            {uniqueDataListOfOfMyFavorites.map((name, index) => {
              return (
                <div key={index} onClick={clickedDataShowerOfMyFavorites}>
                  <div className="dataContainer">
                    <div className="dataInfo">
                      <h6>{name.date}</h6>
                      <h4>
                        {name.title.length > 10
                          ? name.title.slice(0, 19) + "..."
                          : name.title}
                      </h4>
                    </div>
                    <img className="favoritesImage" src={name.hdURL} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default SideSliderContainer;
