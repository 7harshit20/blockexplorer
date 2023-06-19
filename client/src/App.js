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
import AllBlocks from "./components/layout/Bitcoin/AllBlocks";
import AllTransactions from "./components/layout/Bitcoin/AllTransactions";
import { VisualizationBitcoin } from "./components/layout/Bitcoin/VisualizationBitcoin";
import Graphs from "./components/layout/Ethereum/Graphs";
import VisualizationBitcoinDay from "./components/layout/Bitcoin/VisualizationBitcoinDay";
import ReceiverGraph from "./components/layout/Ethereum/ReceiverGraph";
import SenderGraph from "./components/layout/Ethereum/SenderGraph";
import BitcoinFlow from "./components/layout/Bitcoin/BitcoinFLow";
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
          <Route path='graphs'>
            <Route path='' element={<Graphs />} />
            <Route path='receiver/:address' element={<ReceiverGraph />} />
            <Route path='sender/:address' element={<SenderGraph />} />
          </Route>
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
        <Route path='/bitcoin/blocks' element={<AllBlocks />} />
        <Route path='/bitcoin/transactions' element={<AllTransactions />} />
        <Route
          path='/bitcoin/visualization'
          element={<VisualizationBitcoin />}
        />
        <Route
          path='/bitcoin/visualization/:day'
          element={<VisualizationBitcoinDay />}
        />

        <Route
          path='/bitcoin/flow/:transaction'
          element={<BitcoinFlow/>}
        />
        {/* <Route path='/bitcoin' element={<Ethereum />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
