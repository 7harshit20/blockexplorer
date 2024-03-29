const express = require("express");
const router = express.Router();
const db = require("../config/db");
import axios from "axios";

router.get("/addresses", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM address");
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/check/:id", async (req, res) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM address WHERE address = $1",
      [req.params.id]
    );
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// router.get("/txs/today", async (req, res) => {
//     try {

module.exports = router;
