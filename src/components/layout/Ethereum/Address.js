import React, { useEffect, useState } from "react";
import { getAddressInfo } from "../../../apis/ethereum";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Address = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);

  const { address } = useParams();

  function createData(hash, block, time, from, to, value) {
    return { hash, block, time, from, to, value };
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAddressInfo(address);
      setData(res[address.toLocaleLowerCase()]);
      // console.log("res", res, "address", address);
      // console.log(res[address.toLocaleLowerCase()]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      console.log("data", data.calls.length);
      setRows(
        data.calls.map((txs) => {
          return createData(
            txs.transaction_hash,
            txs.block_id,
            txs.time,
            txs.sender,
            txs.recipient,
            txs.value
          );
        })
      );
      console.log("rows", rows);
    }
  }, [data]);

  return (
    <div class='row'>
      <div class='col-md-10 mx-auto'>
        <div class='large mt-5 mb-2 fw-light'>Address Info</div>
        {data ? (
          <div class='row'>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Address
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {address}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Address type
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.address.type}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                {data.address.type === "contract" ? (
                  <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                    <InputLabel htmlFor='filled-adornment-amount'>
                      Contract Created
                    </InputLabel>
                    <FilledInput
                      disabled
                      id='filled-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>
                          {data.address.contract_created}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                ) : null}

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Balance
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        data.address.balance / 1e18
                      } eth (${data.address.balance_usd} USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Total Received (approx.)
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        data.address.received_approximate / 1e18
                      } eth (${
                        data.address.received_usd
                      } USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Total Spent (approx.)
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        data.address.spent_approximate / 1e18
                      } eth (${data.address.spent_usd} USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    First Balance Change
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.address.first_seen_receiving}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Last Spending
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.address.last_seen_spending}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </Box>

            <div class='large mt-5 mb-2 fw-light'>Transactions</div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Transaction hash</TableCell>
                    <TableCell align='left'>Block</TableCell>
                    <TableCell align='left'>Time</TableCell>
                    <TableCell align='left'>From</TableCell>
                    <TableCell align='left'>To</TableCell>
                    <TableCell align='left'>Value&nbsp;(eth)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.hash}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component='th' scope='row'>
                        {row.hash
                          ? row.hash.substring(0, 7) +
                            "..." +
                            row.hash.substring(row.hash.length - 7)
                          : null}
                      </TableCell>
                      <TableCell align='left'>{row.block}</TableCell>
                      <TableCell align='left'>{row.time}</TableCell>
                      <TableCell align='left'>
                        {row.from
                          ? row.from.substring(0, 7) +
                            "..." +
                            row.from.substring(row.from.length - 7)
                          : null}
                      </TableCell>
                      <TableCell align='left'>
                        {row.to
                          ? row.to.substring(0, 7) +
                            "..." +
                            row.to.substring(row.to.length - 7)
                          : null}
                      </TableCell>
                      <TableCell align='left'>{row.value / 1e18}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Address;
