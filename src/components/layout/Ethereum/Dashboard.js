import React, { useState, useEffect } from "react";
import {
  getLastTenBlocks,
  searchBlockHeight,
  getLastTenTransactions,
} from "../../../apis/ethereum";
import { Link } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const [lastTenBlocks, setLastTenBlocks] = useState([]);
  const [lastTenTransactions, setLastTenTransactions] = useState([]);
  const [rows, setRows] = useState([]);
  const [txrows, setTxRows] = useState([]);

  function createData(block, miner, transactions, reward, time) {
    return { block, miner, transactions, reward, time };
  }
  function createTxData(txhash, sender, recipient, value, time) {
    return { txhash, sender, recipient, value, time };
  }

  useEffect(() => {
    async function fetchData() {
      const blockres = await getLastTenBlocks();
      setLastTenBlocks(blockres);
      // console.log(blockres);

      //   const sizeres = await searchBlockHeight();
      //   setBlockHeight(sizeres);

      const txres = await getLastTenTransactions();
      setLastTenTransactions(txres);
    }

    fetchData();
  }, []);

  useEffect(() => {
    setRows(
      lastTenBlocks.map((block) => {
        return createData(
          block.id,
          block.miner,
          block.transaction_count,
          block.reward,
          block.time
        );
      })
    );
  }, [lastTenBlocks]);

  useEffect(() => {
    setTxRows(
      lastTenTransactions.map((tx) => {
        return createTxData(
          tx.hash,
          tx.sender,
          tx.recipient,
          tx.value,
          tx.time
        );
      })
    );
    console.log("txrows", txrows);
  }, [lastTenTransactions]);

  return (
    <div>
      <div class='row'>
        <div class='col-md-10 mx-auto'>
          <div class='large mt-5 mb-2 fw-light'>Latest Blocks</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Blocks</TableCell>
                  <TableCell align='left'>miner</TableCell>
                  <TableCell align='left'>transactions</TableCell>
                  <TableCell align='left'>reward&nbsp;(eth)</TableCell>
                  <TableCell align='left'>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.block}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <Link to={`/ethereum/block/${row.block}`}>
                        {row.block}
                      </Link>
                    </TableCell>
                    <TableCell align='left'>{row.miner}</TableCell>
                    <TableCell align='left'>{row.transactions}</TableCell>
                    <TableCell align='left'>{row.reward / 1e18}</TableCell>
                    <TableCell align='left'>{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div class='row'>
        <div class='col-md-10 mx-auto'>
          <div class='large mt-5 mb-2 fw-light'>Latest Transactions</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Tx Hash</TableCell>
                  <TableCell align='left'>Sender</TableCell>
                  <TableCell align='left'>Recipient</TableCell>
                  <TableCell align='left'>Value&nbsp;(eth)</TableCell>
                  <TableCell align='left'>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {txrows.map((row) => (
                  <TableRow
                    key={row.block_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component='th' scope='row'>
                      <Link to={`/ethereum/transaction/${row.txhash}`}>
                        {row.txhash
                          ? row.txhash.substring(0, 7) +
                            "..." +
                            row.txhash.substring(row.txhash.length - 7)
                          : null}
                      </Link>
                    </TableCell>
                    <TableCell align='left'>{row.sender}</TableCell>
                    <TableCell align='left'>{row.recipient}</TableCell>
                    <TableCell align='left'>{row.value / 1e18}</TableCell>
                    <TableCell align='left'>{row.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
