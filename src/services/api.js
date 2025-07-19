// src/services/api.js

import axios from 'axios';
import config from '../config'; // Import config

const API_BASE_URL = config.apiBaseUrl; // Get base URL from config
// Users
export const createUser = (userData) => axios.post(`${API_BASE_URL}/users`, userData);
export const getUserById = (userId) => axios.get(`${API_BASE_URL}/users/${userId}`);

// Accounts
export const createAccount = (accountData) => axios.post(`${API_BASE_URL}/accounts`, accountData);
export const deleteAccount = (accountNo) => axios.delete(`${API_BASE_URL}/accounts/${accountNo}`);
export const depositToAccount = (accountNo, amount) => axios.post(`${API_BASE_URL}/accounts/${accountNo}/deposit`, { amount });
export const withdrawFromAccount = (accountNo, amount) => axios.post(`${API_BASE_URL}/accounts/${accountNo}/withdraw`, { amount });
export const transferFunds = (fromAccount, toAccount, amount) => axios.post(`${API_BASE_URL}/accounts/transfer/${fromAccount}/${toAccount}`, { amount });

// Transactions
export const getAllTransactions = () => axios.get(`${API_BASE_URL}/transactions`);
export const getTransactionById = (transactionId) => axios.get(`${API_BASE_URL}/transactions/${transactionId}`);
export const getTransactionsByUserId = (userId) => axios.get(`${API_BASE_URL}/users/${userId}/transactions`);
export const getTransactionsByAccountNo = (accountNo) => axios.get(`${API_BASE_URL}/accounts/${accountNo}/transactions`);
