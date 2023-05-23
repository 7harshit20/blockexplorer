import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "../../../styles/transactions.css";
import { Link, useLocation } from "react-router-dom";

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
import { red } from "@mui/material/colors";

const Address = () => {
  const [data, setData] = useState(null);
  const [rows, setRows] = useState([]);
  const [err, setErr] = useState("");
  const [suspect, setSuspect] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  // const location = useLocation();

  const { address } = useParams();
  const itemsPerPage = 10;
  const pageCount = 10000;

  function createData(hash, block, time, from, to, value) {
    return { hash, block, time, from, to, value };
  }

  useEffect(() => {
    const fetchData = async (address) => {
      try {
        // const queryParams = new URLSearchParams(location.search);
        // const q = queryParams.get("q");
        // const s = queryParams.get("s");
        const response = await axios.get(
          `https://api.blockchair.com/ethereum/dashboards/address/${address}?erc_20=true&key=${
            process.env.REACT_APP_BLOCKCHAIR_API_KEY
          }&offset=${currentPage * itemsPerPage}&limit=${itemsPerPage}`
        );
        const res = response.data.data;
        setData(res[address.toLocaleLowerCase()]);
        console.log("res", res, "offset", currentPage * itemsPerPage);
        console.log(res[address.toLocaleLowerCase()]);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };

    const checkAddress = async (address) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/ethereum/check/${address}`
        );
        if (response.data.length != 0) setSuspect(response.data[0]);
        console.log("check", response.data[0]);
      } catch (error) {
        console.log(error);
        setErr(error.message);
      }
    };
    fetchData(address);
    checkAddress(address);
  }, [currentPage]);

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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div class='row'>
      <div class='col-md-10 mx-auto'>
        {data ? (
          <div class='row'>
            <div class='large mt-5 mb-2 fw-light'>Address Info</div>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                {suspect ? (
                  <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                    <InputLabel
                      htmlFor='filled-adornment-amount'
                      style={{ color: "red" }}
                    >
                      Malicious
                    </InputLabel>
                    <FilledInput
                      disabled
                      id='filled-adornment-amount'
                      startAdornment={
                        <InputAdornment
                          position='start'
                          style={{ color: "red" }}
                        >
                          This address is identitified to be associated with{" "}
                          {suspect.category} from the source {suspect.source}
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                ) : null}

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
              {/* <Button variant='contained'>View transactions</Button> */}
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
            <div className='pagination-container'>
              <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        ) : (
          <div class='large mt-5 mb-2 fw-light'>{err}</div>
        )}
      </div>
    </div>
  );
};

export default Address;
