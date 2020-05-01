import React from 'react';
import './Form.style.css';

const SearchForm = (props) => {
  return (
    <div className="formContainer">
      <form onSubmit={props.getWeather} className="form formStyle">
        <div>
          <input
            type="text"
            className="form"
            name="city"
            autoComplete="off"
            value={props.val}
            onChange={props.onChange}
            placeholder={props.text}
          />
        </div>
        <div>
          <button className="search" type="submit">
            Get Weather
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
