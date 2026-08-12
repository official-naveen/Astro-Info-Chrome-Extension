import React, { useContext, useEffect } from "react";
import "../styles/dateAndTimeShower.css";
import nasaDetails from "../../context/infoContext/nasaDetails";
import functionality from "../../context/functions/functionalitiesContext";

const DateAndTimeShower = () => {
  const { mainData } = useContext(nasaDetails);

  const {
    changeNotification,
    setChangeNotification,
    data,
    setData,
    previousDates,
    tomorrowsDates,
    random,
    buttonsShower,
    setButtonShower,
    favoritesDataCollector,
    currentDate,
    currentBaseDate,
  } = useContext(functionality);

  useEffect(() => {
    setData(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeNotification]);

  const formattedDate = new Date(
    changeNotification
      ? data.date.replace("-0", "-")
      : mainData.date.replace("-0", "-")
  );

  // debugger;
  const year = formattedDate.toLocaleString("default", { year: "numeric" });
  const month = formattedDate.toLocaleString(`default`, { month: "long" });
  const date = formattedDate.toLocaleString("default", { day: "2-digit" });

  const dataDate = month + " " + date + " " + year;

  return (
    <div className="outerDateAndTimeShowerContainer">
      <div className="dateAndTimeShowerContainer">
        <div className="date blocks2">
          {!buttonsShower ? (
            <span
              className="material-symbols-outlined arrow"
              onClick={previousDates}
            >
              arrow_left
            </span>
          ) : (
            <div></div>
          )}
          <h3 className="date">{dataDate}</h3>

          {!buttonsShower ? (
            currentDate !== currentBaseDate ? (
              <span
                className="material-symbols-outlined arrow"
                onClick={tomorrowsDates}
              >
                arrow_right
              </span>
            ) : (
              <span
                className="material-symbols-outlined"
                style={{ opacity: "0", cursor: "context-menu" }}
              >
                arrow_right
              </span>
            )
          ) : (
            <span
              className="material-symbols-outlined"
              style={{ opacity: "0", cursor: "context-menu" }}
            >
              arrow_right
            </span>
          )}
        </div>
        <div className="imageName blocks2">
          <h2 className="title">
            {changeNotification ? data.title : mainData.title}
          </h2>
          <h6 className="otherOptionBlocks">HD</h6>
        </div>
        <div className="otherOptions blocks2">
          <h5
            className="otherOptionBlocks"
            onClick={() => {
              setChangeNotification(false);
              setButtonShower(false);
            }}
          >
            Today
          </h5>
          <h5 className="otherOptionBlocks" onClick={random}>
            Random
          </h5>
          <h5 className="otherOptionBlocks" onClick={favoritesDataCollector}>
            Save
          </h5>
        </div>
      </div>
    </div>
  );
};

export default DateAndTimeShower;
