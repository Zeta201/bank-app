// src/services/api.js

import axios from 'axios';
import { getToken } from '../utils/auth';

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
// const apiUrl = "http://localhost:8080"
// // Users
// export const createUser = (userData) => axios.post(`${apiUrl}/users`, userData);
// export const getUserById = (userId) => axios.get(`${apiUrl}/users/${userId}`);

// // Accounts
// export const createAccount = (accountData) => axios.post(`${apiUrl}/accounts`, accountData);
// export const deleteAccount = (accountNo) => axios.delete(`${apiUrl}/accounts/${accountNo}`);
// export const depositToAccount = (accountNo, amount) => axios.post(`${apiUrl}/accounts/${accountNo}/deposit`, { amount });
// export const withdrawFromAccount = (accountNo, amount) => axios.post(`${apiUrl}/accounts/${accountNo}/withdraw`, { amount });
// export const transferFunds = (fromAccount, toAccount, amount) => axios.post(`${apiUrl}/accounts/transfer/${fromAccount}/${toAccount}`, { amount });

// // Transactions
// export const getAllTransactions = () => axios.get(`${apiUrl}/transactions`);
// export const getTransactionById = (transactionId) => axios.get(`${apiUrl}/transactions/${transactionId}`);
// export const getTransactionsByUserId = (userId) => axios.get(`${apiUrl}/users/${userId}/transactions`);
// export const getTransactionsByAccountNo = (accountNo) => axios.get(`${apiUrl}/accounts/${accountNo}/transactions`);


export const signup = async (userData) => {
  const res = await axios.post(`${apiUrl}/signup`, userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post(`${apiUrl}/login`, credentials);
  return res.data;
};


const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getCurrentUser = async (userId) => {
  const res = await axios.get(`${apiUrl}/users/${userId}`, authHeaders());
  return res.data;
};


export const getAccountsByUser = async (userId) => {
  const res = await axios.get(`${apiUrl}/accounts`, authHeaders());
  console.log(res.data)
  return res.data;
};


export const depositToAccount = async (accountNo, amount) => {
  const response = await axios.post(
    `${apiUrl}/accounts/${accountNo}/deposit`,
    { amount }, // body payload
    authHeaders() // config (headers, etc.)
  );
  return response.data;
};

export const withdrawFromAccount = async (accountNo, amount) => {
  const response = await axios.post(`${apiUrl}/accounts/${accountNo}/withdraw`, {amount}, authHeaders());
  return response.data;

};


export const getTransactionsByAccount = async (accountNo) => {
  const response = await axios.get(
    `${apiUrl}/accounts/${accountNo}/transactions`,
    authHeaders()
  );
  return response.data;
};

// services/api.js

export const transferBetweenAccounts = async (fromAccountNo, toAccountNo, amount) => {
  const response = await axios.post(
    `${apiUrl}/accounts/transfer/${fromAccountNo}/${toAccountNo}`,
    { amount },
    authHeaders()
  );
  return response.data;
};

export const createAccount = async (accountType, initialBalance) => {
  const response = await axios.post(`${apiUrl}/accounts`, {
    "account_type" : accountType,
    "initial_balance" : initialBalance
  }, authHeaders());
  return response.data

};
