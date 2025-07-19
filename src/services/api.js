// src/services/api.js

import axios from 'axios';

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

// Users
export const createUser = (userData) => axios.post(`${apiUrl}/users`, userData);
export const getUserById = (userId) => axios.get(`${apiUrl}/users/${userId}`);

// Accounts
export const createAccount = (accountData) => axios.post(`${apiUrl}/accounts`, accountData);
export const deleteAccount = (accountNo) => axios.delete(`${apiUrl}/accounts/${accountNo}`);
export const depositToAccount = (accountNo, amount) => axios.post(`${apiUrl}/accounts/${accountNo}/deposit`, { amount });
export const withdrawFromAccount = (accountNo, amount) => axios.post(`${apiUrl}/accounts/${accountNo}/withdraw`, { amount });
export const transferFunds = (fromAccount, toAccount, amount) => axios.post(`${apiUrl}/accounts/transfer/${fromAccount}/${toAccount}`, { amount });

// Transactions
export const getAllTransactions = () => axios.get(`${apiUrl}/transactions`);
export const getTransactionById = (transactionId) => axios.get(`${apiUrl}/transactions/${transactionId}`);
export const getTransactionsByUserId = (userId) => axios.get(`${apiUrl}/users/${userId}/transactions`);
export const getTransactionsByAccountNo = (accountNo) => axios.get(`${apiUrl}/accounts/${accountNo}/transactions`);
