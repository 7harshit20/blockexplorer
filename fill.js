const rp = require("request-promise");
const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:harshit@localhost:5432/crypto-analysis");

// Bitcoin Core RPC configuration
const rpcConfig = {
  url: "http://localhost:8332",
  username: "harshit",
  password: "harshit",
};
console.log("reached here", rpcConfig);

// Function to make JSON-RPC request to Bitcoin Core
async function makeRPCRequest(method, params) {
  const options = {
    method: "POST",
    uri: rpcConfig.url,
    auth: {
      user: rpcConfig.username,
      pass: rpcConfig.password,
    },
    body: {
      jsonrpc: "1.0",
      id: "1",
      method,
      params,
    },
    json: true,
  };

  try {
    const response = await rp(options);
    return response.result;
  } catch (error) {
    console.error("RPC Error:", error);
    throw error;
  }
}

// Function to fetch data from Bitcoin Core and store it in PostgreSQL
async function fetchAndStoreData() {
  try {
    // Fetch Bitcoin blockchain info
    const blockchainInfo = await makeRPCRequest("getblockchaininfo", []);
    console.log(blockchainInfo);
    // Store blockchain info in PostgreSQL
    // await db.none(
    //   'INSERT INTO blockchain_info (blocks, headers) VALUES ($1, $2)',
    //   [blockchainInfo.blocks, blockchainInfo.headers]
    // );

    console.log("Blockchain info stored in PostgreSQL.");

    // Fetch other data and store in PostgreSQL as needed
    // Example: Fetch transaction info
    for (let i = 1; i < 792531; i++) {
      const blockhash = await makeRPCRequest("getblockhash", [i]);
      const transactionInfo = await makeRPCRequest("getblock", [blockhash]);
      await db.none("insert into block (hash, height) values ($1, $2)", [
        transactionInfo.hash,
        transactionInfo.height,
      ]);
    }
    console.log("Transaction info stored in PostgreSQL.");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to fetch and store data
fetchAndStoreData();
