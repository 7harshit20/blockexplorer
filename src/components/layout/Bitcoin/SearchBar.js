import { useNavigate } from "react-router-dom";
import {useState} from 'react';

function SearchBar()
{
   const navigate=useNavigate();
   const [search,setSearch]=useState("");
   
   const handleSubmit=(e)=>
   {
     e.preventDefault()
    const addressregex = new RegExp("^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$");
    const blockheightregex = new RegExp("^[0-9]{1,10}$");
    const blockhashregex = new RegExp("^0x[a-fA-F0-9]{64}$");
    const transactionhashregex = new RegExp("^[a-fA-F0-9]{64}$");
    if (transactionhashregex.test(search)) {
        // console.log("A")
        navigate(`/bitcoin/transaction/${search}`);
      }
    if (blockheightregex.test(search)) {
        navigate(`/bitcoin/block/${search}`);
    }
    if (addressregex.test(search)) {
        navigate(`/bitcoin/address/${search}`);
    }
   }


   return(
    <>
      <div class='row'>
     <div class='col-md-5 mx-auto'>
       <div class='large mt-5 mb-2 fw-light'>
         The Bitcoin Blockchain Explorer
       </div>
       <div class='input-group'>
         <input
           class='form-control border-end-0 border rounded-pill'
           type='search'
           placeholder='Search by transaction hash, block hash, address, or block height'
           id='example-search-input'
           onChange={(e) => setSearch(e.target.value)}
         />
         <span class='input-group-append'>
           <button
             class='btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5'
             type='button'
             onClick={handleSubmit}
           >
             <i class='fa fa-search'></i>
           </button>
         </span>
       </div>
     </div>
   </div>
    </>
   )
}


export default SearchBar;