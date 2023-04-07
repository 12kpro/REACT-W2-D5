import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DailyWheater = () => {
  const OPENWHEATHER_DAILY_URL = "https://api.openweathermap.org/data/2.5/forecast?";
  const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";
  const coordinates = useSelector((state) => state.coordinates);
  const [dailyWeatherData, setDailyWeatherData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setDailyWeatherData([data]);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
        setErrorMsg(error.message);
      } finally {
        setISLoading(false);
      }
    };
    if (coordinates.length > 0) {
      const queryParam = new URLSearchParams(coordinates[0]).toString();
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
      {coordinates.length > 0 && isLoading && !error && (
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {coordinates.length === 0 && !error && isLoading && (
        <div className="alert alert-success" role="alert">
          Insert search location
        </div>
      )}
      {dailyWeatherData.length === 0 && !error && !isLoading && (
        <div className="alert alert-success" role="alert">
          No movies found!
        </div>
      )}
      {error && !isLoading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg ? errorMsg : "Network problem!"}
        </div>
      )}
      {dailyWeatherData.length > 0 && (
        <ul className="list-group p-4">
          {dailyWeatherData[0].list.map((day, i) => (
            <li key={i} className="d-flex flex-row justify-content-between list-group-item">
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DailyWheater;
/*      {dailyWeatherData.length === 0 && !error && !isLoading && (
        <div className="alert alert-success" role="alert">
          No movies found!
        </div>
      )}

      {dailyWheaterData.list.map((day) => (
        <div></div>
      ))}

        <ul className="list-group">
          <li className="d-flex flex-row list-group-item">
            <span className="flex-1 text-left">Saturday</span>
            <span className="text-2xl text-indigo-700 dark:text-white">
              <span className="wi wi-day-sunny"></span>
            </span>
            <span className="flex-1 text-right">22° / 22°</span>
          </li>
          <li className="d-flex flex-row list-group-item">
            <span className="flex-1 text-left">Saturday</span>
            <span className="text-2xl text-indigo-700 dark:text-white">
              <span className="wi wi-day-sunny"></span>
            </span>
            <span className="flex-1 text-right">22° / 22°</span>
          </li>
          <li className="d-flex flex-row list-group-item">
            <span className="flex-1 text-left">Saturday</span>
            <span className="text-2xl text-indigo-700 dark:text-white">
              <span className="wi wi-day-sunny"></span>
            </span>
            <span className="flex-1 text-right">22° / 22°</span>
          </li>
          <li className="d-flex flex-row list-group-item">
            <span className="flex-1 text-left">Saturday</span>
            <span className="text-2xl text-indigo-700 dark:text-white">
              <span className="wi wi-day-sunny"></span>
            </span>
            <span className="flex-1 text-right">22° / 22°</span>
          </li>
        </ul>


<SliderItem key={movie.imdbID} image={movie.Poster} movieId={movie.imdbID} />

    <div class="m-4">
      <div class="">
        <ul class="mt-4">
          <li class="flex flex-row p-1 text-gray-500 dark:text-white">
            <span class="flex-1 text-left">Saturday</span>
            <span class="text-2xl text-indigo-700 dark:text-white">
              <span class="wi wi-day-sunny"></span>
            </span>
            <span class="flex-1 text-right">22° / 22°</span>
          </li>
        </ul>
        <ul class="mt-4">
          <li class="flex flex-row p-1 text-gray-500 dark:text-white">
            <span class="flex-1 text-left">Sunday</span>
            <span class="text-2xl text-indigo-700 dark:text-white">
              <span class="wi wi-day-cloudy-gusts"></span>
            </span>
            <span class="flex-1 text-right">22° / 22°</span>
          </li>
        </ul>
        <ul class="mt-4">
          <li class="flex flex-row p-1 text-gray-500 dark:text-white">
            <span class="flex-1 text-left">Monday</span>
            <span class="text-2xl text-indigo-700 dark:text-white">
              <span class="wi wi-day-cloudy-gusts"></span>
            </span>
            <span class="flex-1 text-right">24° / 24°</span>
          </li>
        </ul>
        <ul class="mt-4">
          <li class="flex flex-row p-1 text-gray-500 dark:text-white">
            <span class="flex-1 text-left">Tuesday</span>
            <span class="text-2xl text-indigo-700 dark:text-white">
              <span class="wi wi-day-cloudy-gusts"></span>
            </span>
            <span class="flex-1 text-right">25° / 25°</span>
          </li>
        </ul>
        <ul class="mt-4">
          <li class="flex flex-row p-1 text-gray-500 dark:text-white">
            <span class="flex-1 text-left">Wednesday</span>
            <span class="text-2xl text-indigo-700 dark:text-white">
              <span class="wi wi-day-sunny-overcast"></span>
            </span>
            <span class="flex-1 text-right">22° / 22°</span>
          </li>
        </ul>
      </div>
    </div>
*/
/*

*/
