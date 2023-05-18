import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Ethereum from "./components/pages/Ethereum";
import Dashboard from "./components/layout/Ethereum/Dashboard";
import Address from "./components/layout/Ethereum/Address";
import Transaction from "./components/layout/Ethereum/Transaction";

import Bitcoin from "./components/pages/Bitcoin";
import BlockDetailsBitcoin from "./components/layout/Bitcoin/BlockDetailsBitcoin";
import TransactionDetailsBitcoin from "./components/layout/Bitcoin/TransactionDetailsBitcoin";
import AddressDetailsBitcoin from "./components/layout/Bitcoin/AddressDetailsBitcoin";
import Block from "./components/layout/Ethereum/Block";
import Transactions from "./components/layout/Ethereum/Transactions";
import Blocks from "./components/layout/Ethereum/Blocks";
// import Search from "./components/layout/Search";

// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='ethereum' element={<Ethereum />}>
          <Route path='' element={<Dashboard />} />
          <Route path='transaction'>
            <Route path='' element={<Transactions />} />
            <Route path=':txhash' element={<Transaction />} />
          </Route>
          <Route path='block'>
            <Route path='' element={<Blocks />} />
            <Route path=':blockId' element={<Block />} />
          </Route>
          <Route path='address/:address' element={<Address />} />
        </Route>
        <Route path='/bitcoin' element={<Bitcoin />} />
        <Route
          path='/bitcoin/block/:blockId'
          element={<BlockDetailsBitcoin />}
        />
        <Route
          path='/bitcoin/transaction/:transactionId'
          element={<TransactionDetailsBitcoin />}
        />
        <Route
          path='/bitcoin/address/:address'
          element={<AddressDetailsBitcoin />}
        />
        {/* <Route path='/bitcoin' element={<Ethereum />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
