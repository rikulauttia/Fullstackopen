import React from "react";

const CountryList = ({ countries, onShowCountry }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          <p>
            {country.name.common}{" "}
            <button onClick={() => onShowCountry(country)}>show</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
