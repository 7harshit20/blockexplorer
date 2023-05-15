import React from "react";
import axios from "axios";

export const searchTransactions = async (th) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/transaction/${th}`
    );
    console.log(response.data.result);
    return response.data.result;
  };

  export const searchBlocks = async (bl) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/block/${bl}`
    );
    console.log(response.data.result);
    return response.data.result;
  };

  export const searchAddress = async (ad) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/address/${ad}`
    );
    console.log(response.data.result);
    return response.data.result;
  }