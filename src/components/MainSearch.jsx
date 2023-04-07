import { useState } from "react";
import { useDispatch } from "react-redux";
import CurrentWeather from "./CurrentWeather";
import DailyWeather from "./DailyWeather";

const OPENWHEATHER_GEO_URL = "http://api.openweathermap.org/geo/1.0/direct?";
const API_KEY = "2ce5b124ba3aaa95f52940ea92d2e8bb";

const MainSearch = () => {
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const geoUrl = `${OPENWHEATHER_GEO_URL}&appid=${API_KEY}&q=${query}`;

    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          alert("Error fetching results");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const queryCoordinates = await fetchData(geoUrl);
    dispatch({ type: "UPDATE_COORDINATES", payload: [{ lat: queryCoordinates[0].lat, lon: queryCoordinates[0].lon }] });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Weather Checker</h1>
        </div>
        <div className="col-12">
          <form className="form-floating" onSubmit={handleSubmit}>
            <label htmlFor="search" className="form-label">
              Password
            </label>
            <input
              type="search"
              id="search"
              className="form-control"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </form>
        </div>
        <div className="col-12">
          <CurrentWeather />
        </div>
        <div className="col-12">
          <DailyWeather />
        </div>
      </div>
    </div>
  );
};

export default MainSearch;
