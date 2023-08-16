import React from 'react';

export const AmountContribution = ({onChange, value}) => {
  return (
    <div className="frame">
      <label name="amount">
        Amount to Contribute
        <input id="amount" type="number" onChange={(e) => onChange(parseInt(e.target.value))} value={value} />
      </label>
    </div>
  );
}
