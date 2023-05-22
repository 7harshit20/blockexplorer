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

function AllTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();

  function createData(txhash, block, sender, recipient, value, time) {
    return { txhash, block, sender, recipient, value, time };
  }

  const itemsPerPage = 10;
  const pageCount = 1000;

  useEffect(() => {
    const fetchDataAndUpdateTable = async () => {
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const s = queryParams.get("s");
      console.log(q)
      console.log(s)
      const response = await axios.get(
        `https://api.blockchair.com/bitcoin/transactions?&offset=${
          currentPage * itemsPerPage
        }&limit=${itemsPerPage}${q ? `&q=${q}` : ""}${s ? `&s=${s}` : ""}`
      );
      const data = response.data.data;
      console.log(data);
      setTransactions(
        data.map((transaction) => {
          return createData(
            transaction.hash,
            transaction.block_id,
            transaction.input_count,
            transaction.output_count,
            transaction.output_total,
            transaction.time
          );
        })
      );
      console.log("transactions", transactions);
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
                  <TableCell align='left'>Sender</TableCell>
                  <TableCell align='left'>Recipient</TableCell>
                  <TableCell align='left'>Value&nbsp;(BTC)</TableCell>
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
                    <TableCell align='left'><Link to={`/bitcoin/block/${row.block}`}>{row.block}</Link></TableCell>
                   
                    <TableCell align='left'>
                      {row.sender}
                    </TableCell>
                    <TableCell align='left'>
                      {row.recipient}
                    </TableCell>
                    <TableCell align='left'>{row.value / 1e8}</TableCell>
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

export default AllTransactions;
