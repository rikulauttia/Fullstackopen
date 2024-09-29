import React, { useEffect, useState } from "react";

import axios from "axios";

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${apiKey}`
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (country.capital) {
      fetchWeather();
    }
  }, [country.capital, apiKey]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        style={{ width: "150px", border: "1px solid black" }}
      />
      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature {weather.main.temp} Celsius</p>
          <p>wind {weather.wind.speed} m/s</p>
          <p>weather {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
