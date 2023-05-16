import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Ethereum = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search.length);
    const addressregex = new RegExp("^0x[a-fA-F0-9]{40}$");
    const blockheightregex = new RegExp("^[0-9]{1,7}$");
    const blockhashregex = new RegExp("^0x[a-fA-F0-9]{64}$");
    const transactionhashregex = new RegExp("^0x[a-fA-F0-9]{64}$");

    if (blockheightregex.test(search)) {
      navigate(`/ethereum/block/${search}`);
    }
    if (addressregex.test(search)) {
      navigate(`/ethereum/address/${search}`);
    }
  };
  return (
    <div>
      <div class='row'>
        <div class='col-md-5 mx-auto'>
          <div class='large mt-5 mb-2 fw-light'>
            The Ethereum Blockchain Explorer
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
      <Outlet />
    </div>
  );
};

export default Ethereum;
