import React from "react";
import { useState,useEffect } from "react";
import { searchTransactions } from "../../apis/bitcoin";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
import { useLocation } from "react-router-dom";

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
      <>{transactionData!==""&&
      <Grid container justify="center">
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

      <div>
      <TextField
          id="filled-read-only-input"
          label="Sender"
          defaultValue={transactionData.inputs[0].recipient}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        {transactionData.outputs.map((output)=>(
           <div>
            {
            output.recipient!==transactionData.inputs[0].recipient&&
          <TextField
          id="filled-read-only-input"
          label="Receiver"
          defaultValue={output.recipient}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        
        />
         }
        </div>
        ))}
      </div>
     
    </Box>
    </Grid>
      }
      </>
    )
}

export default TransactionDetails;
