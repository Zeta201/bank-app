// src/components/Deposit.js

import React, { useState } from 'react';
import { depositToAccount } from '../services/api';

function Deposit() {
  const [accountNo, setAccountNo] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await depositToAccount(accountNo, parseFloat(amount));
      console.log('Deposit successful:', response.data);
    } catch (err) {
      console.error('Error depositing:', err);
    }
  };

  return (
    <div>
      <h2>Deposit</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Account No" value={accountNo} onChange={(e) => setAccountNo(e.target.value)} required />
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default Deposit;
