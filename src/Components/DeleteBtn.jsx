import React from 'react';

export default function DeleteBtn({ handleDelete, city }) {
  return (
    <div className="deletebtnParent">
      <button className="deleteBtn" onClick={() => handleDelete(city.id)}>
        &#215;
      </button>
    </div>
  );
}
