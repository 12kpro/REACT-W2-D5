import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DailyWeather = (props) => {
  const OPENWHEATHER_DAILY_URL = "https://api.openweathermap.org/data/2.5/forecast?";
  const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";
  const coordinates = useSelector((state) => state.coordinates);
  const [dailyWeatherData, setDailyWeatherData] = useState(null);

  const parseDailyWeather = (data) => {
    for (const item of data) {
      let date = new Date(item.dt * 1000);
      item.day = date.getDay();
      item.hour = date.getHours();
      item.minutes = date.getMinutes();
    }
    return data;
  };
  useEffect(() => {
    const fetchData = async (url) => {
      try {
        props.updateLoaders(2, true);
        props.updateError(2, "");
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDailyWeatherData(parseDailyWeather(data.list));
          props.updateLoaders(2, true);
        } else {
          props.updateError(2, "No data retrived!");
        }
      } catch (error) {
        props.updateError(2, error.message);
      } finally {
        props.updateLoaders(2, false);
      }
    };
    if (coordinates) {
      const queryParam = new URLSearchParams(coordinates).toString();
      fetchData(`${OPENWHEATHER_DAILY_URL}appid=${API_KEY}&units=metric&${queryParam}`);
    }
  }, [coordinates]);

  const msToDate = (ms, locale, type) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date(ms * 1000);
    //date = date.toLocaleString(locale);
    if (type === "weekDay") {
      return days[date.getDay()];
    } else if (type === "dayTime") {
      return date.toLocaleTimeString(locale);
    }
  };

  return (
    <>
      {dailyWeatherData && (
        <div className="list-group">
          {dailyWeatherData.map((day, i) => (
            <div key={i} className="d-flex flex-row justify-content-between align-items-center">
              <span className="flex-grow-1 text-start w-25">{`${msToDate(day.dt, "it-IT", "weekDay")}, ${msToDate(
                day.dt,
                "it-IT",
                "dayTime"
              )}`}</span>
              <span className="fs-2">
                <span className={`wi wi-owm-day-${day.weather[0].id}`}></span>
              </span>
              <span className="flex-grow-1 text-end w-25">
                {day.main.temp_min.toFixed(0)}° / {day.main.temp_max.toFixed(0)}°
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DailyWeather;
