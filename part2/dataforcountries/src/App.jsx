import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (query) {
      axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          setCountries(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setCountries([]);
    }
  }, [query]);

  useEffect(() => {
    const results = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(results);
  }, [countries, query]);

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <div className="App">
      <h1>Country Information</h1>
      <input
        type="text"
        placeholder="Search for a country..."
        value={query}
        onChange={handleSearchChange}
      />
      <CountryList
        countries={filteredCountries}
        query={query}
        onSelectCountry={setSelectedCountry}
      />
      {selectedCountry && <CountryDetails country={selectedCountry} />}
    </div>
  );
}

const CountryList = ({ countries, query, onSelectCountry }) => {
  if (!query) return <p>Type a country name to start...</p>;

  if (countries.length > 10) {
    return <p>Too many matches, specify further...</p>;
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => onSelectCountry(country)}>Show Details</button>
        </li>
      ))}
    </ul>
  );
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY; // Access the API key from environment variables

  useEffect(() => {
    if (country.capital) {
      const capital = country.capital[0];
      axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: capital,
          appid: api_key,
          units: 'metric'
        }
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [country, api_key]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default App;
