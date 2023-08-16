import React from 'react';

export const RateReturn = ({onChange, value}) => {
  const handler = (event) => {
    // POST TO BACKEND
    onChange(parseInt(e.target.value));
  }

  return (
    <div className="frame">
      <label name="returns">
        Rate of Return
        <input id="returns" type="number" onChange={(e) => onChange(parseInt(e.target.value))} value={value} />
      </label>      
    </div>
  );
}
