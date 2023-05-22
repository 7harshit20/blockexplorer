import React from "react";
import { useState,useEffect } from "react";
import { searchBlocks,getTransactionBlock } from "../../../apis/bitcoin";
import Box from '@mui/material/Box';
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function BlockDetailsBitcoin()
{
    const [blockData,setBlockData]=useState("");
    const [currentPage,setCurrentPage]=useState(0)
    const [transactions,setTransactions]=useState([])
    const blockHeight=useLocation().pathname.split('/')[3]
    const itemsPerPage = 10;
    const pageCount = 1000;
    //console.log(blockHeight)

    function createData(txhash, sender, recipient, value, time) {
      return { txhash, sender, recipient, value, time };
    }

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };
    
    useEffect(()=>{
      async function getData()
      {
        const res=await searchBlocks(blockHeight)
        setBlockData(res)
      }
      getData()
    },[])

    useEffect(()=>{
      const fetchTransaction=async()=>{
         const res=await getTransactionBlock(blockHeight,currentPage,itemsPerPage);
         console.log(res)
         setTransactions(res.map((transaction)=>{
            return createData(
              transaction.hash,
              transaction.input_count,
              transaction.output_count,
              transaction.output_total_usd,
              transaction.time
            )
         }))
      }
      fetchTransaction()
    },[currentPage])

    console.log(blockData)
    console.log(transactions)
    return(
      <div class='row'>
        <SearchBar/>
      <div class='col-md-10 mx-auto'>
        <div class='large mt-5 mb-2 fw-light'>Block Info</div>
        {blockData ? (
          <div class='row'>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Block height
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {blockHeight}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Hash
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {blockData.hash}
                      </InputAdornment>
                    }
                  />
                </FormControl>

              

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Input total
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        blockData.input_total/1e8
                      } BTC (${blockData.input_total_usd} USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Output Total
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        blockData.output_total/1e8
                      } BTC (${
                        blockData.input_total_usd
                      } USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Reward
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        blockData.reward/1e8 
                      } BTC (${
                        blockData.reward_usd
                      } USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Generation
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        blockData.generation/1e8
                      } BTC (${
                        blockData.generation_usd
                      } USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Transaction Count
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        blockData.transaction_count 
                      } `}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Miner
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {blockData.guessed_miner}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Time
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        new Date(blockData.time)
                      } `}</InputAdornment>
                    }
                  />
                </FormControl>

                
              </div>
            </Box>

            
            <div class='row'>
        <div class='col-md-10 mx-auto'>
          <div class='large mt-5 mb-2 fw-light'>Transaction Contained in this block</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Tx Hash</TableCell>
                  <TableCell align='left'>Sender</TableCell>
                  <TableCell align='left'>Recipient</TableCell>
                  <TableCell align='left'>Value</TableCell>
                  <TableCell align='left'>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((row) => (
                  <TableRow
                    key={row.txhash}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <Link to={`/bitcoin/transaction/${row.txhash}`}>
                        {row && row.txhash
                          ? `${row.txhash.substring(
                              0,
                              7
                            )}...${row.txhash.substring(row.txhash.length - 7)}`
                          : null}
                      </Link>
                    </TableCell>
                  
                    <TableCell align='left'>
                      {row.sender}
                    </TableCell>
                    <TableCell align='left'>
                      {row.recipient}
                    </TableCell>
                    <TableCell align='left'>{row.value } USD</TableCell>
                    <TableCell align='left'>{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

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
        ) : "AAAAA"}
      </div>
    </div>
      
    )
}

export default BlockDetailsBitcoin;
