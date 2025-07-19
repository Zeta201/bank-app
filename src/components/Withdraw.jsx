// src/components/Withdraw.js

import React, { useState } from 'react';
import { withdrawFromAccount } from '../services/api';

function Withdraw() {
  const [accountNo, setAccountNo] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await withdrawFromAccount(accountNo, parseFloat(amount));
      console.log('Withdraw successful:', response.data);
    } catch (err) {
      console.error('Error withdrawing:', err);
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Account No" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Withdraw</button>
      </form>
    </div>
  );
}

export default Withdraw;
