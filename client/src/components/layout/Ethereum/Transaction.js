import React, { useEffect, useState } from "react";
import { searchTransactions } from "../../../apis/ethereum";
import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const Transaction = () => {
  const { txhash } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (tx) => {
      const res = await searchTransactions(tx);
      setData(res[tx.toLocaleLowerCase()]);
      console.log("res", res, "traxac", tx);
      console.log(res[tx.toLocaleLowerCase()]);
    };
    fetchData(txhash);
  }, []);

  return (
    <div class='row'>
      <div class='col-md-10 mx-auto'>
        {data ? (
          <div class='row'>
            <div class='large mt-5 mb-2 fw-light'>Transaction Info</div>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Transaction Hash
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{txhash}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Block
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.block_id}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Status
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.failed ? "Failed" : "Success"}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Timestamp
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.time}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    From
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.sender}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>To</InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.recipient}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Value
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.value / 1e18 +
                          " ETH" +
                          " (" +
                          data.transaction.value_usd +
                          " USD)"}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Fees
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.transaction.fee / 1e18 +
                          " ETH" +
                          " (" +
                          data.transaction.fee_usd +
                          " USD)"}
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
            </Box>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Transaction;
