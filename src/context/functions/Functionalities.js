import React, { useContext, useEffect, useState } from "react";
import functionality from "./functionalitiesContext";
import nasaDetails from "../infoContext/nasaDetails.js";
import dataStore from "../valueStorage/dataStore";

const Functionalities = (props) => {
  const { mainData } = useContext(nasaDetails);
  const { setLoading } = useContext(dataStore);

  const [changeNotification, setChangeNotification] = useState(false);
  const [buttonsShower, setButtonShower] = useState(false);

  const [dataList, setDataList] = useState(
    localStorage.getItem("myHistory")
      ? JSON.parse(localStorage.getItem("myHistory"))
      : []
  );
  const [favoriteDataList, setFavoriteDataList] = useState(
    localStorage.getItem("myFavorites")
      ? JSON.parse(localStorage.getItem("myFavorites"))
      : []
  );

  const [data, setData] = useState({
    date: mainData.date,
    explanation: mainData.explanation,
    hdURL: mainData.hdURL,
    title: mainData.title,
    url: mainData.url,
  });

  const currentDate = mainData.date.replaceAll("-0", "-");
  const newCurrentDate = new Date(currentDate);
  const [year, setYear] = useState(newCurrentDate.getFullYear());
  const [month, setMonth] = useState(newCurrentDate.getMonth() + 1);
  const [date, setDate] = useState(newCurrentDate.getDate());
  let currentBaseDate = `${year}-${month}-${date}`;
  console.log(mainData);

  // variable to catch leap Year
  const year2digit = currentDate.toLocaleString("default", {
    year: "numeric",
  });

  // Updating current date according to mainData to make it base take to go in previous date
  useEffect(() => {
    setYear(newCurrentDate.getFullYear());
    setMonth(newCurrentDate.getMonth() + 1);
    setDate(newCurrentDate.getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData]);

  // Function:- To go on Past Dates
  async function previousDates() {
    setDate(date - 1);

    if (month < 1) {
      setMonth(12);
      setDate(31);
      setYear(year - 1);
    }

    if (date === 1) {
      setMonth(month - 1);
      const newMonth = month - 1;
      if (newMonth === 1) {
        setDate(31);
      } else if (newMonth === 2) {
        const leapYear = +year2digit.slice(2);
        if (leapYear % 4 === 0) {
          setDate(29);
        } else {
          setDate(28);
        }
      } else if (newMonth === 3) {
        setDate(31);
      } else if (newMonth === 4) {
        setDate(30);
      } else if (newMonth === 5) {
        setDate(31);
      } else if (newMonth === 6) {
        setDate(30);
      } else if (newMonth === 7) {
        setDate(31);
      } else if (newMonth === 8) {
        setDate(31);
      } else if (newMonth === 9) {
        setDate(30);
      } else if (newMonth === 10) {
        setDate(31);
      } else if (newMonth === 11) {
        setDate(30);
      } else if (newMonth === 12) {
        setDate(31);
      }
    }
  }

  // Function:- To go on further Dates
  async function tomorrowsDates() {
    setDate(date + 1);

    if (month > 12) {
      setMonth(1);
      setDate(1);
      setYear(year + 1);
    }

    if (date === 31) {
      setMonth(month + 1);
      setDate(1);
    } else if (date === 30 && month === (4 || 6 || 9 || 11)) {
      setMonth(month + 1);
      setDate(1);
    } else if (date === 28 && month === 2) {
      setMonth(month + 1);
      setDate(1);
    }
  }

  // main Data caller function :- calling all display data from API
  // with the using of above function code
  async function mainDataCaller(date) {
    setLoading(true);
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=Cr2BhJAbRjyFHOTFdUbpWmv5I3L6kgNsCZ3vZsUK&date=${date}`
    );
    const localData = await res.json();
    setData({
      date: localData.date,
      explanation: localData.explanation,
      hdURL: localData.hdurl,
      title: localData.title,
      url: localData.url,
    });
    setChangeNotification(true);
    setLoading(false);
  }

  useEffect(() => {
    if (currentBaseDate !== "NaN-NaN-NaN") {
      mainDataCaller(currentBaseDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBaseDate]);

  // Calling API according to random dates
  const random = async () => {
    setLoading(true);
    const res = await fetch(
      "https://api.nasa.gov/planetary/apod?api_key=Cr2BhJAbRjyFHOTFdUbpWmv5I3L6kgNsCZ3vZsUK&count=1"
    );
    const localData = await res.json();
    setData({
      date: localData[0].date,
      explanation: localData[0].explanation,
      hdURL: localData[0].hdurl,
      title: localData[0].title,
      url: localData[0].url,
    });
    setChangeNotification(true);
    setButtonShower(true);
    setLoading(false);
  };

  // collecting all data from all APIs called above
  function pastDisplayDataCollector() {
    if (data.hdURL !== "") {
      const newDataList = [...dataList, data || mainData];
      const uniqueArray = Array.from(
        new Set(newDataList.map(JSON.stringify)),
        JSON.parse
      );
      localStorage.setItem("myHistory", JSON.stringify(uniqueArray));
      setDataList(uniqueArray);
    }
  }

  useEffect(() => {
    if (currentBaseDate !== "NaN-NaN-NaN") {
      pastDisplayDataCollector();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, mainData, currentBaseDate]);

  // Collecting all Favorites data on clicking on 'Save'
  function favoritesDataCollector() {
    if (data.hdURL !== "") {
      const newDataList = [...favoriteDataList, data || mainData];
      const uniqueArray = Array.from(
        new Set(newDataList.map(JSON.stringify)),
        JSON.parse
      );
      localStorage.setItem("myFavorites", JSON.stringify(uniqueArray));
      setFavoriteDataList(uniqueArray);
    }
  }

  // Display data respective to clicked data from sideSliderContainer

  const clickedDataShowerOfMyHistory = (event) => {
    const targetedElement =
      event.target.parentNode.children[0].children[0].innerHTML;

    if (targetedElement !== ("undefined" || undefined || null)) {
      JSON.parse(localStorage.getItem("myHistory")).forEach(
        (clickedElement) => {
          if (targetedElement === clickedElement.date) {
            setLoading(true);
            console.log(clickedElement);
            setData(clickedElement);
            setChangeNotification(true);
            setButtonShower(true);
            setLoading(false);
          }
        }
      );
    }
  };

  const clickedDataShowerOfMyFavorites = (event) => {
    const targetedElement =
      event.target.parentNode.children[0].children[0].innerHTML;

    if (targetedElement !== ("undefined" || undefined || null)) {
      JSON.parse(localStorage.getItem("myFavorites")).forEach(
        (clickedElement) => {
          if (targetedElement === clickedElement.date) {
            setLoading(true);
            console.log(clickedElement);
            setData(clickedElement);
            setChangeNotification(true);
            setButtonShower(true);
            setLoading(false);
          }
        }
      );
    }
  };

  return (
    <functionality.Provider
      value={{
        random,
        previousDates,
        tomorrowsDates,
        changeNotification,
        setChangeNotification,
        data,
        setData,
        buttonsShower,
        setButtonShower,
        favoritesDataCollector,
        clickedDataShowerOfMyHistory,
        clickedDataShowerOfMyFavorites,
        currentDate,
        currentBaseDate,
      }}
    >
      {props.children}
    </functionality.Provider>
  );
};

export default Functionalities;
