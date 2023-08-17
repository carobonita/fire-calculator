import React from 'react';

export const Username = ({onChange, value}) => {
  return (
    <div className="frame">
      <label name="username">
        Have we met? Please enter your username
        <input id="username" type="text" onChange={(e) => onChange(e.target.value)} value={value} />
      </label>
    </div>
  );
}
