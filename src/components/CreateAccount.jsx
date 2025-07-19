// src/components/CreateAccount.js

import React, { useState } from 'react';
import { createAccount } from '../services/api';

function CreateAccount() {
  const [userId, setUserId] = useState('');
  const [accountType, setAccountType] = useState('');
  const [balance, setBalance] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use "initial_balance" to match the payload that works in Postman
    const accountData = {
      user_id: parseInt(userId), // Ensure this is an integer
      account_type: accountType,  // Ensure this is a valid string (checking/savings)
      initial_balance: parseFloat(balance) // Ensure this is a float/number
    };


    try {
      const response = await createAccount(accountData);
      console.log('Account created:', response.data);
    } catch (err) {
      console.error('Error creating account:', err.response ? err.response.data : err);
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="number" 
          placeholder="User ID" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required 
        />
        <select 
          value={accountType} 
          onChange={(e) => setAccountType(e.target.value)} 
          required
        >
          <option value="">Select Account Type</option>
          <option value="savings">Savings</option>
          <option value="checking">Checking</option>
        </select>
        <input 
          type="number" 
          placeholder="Balance" 
          value={balance} 
          onChange={(e) => setBalance(e.target.value)} 
          required 
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
