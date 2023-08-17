import React, { useEffect, useState } from 'react';
import { Expenses } from './components/inputs/Expenses.jsx';
import { Username } from './components/inputs/Username.jsx';
import { Savings } from './components/inputs/Savings.jsx';
import { FrequencyContributions } from './components/inputs/FrequencyContributions.jsx';
import { RateReturn } from './components/inputs/RateReturn.jsx';
import { AmountContribution } from './components/inputs/AmountContribution.jsx';
import { set } from 'mongoose';
import style from 'styled-components'

const App = () => {
  const [username, setUsername] = useState();
  const [didLogin, setDidLogin] = useState(false);
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(0);
  const [rateReturn, setRateReturn] = useState(7);
  const [calculatedYears, setCalculatedYears] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

  const handleLogin = () => {    
    fetch('/api/load_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    })
    .then((res) => res.json())
    .then((data) => {
      setAmount(data.amount);
      setExpenses(data.expenses);
      setFrequency(data.amount_frequency);
      setRateReturn(data.rate);
      setSavings(data.savings);            
      setDidLogin(true);
    })
  };

    
  const handleDelete = () => {
    fetch(`/api/delete_user/${username}`, {
      method: 'DELETE',
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
  }
  
  const showAlert = () => {
    alert('Your information will be deleted next time you login. \n not now, I don not know how to do that, YET!')
  }
  
  
  
  const handleSave = () => {
    setIsSaving(true);
    const data = {
      amount,
      amount_frequency: frequency,
      expenses,
      rate: rateReturn,
      savings,
      username
    };
    
    fetch('/api/update_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      })
      .then((res) => res.json())
      .then(() => {
        setIsSaving(false);
    });
  };

  useEffect(() => {
    if ([expenses, amount].some(x => x <= 0)) {
      return;
    }
    // POST to backend instead of doing it here
    const targetAmount = expenses * 25;
    let years = 0;
    let currentAmount = savings;
    while (currentAmount < targetAmount) {
      if (frequency === 'monthly') {
        currentAmount += amount * 12;
      } else {
        currentAmount += amount;
      }
      const interest = currentAmount * (rateReturn)
      currentAmount += interest;
      console.log(currentAmount, targetAmount);
      years++;
    }
    setCalculatedYears(years);
  }, [expenses, savings, frequency, amount, rateReturn])

  // const Button = style.button`
  //   background-color: #4CAF50;
  // `
  
  return (
    <div>
      <h1>F.I.R.E Calculator</h1>
      {didLogin ?
        <div>
          <form>
            <section>
              <Expenses onChange={setExpenses} value={expenses} />
              <Savings onChange={setSavings} value={savings} />
              <FrequencyContributions onChange={setFrequency} value={frequency} />
              <AmountContribution onChange={setAmount} value={amount} />
              <RateReturn onChange={setRateReturn} value={rateReturn} />
            </section>
          </form>
          <div>
            <h2>Results</h2>
            <p>Target Amount to FIRE: {formatter.format(expenses * 25)}</p>
            <p>Years to FIRE: {calculatedYears}</p>
            <button disabled={isSaving} onClick={handleSave}>Save Data</button>
            <button onClick={handleDelete}>Delete Info</button>
          </div>
        </div>
      :
      <div>
        <Username onChange={setUsername} value={username} />
        <button disabled={!username} onClick={handleLogin}>Next</button>
      </div>
      } 
      </div>
  );
}

export default App
