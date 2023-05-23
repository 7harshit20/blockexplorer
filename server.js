
const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use("/api/ethereum", require("./routes/ethereum_addresses"));

app.listen(port, () => console.log(`Listening on port ${port}`));
