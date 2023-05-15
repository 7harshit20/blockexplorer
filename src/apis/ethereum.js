import React from "react";
import axios from "axios";

const ethereum = () => {
  const searchTransactions = async (th) => {
    const response = await axios.get(
      `https://api.blockchair.com/ethereum/dashboards/transaction/${th}`
    );
    console.log(response.data.result);
    return response.data.result;
  };

  const searchBlocks = async (bl) => {
    const response = await axios.get(
      `https://api.blockchair.com/ethereum/dashboards/block/${bl}`
    );
    console.log(response.data.result);
    return response.data.result;
  };

  const searchAddress = async (ad) => {
    const response = await axios.get(
      `https://api.blockchair.com/ethereum/dashboards/address/${ad}`
    );
    console.log(response.data.result);
    return response.data.result;
  };

  const searchBlockHeight = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/ethereum/stats`
    );
    console.log(response.data.data.blocks);
    return response.data.data.blocks;
  };

  const getlasttenblocks = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/ethereum/blocks?limit=10`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  return <div>ethereum</div>;
};

export default ethereum;
