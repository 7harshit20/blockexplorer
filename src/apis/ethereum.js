import axios from "axios";

const api_key = process.env.REACT_APP_BLOCKCHAIR_API_KEY;
// const api_key = process.env.REACT_APP_BLOCKCHAIR_API_KEY_CT;

export const searchBlockHeight = async () => {
  const response = await axios.get(`https://api.blockchair.com/ethereum/stats`);
  console.log(response.data.data.blocks);
  return response.data.data.blocks;
};

export const getLastTenBlocks = async () => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/blocks?limit=10`
  );
  console.log(response.data.data);
  return response.data.data;
};

export const getLastTenTransactions = async () => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/transactions?limit=10`
  );
  console.log(response.data.data);
  return response.data.data;
};

export const getAddressInfo = async (ad) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/address/${ad}?erc_20=true&limit=10&key=${api_key}`
  );
  console.log(response.data.data);
  return response.data.data;
};

export const searchTransactions = async (th) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/transaction/${th}?effects=true&erc_20=true&key=${api_key}`
  );
  console.log(response.data.data);
  return response.data.data;
};

export const getRawBlockInfo = async (bl) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/raw/block/${bl}?key=${api_key}`
  );
  console.log(response.data.data);
  return response.data.data;
};

export const getBlockInfo = async (bl) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/block/${bl}?key=${api_key}`
  );
  console.log(response.data.data);
  return response.data.data;
};
