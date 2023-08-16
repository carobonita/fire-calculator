import React from 'react';

export const Expenses = ({onChange, value}) => {
  return (
    <div className="frame">
      <label name="expenses">
        Annual Retirement Expenses
        <input id="expenses" type="number" onChange={(e) => onChange(parseInt(e.target.value))} value={value} />
      </label>
    </div>
  );
}
