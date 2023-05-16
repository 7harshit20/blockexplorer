import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ethereum from "./components/pages/Ethereum";
import Bitcoin from "./components/pages/Bitcoin";
import Home from "./components/pages/Home";
import Dashboard from "./components/layout/Dashboard";
import Address from "./components/layout/Address";
// import Search from "./components/layout/Search";

// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='ethereum' element={<Ethereum />}>
          <Route path='/ethereum' element={<Dashboard />} />
          <Route path='address/:address' element={<Address />} />
        </Route>
        <Route path='/bitcoin' element={<Bitcoin />} />
        {/* <Route path='/bitcoin' element={<Ethereum />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
