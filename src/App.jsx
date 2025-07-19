// src/App.js

import React from 'react';
import CreateUser from './components/CreateUser';
import CreateAccount from './components/CreateAccount';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';

function App() {
  return (
    <div className="App">
      <h1>Bank Application</h1>
      <CreateUser />
      <CreateAccount />
      <Deposit />
      <Withdraw />
    </div>
  );
}

export default App;
