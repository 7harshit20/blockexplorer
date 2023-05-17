import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ethereum from "./components/pages/Ethereum";
import Bitcoin from "./components/pages/Bitcoin";
import Home from "./components/pages/Home";
import Dashboard from "./components/layout/Ethereum/Dashboard";
import Address from "./components/layout/Ethereum/Address";
import BlockDetails from "./components/layout/Bitcoin/BlockDetails";
import TransactionDetails from "./components/layout/Bitcoin/TransactionDetails";
import AddressDetails from "./components/layout/Bitcoin/AddressDetails";
// import Search from "./components/layout/Search";

// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ethereum' element={<Ethereum />}>
          <Route path='/ethereum' element={<Dashboard />} />
          <Route path='address/:address' element={<Address />} />
        </Route>
        <Route path='/bitcoin' element={<Bitcoin />} />
        <Route path='/bitcoin/block/:blockId' element={<BlockDetails />} />
        <Route path='/bitcoin/transaction/:transactionId' element={<TransactionDetails />}  />
        <Route path='/bitcoin/address/:address' element={<AddressDetails />}  />
        {/* <Route path='/bitcoin' element={<Ethereum />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
