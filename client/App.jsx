import React, { useEffect, useState } from 'react';
import { Expenses } from './components/inputs/Expenses.jsx';
import { Savings } from './components/inputs/Savings.jsx';
import { FrequencyContributions } from './components/inputs/FrequencyContributions.jsx';
import { RateReturn } from './components/inputs/RateReturn.jsx';
import { AmountContribution } from './components/inputs/AmountContribution.jsx';

const App = () => {
  const [expenses, setExpenses] = useState(0);
  const [savings, setSavings] = useState(0);
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState(0);
  const [rateReturn, setRateReturn] = useState(7);
  const [calculatedYears, setCalculatedYears] = useState(0);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });

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
      const interest = currentAmount * (rateReturn * .01)
      currentAmount += interest;
      console.log(currentAmount, targetAmount);
      years++;
    }
    setCalculatedYears(years);
  }, [expenses, savings, frequency, amount, rateReturn])

  return (
    <><div>
      <h1>F.I.R.E Calculator</h1>
      <form>
        <section>
          <Expenses onChange={setExpenses} value={expenses} />
          <Savings onChange={setSavings} value={savings} />
          <FrequencyContributions onChange={setFrequency} value={frequency} />
          <AmountContribution onChange={setAmount} value={amount} />
          <RateReturn onChange={setRateReturn} value={rateReturn} />
        </section>
      </form>
    </div>
    <div>
      <h2>Results</h2>
      <p>Target Amount to FIRE: {formatter.format(expenses * 25)}</p>
      <p>Years to FIRE: {calculatedYears}</p>
    </div></>
  );
}

export default App
