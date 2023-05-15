import React, { useState } from "react";

const Ethereum = () => {
  const [search, setSearch] = useState("");
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
              >
                <i class='fa fa-search'></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ethereum;
