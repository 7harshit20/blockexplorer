import React, { useEffect, useState } from "react";
import { getAddressInfo } from "../../../apis/bitcoin";
import { searchTransactions } from "../../../apis/bitcoin";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
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
import {Link} from 'react-router-dom';
import SearchBar from "./SearchBar";

function AddressDetailsBitcoin() {
  const [data, setData] = useState(null);
  const [offset,setOffset]=useState(0)
  const [rows, setRows] = useState([]);

  const { address } = useParams();

  function createData(hash) {
    return { hash};
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % data.transactions.length;
    
    setOffset(newOffset);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAddressInfo(address);
      console.log(res)
      setData(res);
      // console.log("res", res, "address", address);
      // console.log(res[address.toLocaleLowerCase()]);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      //console.log("data", data.calls.length);
      const perRow=data.transactions.slice(offset,Math.min(offset+5,data.transactions.length));
      console.log(perRow)
      setRows(
        perRow.map((txs) => {

          console.log(txs)
          
          return createData(
            txs
          );
        })
      );
      console.log("rows", rows);
    }
  }, [offset]);

  return (
    <div class='row'>
      <SearchBar/>
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
                        data.address.balance 
                      } BTC (${data.address.balance_usd} USD)`}</InputAdornment>
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
                        data.address.received 
                      } BTC (${
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
                        data.address.spent 
                      } BTC (${data.address.spent_usd} USD)`}</InputAdornment>
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

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                    <InputLabel htmlFor='filled-adornment-amount'>
                      Number Of Transactions
                    </InputLabel>
                    <FilledInput
                      disabled
                      id='filled-adornment-amount'
                      startAdornment={
                        <InputAdornment position='start'>
                          {data.address.transaction_count}
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
                    <TableCell align='center'>Transaction hash</TableCell>
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
                        <Link to={`/bitcoin/transaction/${row.hash}`}>{row.hash
                          ? row.hash
                          : null}
                          </Link>
                      </TableCell>
                     
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <ReactPaginate
             pageCount={10}
             pageRangeDisplayed={3}
             marginPagesDisplayed={2}
             onPageChange={handlePageClick}
             containerClassName={"pagination"}
             activeClassName={"active"}
      />
          </div>
        ) : "AAAAA"}
      </div>
    </div>
  );
};

export default AddressDetailsBitcoin;
