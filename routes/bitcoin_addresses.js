const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/addresses", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM addresses");
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/check:id", async (req, res) => {
  //console.log(req.query.id);
  try {
    const id=(req.params.id);
    const checkId=id.slice(1)
    const { rows } = await db.query(
      "SELECT * FROM addresses WHERE address = $1;",
      [checkId]
    );
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
