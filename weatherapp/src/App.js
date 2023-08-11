import { useEffect, useState } from "react";
import "./App.css";
import { Sidebar } from "./components/sidebar/Sidebar";
import { TiWeatherSunny } from "react-icons/ti";
import { WiRain } from "react-icons/wi";
import { WiDayHaze } from "react-icons/wi";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(getPositions);
    function getPositions(position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getData(lat, lon);
    }

    async function getData(lat, lon) {
      const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0d0de8ca08d2687d93ba30dc39f1dc81`
      );
      const response = await result.json();
      setData(response);
    }
  }, []);

  async function callApi(cityName) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0d0de8ca08d2687d93ba30dc39f1dc81`
    );
    const response = await res.json();
    setData(response);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      callApi(input);
    }
    setInput("");
  };
  console.log(data);

  return (
    <div className="app">
      <div className="infoWeather">
        <h1 className="cityTemp">
          {Math.round(data.main?.temp - 273.15)}
          {"\u00b0"}
        </h1>
        <h3 className="cityName">{data.name}</h3>
        <div className="cityWeatherIcon">
          <div className="weatherIcon">
            {data.weather?.[0]?.main === "Clear" ? (
              <TiWeatherSunny />
            ) : data.weather?.[0]?.main === "Rain" ? (
              <WiRain />
            ) : data.weather?.[0]?.main === "Haze" ? (
              <WiDayHaze />
            ) : (
              ""
            )}
          </div>
          <h5>{data.weather?.[0]?.main}</h5>
        </div>
      </div>
      <Sidebar
        handleSubmit={handleSubmit}
        input={input}
        setInput={setInput}
        data={data}
      />
    </div>
  );
}

export default App;
