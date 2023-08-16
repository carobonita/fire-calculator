import React from 'react';

export const FrequencyContributions = ({onChange, value}) => {
  return (
    <div className="frame">
      <label name="frequency">
        Contribution Frequency
        <select name="frequency" onChange={onChange} value={value}>
          <option value="monthly">Monthly</option>
          <option value="annually">Annually</option>
          </select>
      </label>      
    </div>
  );
}
