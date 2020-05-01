import React, { useState } from 'react';
import WeatherCard from './Components/WeatherCard';
import SearchForm from './Components/Form';
import Cityrecharts from './Components/Cityrecharts';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const API_KEY = process.env.REACT_APP_API_KEY;

export default function App() {
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(false);

  async function get_weather(City) {
    setLoading(true);
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_KEY}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (!!data) {
          console.log(data);
          const cityList = weather.filter((city) => city.id !== data.id);
          setWeather([data, ...cityList]);
          console.log(weather);
          setSearch('');
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      });
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

            {isLoading && <p>Loading ....</p>}
            <WeatherCard
              cityInfo={weather}
              cityDelete={deleteCity}
              thereEroror={error}
            />
          </div>
        </Route>
        <Route path="/:cityId">
          <Cityrecharts />
        </Route>
      </Switch>
    </Router>
  );
}
