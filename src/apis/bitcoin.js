import React from "react";
import axios from "axios";

export const searchTransactions = async (th) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/transaction/${th}`
    );
    console.log(response.data.data[`${th}`]);
    return response.data.data[`${th}`];
  };

  export const searchBlocks = async (bl) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/block/${bl}?key=A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5`
    );
    console.log(bl)
    console.log(response.data.data[bl])
    return response.data.data[bl].block;
  };

  export const searchAddress = async (ad) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/address/${ad}?key=A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5`
    );
    console.log(response.data.result);
    return response.data.result;
  }

  export const searchBlockHeight = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/stats?key=A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5`
    );
    console.log(response.data.data.blocks);
    return response.data.data.blocks;
  };

  export const getLastTenBlocks = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/blocks?limit=10&key=A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  export const getLastTenTransactions = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/transactions?limit=10&key=A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5`
    );
    console.log(response.data.data);
    return response.data.data;
  };
  