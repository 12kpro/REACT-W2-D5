import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CurrentWheather = () => {
  const OPENWHEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

  const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";
  const coordinates = useSelector((state) => state.coordinates);
  const [weatherData, setweatherData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setISLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setweatherData([data]);
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
      fetchData(`${OPENWHEATHER_BASE_URL}&appid=${API_KEY}&units=metric&${queryParam}`);
    }
  }, [coordinates]);

  const msToDate = (ms, locale) => {
    const date = new Date(ms * 1000);
    return date.toLocaleString(locale);
  };
  return (
    <div className="p-4 border-bottom border-3">
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
      {weatherData.length === 0 && !error && !isLoading && (
        <div className="alert alert-success" role="alert">
          No movies found!
        </div>
      )}
      {error && !isLoading && (
        <div className="alert alert-danger" role="alert">
          {errorMsg ? errorMsg : "Network problem!"}
        </div>
      )}
      {weatherData.length > 0 && (
        <>
          <div className="sm">
            <p className="fs-2 fw-semibold">{weatherData[0].name}</p>
            <p className="tracking-wide text-gray-500 dark:text-gray-400">{msToDate(weatherData[0].dt, "it-IT")}</p>
          </div>
          <div className="my-3 d-flex justify-content-between">
            <div className="mt-6 display-1">
              {weatherData[0].main.temp.toFixed(0)}
              <p className="mt-1 fw-normal fs-4">Feels like {weatherData[0].main.feels_like.toFixed(0)}</p>
            </div>
            <div className="mt-4 display-1">
              <span className={`wi wi-owm-day-${weatherData[0].weather[0].id}`}></span>
            </div>
          </div>
          <div className="mt-1 fs-5">
            <span className="wi wi-strong-wind "></span>
            <span className="mx-3 ">{weatherData[0].wind.speed} m/s winds</span>
            <span className="wi wi-humidity"></span>
            <span className="ms-3">{weatherData[0].main.humidity} humidity</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CurrentWheather;
/*
      {weatherData.list.map((day) => (
        <div></div>
      ))}
*/
