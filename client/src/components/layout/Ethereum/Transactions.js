import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../styles/transactions.css";
import { Link, useLocation } from "react-router-dom";
// import { getTransactions } from "../../../apis/ethereum";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();

  function createData(txhash, block, failed, sender, recipient, value, time) {
    return { txhash, block, failed, sender, recipient, value, time };
  }

  const itemsPerPage = 10;
  const pageCount = 1000;

  useEffect(() => {
    const fetchDataAndUpdateTable = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const q = queryParams.get("q");
        const s = queryParams.get("s");
        const response = await axios.get(
          `https://api.blockchair.com/ethereum/transactions?key=${
            process.env.REACT_APP_BLOCKCHAIR_API_KEY
          }&offset=${currentPage * itemsPerPage}&limit=${itemsPerPage}${
            q ? `&q=${q}` : ""
          }${s ? `&s=${s}` : ""}`
        );
        const data = response.data.data;
        console.log(data);
        setTransactions(
          data.map((transaction) => {
            return createData(
              transaction.hash,
              transaction.block_id,
              transaction.failed,
              transaction.sender,
              transaction.recipient,
              transaction.value,
              transaction.time
            );
          })
        );
        console.log("transactions", transactions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAndUpdateTable();
  }, [currentPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div>
      <div class='row'>
        <div class='col-md-10 mx-auto'>
          <div class='large mt-5 mb-2 fw-light'>Transaction List</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Tx Hash</TableCell>
                  <TableCell align='left'>Block</TableCell>
                  <TableCell align='left'>failed</TableCell>
                  <TableCell align='left'>Sender</TableCell>
                  <TableCell align='left'>Recipient</TableCell>
                  <TableCell align='left'>Value&nbsp;(eth)</TableCell>
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
                      <Link to={`/ethereum/transaction/${row.txhash}`}>
                        {row && row.txhash
                          ? `${row.txhash.substring(
                              0,
                              7
                            )}...${row.txhash.substring(row.txhash.length - 7)}`
                          : null}
                      </Link>
                    </TableCell>
                    <TableCell align='left'>{row.block}</TableCell>
                    <TableCell align='left'>
                      {row.failed ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align='left'>
                      {row && row.sender
                        ? `${row.sender.substring(
                            0,
                            7
                          )}...${row.sender.substring(row.sender.length - 7)}`
                        : "-"}
                    </TableCell>
                    <TableCell align='left'>
                      {row && row.recipient
                        ? `${row.recipient.substring(
                            0,
                            7
                          )}...${row.recipient.substring(
                            row.recipient.length - 7
                          )}`
                        : null}
                    </TableCell>
                    <TableCell align='left'>{row.value / 1e18}</TableCell>
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
  );
};

export default Transactions;
