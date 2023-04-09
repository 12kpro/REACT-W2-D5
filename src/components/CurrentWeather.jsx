import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CurrentWheather = (props) => {
  const OPENWHEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

  const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";
  const coordinates = useSelector((state) => state.coordinates);
  const [weatherData, setweatherData] = useState(null);

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        props.updateLoaders(1, true);
        props.updateError(1, "");
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setweatherData(data);
          props.updateLoaders(1, true);
        } else {
          props.updateError(1, "No data retrived!");
        }
      } catch (error) {
        props.updateError(1, error.message);
      } finally {
        props.updateLoaders(1, false);
      }
    };

    if (coordinates) {
      const queryParam = new URLSearchParams(coordinates).toString();
      fetchData(`${OPENWHEATHER_BASE_URL}&appid=${API_KEY}&units=metric&${queryParam}`);
    }
  }, [coordinates]);

  const msToDate = (ms, locale) => {
    const date = new Date(ms * 1000);
    return date.toLocaleString(locale);
  };
  return (
    <>
      {weatherData && (
        <div className="border-bottom border-3 mb-4">
          <div className="sm">
            <p className="fs-1 fw-semibold mb-0">{weatherData.name}</p>
            <p className="tracking-wide text-gray-500 dark:text-gray-400">{msToDate(weatherData.dt, "it-IT")}</p>
          </div>
          <div className="my-3 d-flex justify-content-between">
            <div className="mt-6 display-1">
              {weatherData.main.temp.toFixed(0)}°
              <p className="mt-1 fw-normal fs-4">Feels like {weatherData.main.feels_like.toFixed(0)}°</p>
            </div>
            <div className="mt-4 display-1">
              <span className={`wi wi-owm-day-${weatherData.weather[0].id}`}></span>
            </div>
          </div>
          <div className="mt-1 fs-5">
            <span className="wi wi-strong-wind "></span>
            <span className="mx-3 ">{weatherData.wind.speed} m/s winds</span>
            <span className="wi wi-humidity"></span>
            <span className="ms-3">{weatherData.main.humidity} humidity</span>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentWheather;
/*
      {weatherData.list.map((day) => (
        <div></div>
      ))}
      {coordinates && isLoading && !error && (
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {coordinates && !error && isLoading && (
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


*/
