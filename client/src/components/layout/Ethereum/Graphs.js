import React, { useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";

const Graphs = () => {
  const [address, setAddress] = useState("0x" + "0".repeat(40));
  const navigate = useNavigate();

  const onReceiverSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    const addressregex = new RegExp("^0x[a-fA-F0-9]{40}$");
    if (!addressregex.test(address))
      console.log("Please enter a valid ethereum address");
    else
      navigate(
        `/ethereum/graphs/receiver/${address}?q=recepient(${address})&s=value_usd(desc)`
      );
  };

  const onSenderSubmit = (e) => {
    e.preventDefault();
    console.log(address);
    const addressregex = new RegExp("^0x[a-fA-F0-9]{40}$");
    if (!addressregex.test(address))
      console.log("Please enter a valid ethereum address");
    else
      navigate(
        `/ethereum/graphs/sender/${address}?q=sender(${address})&s=value_usd(desc)`
      );
  };

  return (
    <div>
      <div class='row'>
        <div class='col-md-10 mx-auto mt-5'>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              id='outlined-required'
              label='Enter Starting address'
              onChange={(e) => setAddress(e.target.value)}
              placeholder={"0x" + "0".repeat(40)}
            />
            <Stack spacing={2} direction='row'>
              <Button onClick={onSenderSubmit} variant='contained'>
                Sender Transaction Graph
              </Button>
              <Button onClick={onReceiverSubmit} variant='contained'>
                Recivier Transaction Graph
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
