import React from "react";
import axios from "axios";
const api_key_ct = 'A___ldisHyqV8cgPcRO3NsDWIVCv3JQ5';
console.log(api_key_ct)

export const searchTransactions = async (th) => {
  console.log(api_key_ct)
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/transaction/${th}?key=${api_key_ct}`
    );
    console.log(response.data.data[`${th}`]);
    return response.data.data[`${th}`];
  };

  export const searchBlocks = async (bl) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/block/${bl}?key=${api_key_ct}`
    );
    console.log(bl)
    console.log(response.data.data[bl])
    return response.data.data[bl].block;
  };

  export const searchAddress = async (ad) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/address/${ad}?key=${api_key_ct}`
    );
    console.log(response.data.result);
    return response.data.result;
  }

  export const searchBlockHeight = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/stats?key=${api_key_ct}`
    );
    console.log(response.data.data.blocks);
    return response.data.data.blocks;
  };

  export const getLastTenBlocks = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/blocks?limit=10&key=${api_key_ct}`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  export const getLastTenTransactions = async () => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/transactions?limit=10&key=${api_key_ct}`
    );
    console.log(response.data.data);
    return response.data.data;
  };

  export const getAddressInfo = async (ad) => {
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/dashboards/address/${ad}?erc_20=true&key=${api_key_ct}`
    );
    console.log(response.data.data[`${ad}`]);
    return response.data.data[`${ad}`];
  };

  export const getTransactionHistory=async(ad,currentPage,itemsPerPage)=>{
    const response = await axios.get(
      `https://api.blockchair.com/bitcoin/transactions?address/${ad}?erc_20=true&offset=${currentPage*itemsPerPage}&limit=${itemsPerPage}&key=${api_key_ct}`
    );
    console.log(response)
    return response.data.data;
  }

  export const getTransactionBlock=async(blockHeight,currentPage,itemsPerPage)=>{
      const response=await axios.get(
        `https://api.blockchair.com/bitcoin/transactions?&q=block_id(${blockHeight})&offset=${currentPage*itemsPerPage}&limit=${itemsPerPage}&key=${api_key_ct}`
      )
      return response.data.data;
  }
  