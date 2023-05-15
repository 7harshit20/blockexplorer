import axios from "axios";

export const searchTransactions = async (th) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/transaction/${th}`
  );
  console.log(response.data.result);
  return response.data.result;
};

export const searchBlocks = async (bl) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/block/${bl}`
  );
  console.log(response.data.result);
  return response.data.result;
};

export const searchAddress = async (ad) => {
  const response = await axios.get(
    `https://api.blockchair.com/ethereum/dashboards/address/${ad}`
  );
  console.log(response.data.result);
  return response.data.result;
};

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
