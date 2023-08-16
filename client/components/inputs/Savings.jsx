import React from 'react';

export const Savings = ({onChange, value}) => {
  return (
    <div className="frame">
      <label name="savings">
        Current Savings
        <input id="savings" type="number" onChange={(e) => onChange(parseInt(e.target.value))} value={value} />
      </label>      
    </div>
  );
}
