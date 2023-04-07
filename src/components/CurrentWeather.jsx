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
        <div className="m-4">
          <div className="sm">
            <p className="text-2xl font-semibold tracking-wide dark:text-white">{weatherData[0].name}</p>
            <p className="tracking-wide text-gray-500 dark:text-gray-400">{weatherData[0].dt}</p>
          </div>
          <div className="my-8 d-flex flex-row justify-content-between text-5xl tracking-wide">
            <span className="mt-6 font-light text-gray-500 dark:text-white md:mt-10">
              {weatherData[0].main.temp}
              <span className="mt-1 flex flex-col text-base font-normal tracking-wide text-gray-500 dark:text-gray-400">
                Feels like {weatherData[0].main.feels_like}
              </span>
            </span>
            <div className="mt-4 text-8xl text-indigo-700 dark:text-white sm:text-9xl">
              <span className="wi wi-day-cloudy-gusts"></span>
            </div>
          </div>
          <div className="mt-1 text-indigo-700 dark:text-gray-400">
            <span className="wi wi-strong-wind text-xl"></span>
            <span className="ml-1 mr-2 tracking-wide text-gray-500 dark:text-white">
              {weatherData[0].wind.speed}m/s winds
            </span>
            <span className="wi wi-humidity text-xl"></span>
            <span className="ml-1 tracking-wide text-gray-500 dark:text-white">
              {weatherData[0].main.humidity} humidity
            </span>
          </div>
          <div className="mt-10 mb-4 text-center text-2xl tracking-wide text-gray-500 dark:text-white"></div>
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
*/
