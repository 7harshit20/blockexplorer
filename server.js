const express = require("express");

const port = process.env.PORT || 5000;

const app = express();

app.use("/api/ethereum", require("./routes/ethereum_addresses"));

app.listen(port, () => console.log(`Listening on port ${port}`));
