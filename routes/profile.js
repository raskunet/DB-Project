const { msSQL, sqlCon } = require("../db.config");
const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    // Query the database to fetch user data
    const pool = await sqlCon;
    const id = req.session.userID;
    const query = `SELECT firstName, lastName, emailAddress FROM Users WHERE userID = @id;`;

    // Query the database to fetch user data
    const result = await pool.request().input("id", id).query(query);

    // Extract user data from the results
    const userData = result.recordset;

    // Render the profile page and pass user data to the template
    res.render("profile", {
      userData,
      user:req.session.userID,
      isAdmin: req.session.isAdmin,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle errors appropriately
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
