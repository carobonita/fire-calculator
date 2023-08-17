import React, { useEffect, useState } from 'react';
import { Expenses } from './components/inputs/Expenses.jsx';
import { Username } from './components/inputs/Username.jsx';
import { Savings } from './components/inputs/Savings.jsx';
import { FrequencyContributions } from './components/inputs/FrequencyContributions.jsx';
import { RateReturn } from './components/inputs/RateReturn.jsx';
import { AmountContribution } from './components/inputs/AmountContribution.jsx';
import styled from 'styled-components'

const theme = {
  teal: {
    default:  '#4db6ac',
    hover: '#80cbc4',
  },
  red: {
    default: '#f44336',
    hover: '#ef5350',
  },
  grey: {
    default: '#9e9e9e',
    hover: '#bdbdbd',
  }
};

const Container = styled.div`
  background-color: #ACCEEC;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const Button = styled.button`
  background-color: ${props => theme[props.theme].default};
  color: #1a237e;
  padding: 1px 15px;
  boder-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  &:hover {
    background-color: ${props => theme[props.theme].hover};
`;

const Headline = styled.h1`
  margin: 0 auto;
  padding-bottom: 20px;
`;

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
      alert('Your information has been deleted and you will be redirected to the login page.')
      setUsername('');
      setDidLogin(false);
    })
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

  return (
    <Container>
      <Headline>F.I.R.E Calculator</Headline>
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
            <Button disabled={isSaving} onClick={handleSave} theme="teal">Save Data</Button>
            <Button onClick={handleDelete} theme="red">Delete My Account</Button>
          </div>
        </div>
      :
      <div>
        <Username onChange={setUsername} value={username} />
        <Button disabled={!username} onClick={handleLogin} theme="grey">Next</Button>
      </div>
      } 
    </Container>
    
  );
}

export default App
