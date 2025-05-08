// // routes/SearchDestinationRoute.js

// const express = require("express");
// const {searchDestination} = require("../controllers/SearchDestinationController");
// const router = express.Router();

// // returns uid to use in hotels route when using name of place to search
// // http://localhost:3001/destinations?term=Rome%2C%20Italy
// router.get('/', searchDestination);


// module.exports = router;

const express = require("express");
const router = express.Router();
const { searchDestination } = require("../controllers/SearchDestinationController");
const { partial_city } = require("../models/dest"); // ✅ correct path based on your project

// old route (you can keep this)
router.get('/', searchDestination);

// ✅ final correct autocomplete route
router.get('/autocomplete', async (req, res) => {
  const term = req.query.term;
  if (!term) return res.json([]);

  try {
    const results = await partial_city(term, 5);
    console.log("Autocomplete results:", results); // this should match your SQL output
    res.json(results);
  } catch (err) {
    console.error("Autocomplete failed:", err);
    res.status(500).json({ error: "Autocomplete failed" });
  }
});

module.exports = router;
