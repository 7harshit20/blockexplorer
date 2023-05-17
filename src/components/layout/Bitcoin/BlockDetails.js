import React from "react";
import { useState,useEffect } from "react";
import { searchBlocks } from "../../../apis/bitcoin";
import Box from '@mui/material/Box';
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

import { useLocation } from "react-router-dom";

function BlockDetails()
{
    const [blockData,setBlockData]=useState("");
   // const [rows, setRows] = useState([]);
    const pp=useLocation().pathname.split('/')[3]
    //console.log(pp)
    
    useEffect(()=>{
      async function getData()
      {
        
        const res=await searchBlocks(pp)
        //console.log(res)
        setBlockData(res)
      }
      getData()
    },[])

    console.log(blockData)
    return(
      <div class='row'>
      <div class='col-md-10 mx-auto'>
        <div class='large mt-5 mb-2 fw-light'>Address Info</div>
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
                        {pp}
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

            <div class='large mt-5 mb-2 fw-light'>Transactions</div>
          
          </div>
        ) : "AAAAA"}
      </div>
    </div>
      
    )
}

export default BlockDetails;
