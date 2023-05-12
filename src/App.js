import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ethereum from "./components/pages/Ethereum";
// import Search from "./components/layout/Search";

// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Ethereum />} />
        <Route path='/ethereum' element={<Ethereum />} />
        {/* <Route path='/bitcoin' element={<Ethereum />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
