import React from "react";
import { useState,useEffect } from "react";
import { searchTransactions } from "../../../apis/bitcoin";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SearchBar from "./SearchBar";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";


function TransactionDetailsBitcoin()
{
    const [transactionData,setTransactionData]=useState("");
   // const [rows, setRows] = useState([]);
    const pp=useLocation().pathname.split('/')[3]
    //console.log(pp)
    
    useEffect(()=>{
      async function getData()
      {
        
        const res=await searchTransactions(pp)
        console.log(res)
        setTransactionData(res)
      }
      getData()
    },[])

    console.log(transactionData)
    return(
      <>
      <SearchBar/>
      <br></br>
      {transactionData!==""&&<div>
      
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Block
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Link to={`/bitcoin/block/${transactionData.transaction.block_id}`}>{transactionData.transaction.block_id}</Link>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    TransactionHash
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        <Link to={`/bitcoin/flow/${pp}`}>{pp}</Link>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Amount Transacted
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        transactionData.transaction.output_total/1e8
                      } BTC (${transactionData.transaction.output_total} USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                   Transaction Fee
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        transactionData.transaction.fee/1e8
                      } BTC (${
                        transactionData.transaction.fee_usd
                      } USD)`}</InputAdornment>
                    }
                  />
                </FormControl>

                

               

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Recievers
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>{`${
                        transactionData.transaction.output_count
                      } `}</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl fullWidth sx={{ m: 1 }} variant='filled'>
                  <InputLabel htmlFor='filled-adornment-amount'>
                    Senders
                  </InputLabel>
                  <FilledInput
                    disabled
                    id='filled-adornment-amount'
                    startAdornment={
                      <InputAdornment position='start'>
                        {transactionData.transaction.input_count}
                      </InputAdornment>
                    }
                  />
                </FormControl>

                

                
              </div>
            </Box>

      <Grid container justify="center">
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
        <nav aria-label="main mailbox folders">
        <ListItem disablePadding>
            <ListItemButton>
               Senders
            </ListItemButton>
          </ListItem>
        {transactionData.inputs.map((input)=>(
          <ListItem disablePadding>
            <ListItemButton>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
               <Typography gutterBottom variant="h6" component="div">
                  <Link to={`/bitcoin/address/${input.recipient}`}>{input.recipient ?input.recipient.substring(0, 20) + "..." : null}</Link><br></br>
               </Typography>
              <Typography variant="body2" color="text.secondary">
                  {input.value/1e8}BTC<br></br>
                  {input.value_usd}USD
              </Typography>
              </CardContent>
            </Card>
              
               
            </ListItemButton>
          </ListItem>
          ))
            }
        </nav>
        </Box>
        
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginLeft: '10%' }}>
        <nav aria-label="main mailbox folders">
        <ListItem disablePadding>
            <ListItemButton>
               Recievers
            </ListItemButton>
          </ListItem>
          {transactionData.outputs.map((output)=>(
          <ListItem disablePadding>
            <ListItemButton>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
               <Typography gutterBottom variant="h6" component="div">
                  <Link to={`/bitcoin/address/${output.recipient}`}>{output.recipient ?output.recipient.substring(0, 20) + "..." : null}</Link><br></br>
               </Typography>
              <Typography variant="body2" color="text.secondary">
                  {output.value/1e8}BTC<br></br>
                  {output.value_usd}USD
              </Typography>
              </CardContent>
            </Card>
              
               
            </ListItemButton>
          </ListItem>
          ))
            }
        </nav>
        </Box>
     
   
    </Grid>
      </div>}
      </>
    )
}

export default TransactionDetailsBitcoin;
