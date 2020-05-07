import React from 'react';
import './Error.style.css';

const Error = ({ thereEroror }) => {
  return (
    <div className="error">
      {thereEroror ? (
        <div className="err" role="alert">
          {thereEroror}
        </div>
      ) : null}
    </div>
  );
};

export default Error;
