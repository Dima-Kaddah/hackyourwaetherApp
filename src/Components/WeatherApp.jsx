import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchForm from './Form';
import Cityrecharts from './Cityrecharts';
import Error from './Error';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function WeatherApp() {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  async function get_weather(City) {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`,
      );
      const data = await res.json();
      if (data.cod === 200) {
        const cityList = weather.filter((city) => city.id !== data.id);
        setWeather([data, ...cityList]);
        console.log(weather);
        setSearch('');
        setLoading(false);
        setError(false);
      } else {
        setError('Pleas Enter City Name!!!');
        setLoading(false);
        setSearch('');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  function updateSearch(event) {
    setSearch(event.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    get_weather(search);
  };

  function deleteCity(id) {
    const cityList = weather.filter((city) => city.id !== id);
    setWeather(cityList);
  }

  console.log(weather);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <div className="App">
            <header className="App-header">
              <h1>Welcome to HYF Weather app</h1>
            </header>

            <SearchForm
              text="Search Weather"
              getWeather={onSubmit}
              val={search}
              onChange={updateSearch}
            />
            {error && <Error thereEroror={error} />}
            {isLoading && <p>Loading ....</p>}
            {weather && (
              <WeatherCard cityInfo={weather} cityDelete={deleteCity} />
            )}
          </div>
        </Route>
        <Route path="/:cityId">
          <Cityrecharts />
        </Route>
      </Switch>
    </Router>
  );
}
