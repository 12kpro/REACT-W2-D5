import { useState } from "react";
import { useDispatch } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import DailyWeather from "./DailyWeather";

const OPENWHEATHER_GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?";
const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";

const MainSearch = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState([false, false, false]);
  const [errors, setErrors] = useState(["", "", ""]);

  const updateFetchLoadingState = (index, state) => {
    setIsLoading((existingItems) => {
      return [...existingItems.slice(0, index), (existingItems[index] = state), ...existingItems.slice(index + 1)];
    });
  };
  const updateFetchErrorState = (index, state) => {
    setErrors((existingItems) => {
      return [...existingItems.slice(0, index), (existingItems[index] = state), ...existingItems.slice(index + 1)];
    });
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      updateFetchLoadingState(0, true);
      updateFetchErrorState(0, "");
      const response = await fetch(`${OPENWHEATHER_GEO_URL}&appid=${API_KEY}&q=${query}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          dispatch({ type: "UPDATE_COORDINATES", payload: { lat: data[0].lat, lon: data[0].lon } });
        } else {
          updateFetchErrorState(0, "Invalid location!");
        }
      }
    } catch (error) {
      updateFetchErrorState(0, error.message);
    } finally {
      updateFetchLoadingState(0, false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 offset-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1>Weather Checker</h1>

            <div className={`icon sun-shower ${isLoading[0] || isLoading[1] || isLoading[2] ? "loading" : ""}`}>
              <div className="cloud"></div>
              <div className="sun">
                <div className="rays"></div>
              </div>
              <div className="rain"></div>
            </div>
          </div>
        </div>
        <div className="col-6 offset-3 mb-3">
          <form className="border-bottom border-3 pb-2" onSubmit={handleSubmit}>
            <input
              type="search"
              id="search"
              className="form-control"
              value={query}
              onChange={handleChange}
              placeholder="type a location and press Enter"
            />
          </form>
        </div>
        {errors[0] || errors[1] || errors[2] ? (
          <div className="col-6 offset-3">
            {errors.map((error, i) => {
              if (error) {
                return (
                  <div key={i} className="alert alert-danger" role="alert">
                    {error}
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <>
            <div className="col-6 offset-3">
              <CurrentWeather updateLoaders={updateFetchLoadingState} updateError={updateFetchErrorState} />
            </div>
            <div className="col-6 offset-3">
              <DailyWeather updateLoaders={updateFetchLoadingState} updateError={updateFetchErrorState} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MainSearch;
