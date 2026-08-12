import React, { useContext } from "react";
import "../styles/mainBody.css";
import nasaDetails from "../../context/infoContext/nasaDetails";
import SideSlider from "./SideSlider";
import DateAndTimeShower from "./DateAndTimeShower";
import functionality from "../../context/functions/functionalitiesContext";

function MainBody() {
  const { mainData } = useContext(nasaDetails);
  const { changeNotification, data } = useContext(functionality);

  return (
    <div
      className="mainBodyContainer"
      style={{
        backgroundImage: `url(${
          changeNotification ? data.hdURL : mainData.hdURL
        })`,
      }}
    >
      <DateAndTimeShower />
      <SideSlider />
    </div>
  );
}

export default MainBody;
