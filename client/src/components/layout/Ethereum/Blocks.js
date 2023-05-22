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

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const location = useLocation();

  function createData(hash, id, miner, reward, time, txs) {
    return { hash, id, miner, reward, time, txs };
  }

  const itemsPerPage = 10;
  const pageCount = 1000;

  useEffect(() => {
    const fetchDataAndUpdateTable = async () => {
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get("q");
      const s = queryParams.get("s");
      const response = await axios.get(
        `https://api.blockchair.com/ethereum/blocks?&offset=${
          currentPage * itemsPerPage
        }&limit=${itemsPerPage}${q ? `&q=${q}` : ""}${s ? `&s=${s}` : ""}`
      );
      const data = response.data.data;
      console.log(data);
      setBlocks(
        data.map((block) => {
          return createData(
            block.hash,
            block.id,
            block.miner,
            block.reward,
            block.time,
            block.transaction_count
          );
        })
      );
      console.log("blocks", blocks);
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
          <div class='large mt-5 mb-2 fw-light'>Block List</div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Block Hash</TableCell>
                  <TableCell align='left'>Block Height</TableCell>
                  <TableCell align='left'>Miner</TableCell>
                  <TableCell align='left'>reward&nbsp;(eth)</TableCell>
                  <TableCell align='left'>Time</TableCell>
                  <TableCell align='left'>Transactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blocks.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align='left'>
                      <Link to={`/ethereum/block/${row.id}`}>{row.id}</Link>
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {row && row.hash
                        ? `${row.hash.substring(0, 7)}...${row.hash.substring(
                            row.hash.length - 7
                          )}`
                        : null}
                    </TableCell>
                    <TableCell align='left'>
                      {row && row.miner
                        ? `${row.miner.substring(0, 7)}...${row.miner.substring(
                            row.miner.length - 7
                          )}`
                        : "-"}
                    </TableCell>
                    <TableCell align='left'>{row.reward / 1e18}</TableCell>
                    <TableCell align='left'>{row.time}</TableCell>
                    <TableCell align='left'>
                      <Link to={`/ethereum/transaction?q=block_id(${row.id})`}>
                        {row.txs}
                      </Link>
                    </TableCell>
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

export default Blocks;
