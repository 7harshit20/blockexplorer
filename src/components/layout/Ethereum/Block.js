import React, { useEffect, useState } from "react";
import { getBlockInfo } from "../../../apis/ethereum";
import { Link, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const Block = () => {
  const { blockId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async (id) => {
      const res = await getBlockInfo(id);
      setData(res[id]);
      //   console.log("res", res[id], "id", id);
    };
    fetchData(blockId);
  }, []);

  return (
    <div class='row'>
      <div class='col-md-10 mx-auto'>
        {data ? (
          <div class='row'>
            <div class='large mt-5 mb-2 fw-light'>Block Info</div>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Block Hash
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.block.hash}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Minded At
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.block.time}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Mined By
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {data.block.miner}
                      </InputAdornment>
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
                      <InputAdornment position='start'>
                        <Link
                          to={`/ethereum/transaction?q=block_id(${blockId})`}
                        >
                          {`${data.block.transaction_count} transactions`}
                        </Link>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Block Reward
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {`${data.block.reward / 1e18} ETH (${
                          data.block.reward_usd
                        } USD)`}
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

export default Block;
