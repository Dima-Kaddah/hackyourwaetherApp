import React from 'react';
import './Card.style.css';

const WeatherCard = (props) => {
  return (
    <div className="container">
      <div className="error">{props.error ? error() : null}</div>
      <div className="card">
        {props.WBackground ? (
          <img src={props.WBackground} alt={'weatherApp backgrounds'} />
        ) : null}
        <h2>{props.city}</h2>
        <i className={`wi ${props.WIcons} bigFont`}></i>
        {props.temp ? (
          <h2 className="temp"> {Celsius(props.temp)}&deg;</h2>
        ) : null}
        {minmaxTemp(Celsius(props.temp_min), Celsius(props.temp_max))}
        {discrMain(props.main, props.discription)}
        {location(props.lon, props.lat)}
      </div>
    </div>
  );
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

function Celsius(temp) {
  let cels = Math.floor(temp - 273.15);
  return cels;
}

function error() {
  return (
    <div className="err" role="alert">
      Please Enter city or Country!!
    </div>
  );
}
export default WeatherCard;
