import React, { useContext } from "react";
import "../styles/sideSlider.css";
import dataStore from "../../context/valueStorage/dataStore";
import SideSliderContainer from "./SideSliderContainer";

const SideSlider = () => {
  const {
    location,
    setLocation,
    sideSliderData,
    setSideSliderData,
    sideSliderContainerData,
    setSideSliderContainerData,
  } = useContext(dataStore);

  const locator = (e) => {
    // Getting Clicked Block info and inner Content
    const currentLocation = e.target.innerHTML;
    setLocation(`${currentLocation}`);
    if (sideSliderData === "11rem") {
      setSideSliderData("-19rem");
      setSideSliderContainerData({
        opacity: "1",
        right: "0%",
      });
    } else if (
      sideSliderContainerData.right === "0%" &&
      currentLocation !== location
    ) {
      setSideSliderContainerData({
        opacity: "1",
        right: "0%",
      });
    } else {
      setSideSliderData("11rem");
      setSideSliderContainerData({
        opacity: "0",
        right: "-35%",
      });
    }
  };

  return (
    <>
      <div className="outSideContentShower">
        <div
          className="sideContentShower"
          style={{
            transform: `translate(${sideSliderData}, 0px) rotate(-90deg)`,
          }}
        >
          <div className="blocks" onClick={locator}>
            Explanation
          </div>
          <div className="blocks" onClick={locator}>
            Favorites
          </div>
          <div className="blocks" onClick={locator}>
            History
          </div>
        </div>
        <SideSliderContainer />
      </div>
    </>
  );
};

export default SideSlider;
