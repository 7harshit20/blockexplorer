const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/addresses", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM address");
    res.status(200).send(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// router.get("/check", async (req, res) => {
//   console.log(req.query.id);
//   try {
//     // console.log(req.params.id);
//     // const { rows } = await db.query(
//     //   "SELECT * FROM address WHERE address = $1;",
//     //   [req.params.id]
//     // );
//     // res.status(200).send(rows);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });

module.exports = router;
