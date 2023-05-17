import React from "react";
import { useState,useEffect } from "react";
import { searchTransactions } from "../../../apis/bitcoin";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";
import {Link} from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function TransactionDetails()
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
      <>{transactionData!==""&&<div>
      
       <Box
      component="form"
      sx={{
        
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      
      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Block"
          defaultValue={transactionData.transaction.block_id}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Time"
          defaultValue={transactionData.transaction.time}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Senders"
          defaultValue={transactionData.transaction.input_count}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Receiver"
          defaultValue={transactionData.transaction.output_count}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Amount Transacted"
          defaultValue={transactionData.transaction.output_total_usd}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
         
        <TextField
          id="filled-read-only-input"
          label="Transcation Fee"
          defaultValue={transactionData.transaction.input_total_usd-transactionData.transaction.output_total_usd}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
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

export default TransactionDetails;
