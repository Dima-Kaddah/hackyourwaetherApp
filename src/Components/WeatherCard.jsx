import React from 'react';
import DeleteBtn from './DeleteBtn';
import './Card.style.css';
import { Link } from 'react-router-dom';

const WeatherCard = ({ cityInfo, cityDelete, thereEroror }) => {
  return cityInfo.map((city, index) => {
    return (
      <div className="container" key={index}>
        <DeleteBtn handleDelete={cityDelete} city={city} />
        <div className="card">
          <Link to={'/' + city.id} className="recharts">
            <h2>{city.name}</h2>
          </Link>
          {city.main.temp ? (
            <h2 className="temp">{celsius(city.main.temp)}&deg;</h2>
          ) : null}
          {minmaxTemp(celsius(city.main.temp_min), celsius(city.main.temp_max))}
          {discrMain(city.weather[0].main, city.weather[0].description)}
          {location(city.coord.lon, city.coord.lat)}
        </div>
      </div>
    );
  });
};

function minmaxTemp(min, max) {
  if (!!min && !!max) {
    return (
      <h3>
        <span className="minmax">min temp: {min}&deg;</span>
        <span className="minmax">max temp: {max}&deg;</span>
      </h3>
    );
  }
}
function discrMain(main, discription) {
  return (
    <h2>
      <span className="discrMain">{main}</span>
      <span className="discrMain dis">{discription}</span>
    </h2>
  );
}

function location(lon, lat) {
  if (lon && lat) {
    return (
      <h4>
        <span>location:</span>
        <span className="lonLat">
          {lon},{lat}
        </span>
      </h4>
    );
  }
}

function celsius(temp) {
  let cels = Math.floor(temp - 273.15);
  return cels;
}

export default WeatherCard;
