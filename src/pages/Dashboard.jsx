import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken, getToken } from '../utils/auth';
import {
  getCurrentUser,
  getAccountsByUser,
  depositToAccount,
  withdrawFromAccount,
  getTransactionsByAccount,
  transferBetweenAccounts, 
} from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');
  const [actionError, setActionError] = useState('');
  const [amount, setAmount] = useState('');
  const [transferTo, setTransferTo] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload.user_id;

        const userData = await getCurrentUser(userId);
        const accountsData = await getAccountsByUser(userId);
        setUser(userData);
        setAccounts(accountsData.accounts);
      } catch (err) {
        setError('Failed to load user/account data');
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  const handleAccountSelect = async (account) => {
    setSelectedAccount(account);
    setAmount('');
    setTransferTo('');
    setActionError('');

    try {
      const txns = await getTransactionsByAccount(account.account_no);
      setTransactions(txns);
    } catch (err) {
      setTransactions([]);
      setActionError('Failed to load transactions');
    }
  };

  const handleDeselect = () => {
    setSelectedAccount(null);
    setAmount('');
    setTransferTo('');
    setTransactions([]);
    setActionError('');
  };

  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleTransferToChange = (e) => setTransferTo(e.target.value);

  const handleDeposit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setActionError('Please enter a valid deposit amount.');
      return;
    }

    try {
      const res = await depositToAccount(selectedAccount.account_no, Number(amount));
      const updatedAccounts = accounts.map((acc) =>
        acc.account_no === selectedAccount.account_no
          ? { ...acc, balance: res.balance }
          : acc
      );
      setAccounts(updatedAccounts);
      setSelectedAccount((prev) => ({ ...prev, balance: res.balance }));
      setAmount('');
      setActionError('');
      const txns = await getTransactionsByAccount(selectedAccount.account_no);
      setTransactions(txns);
    } catch (err) {
      setActionError('Deposit failed. Try again.');
    }
  };

  const handleWithdraw = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setActionError('Please enter a valid withdrawal amount.');
      return;
    }

    try {
      const res = await withdrawFromAccount(selectedAccount.account_no, Number(amount));
      const updatedAccounts = accounts.map((acc) =>
        acc.account_no === selectedAccount.account_no
          ? { ...acc, balance: res.balance }
          : acc
      );
      setAccounts(updatedAccounts);
      setSelectedAccount((prev) => ({ ...prev, balance: res.balance }));
      setAmount('');
      setActionError('');
      const txns = await getTransactionsByAccount(selectedAccount.account_no);
      setTransactions(txns);
    } catch (err) {
      setActionError('Withdrawal failed. Try again.');
    }
  };

  const handleTransfer = async () => {
    if (!transferTo || !amount || isNaN(amount) || Number(amount) <= 0) {
      setActionError('Please enter valid transfer account and amount.');
      return;
    }

    if (transferTo === selectedAccount.account_no) {
      setActionError('Cannot transfer to the same account.');
      return;
    }

    try {
      const res = await transferBetweenAccounts(
        selectedAccount.account_no,
        transferTo,
        Number(amount)
      );

      const updatedAccounts = accounts.map((acc) =>
        acc.account_no === selectedAccount.account_no
          ? { ...acc, balance: res.balance }
          : acc
      );

      setAccounts(updatedAccounts);
      setSelectedAccount((prev) => ({ ...prev, balance: res.balance }));
      setAmount('');
      setTransferTo('');
      setActionError('');

      const txns = await getTransactionsByAccount(selectedAccount.account_no);
      setTransactions(txns);
    } catch (err) {
      setActionError('Transfer failed. Check account number and balance.');
    }
  };

  return (
    <div>
      <h2>Welcome, {user?.first_name || 'User'}!</h2>
      <button onClick={logout}>Logout</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {selectedAccount ? (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Account: {selectedAccount.account_no}</h3>
          <p>Balance: ${selectedAccount.balance.toFixed(2)}</p>
          <p>Type: {selectedAccount.account_type}</p>

          <div style={{ marginTop: '15px' }}>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={handleAmountChange}
              style={{ marginRight: '10px' }}
            />
            <button onClick={handleDeposit}>Deposit</button>
            <button onClick={handleWithdraw} style={{ marginLeft: '10px' }}>
              Withdraw
            </button>
          </div>

          <div style={{ marginTop: '15px' }}>
            <input
              type="text"
              placeholder="To Account No"
              value={transferTo}
              onChange={handleTransferToChange}
              style={{ marginRight: '10px' }}
            />
            <button onClick={handleTransfer}>Transfer</button>
          </div>

          {actionError && <p style={{ color: 'red' }}>{actionError}</p>}

          <div style={{ marginTop: '25px' }}>
            <h4>Transaction History</h4>
            {transactions.length === 0 ? (
              <p>No transactions available.</p>
            ) : (
              <table border="1" cellPadding="6">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id}>
                      <td>{new Date(txn.transaction_date).toLocaleString()}</td>
                      <td>{txn.transaction_type}</td>
                      <td>${txn.amount.toFixed(2)}</td>
                      <td>{txn.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <br />
          <button onClick={handleDeselect} style={{ marginTop: '10px' }}>
            Deselect Account
          </button>
        </div>
      ) : (
        <div style={{ marginTop: '20px' }}>
          <h3>Your Bank Accounts</h3>
          {accounts.length === 0 ? (
            <p>No accounts found.</p>
          ) : (
            <ul>
              {accounts.map((acc) => (
                <li key={acc.account_no}>
                  <strong>{acc.account_no}</strong> - ${acc.balance.toFixed(2)} (
                  {acc.account_type})
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleAccountSelect(acc)}
                  >
                    Select
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
