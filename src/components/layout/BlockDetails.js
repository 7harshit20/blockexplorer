import React from "react";
import { useState,useEffect } from "react";
import { searchBlocks } from "../../apis/bitcoin";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField';
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
      <>{blockData!==""&&
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
          label="Hash"
          defaultValue={blockData.hash}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Miner"
          defaultValue={blockData.guessed_miner}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Mined On"
          defaultValue={blockData.time}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Transaction Count"
          defaultValue={blockData.transaction_count}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Input Total"
          defaultValue={blockData.input_total}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Output Total"
          defaultValue={blockData.output_total}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Input Count"
          defaultValue={blockData.input_count}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Output Count"
          defaultValue={blockData.output_count}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>

      <div>
        
        <TextField
          id="filled-read-only-input"
          label="Generation"
          defaultValue={blockData.generation}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />

        <TextField
          id="filled-read-only-input"
          label="Reward"
          defaultValue={blockData.reward}
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
       
       
      </div>
     
    </Box>
    </Grid>
      }
      </>
    )
}

export default BlockDetails;
