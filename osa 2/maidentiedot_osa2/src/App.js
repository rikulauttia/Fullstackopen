import { useEffect, useState } from "react";

import CountryDetails from "./components/CountryDetails";
import CountryList from "./components/CountryList";
import Search from "./components/Search";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    const searchTerm = event.target.value.toLowerCase();
    const countriesToShow = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
    setFilteredCountries(countriesToShow);
    setSelectedCountry(null);
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="app-container">
      <p>find countries</p>
      <Search value={search} onChange={handleSearchChange} />
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <CountryList
          countries={filteredCountries}
          onShowCountry={handleShowCountry}
        />
      )}
    </div>
  );
};

export default App;
