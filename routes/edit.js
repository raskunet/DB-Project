const { msSQL, sqlCon } = require("../db.config");
const express = require("express");
const router = express.Router();

console.log(__dirname);

router.get("/", async function (req, res) {
  try {
    // Query the database to fetch user data
    const pool = await sqlCon;
    const id = 2;
    const query = `SELECT firstName, lastName, emailAddress FROM Users WHERE userID = @id;`;

    // Query the database to fetch user data
    const result = await pool.request().input("id", id).query(query);

    // Extract user data from the results
    const userData = result.recordset;

    // Render the profile page and pass user data to the template
    res.render("edit", { userData });
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle errors appropriately
    res.status(500).send("Internal Server Error");
  }
});

router.post("/details", async function (req, res) {
  try {
    const { Fname, Lname, Opassword, Npassword, Cpassword } = req.body;
    console.log(Fname);

    const pool = await sqlCon;
    const id = 2;
    const query = `
          UPDATE Users SET firstName = @Fname, lastName = @Lname, userPassword = @Npassword WHERE userID = @id;
      `;

    const result = await pool
      .request()
      .input("id", id)
      .input("Fname", Fname)
      .input("Lname", Lname)
      .input("Npassword", Npassword)
      .query(query);

    res.redirect("/profile");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile");
  }
});

module.exports = router;
