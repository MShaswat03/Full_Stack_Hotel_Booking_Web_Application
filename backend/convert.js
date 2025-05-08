const fs = require("fs");
const { Parser } = require("json2csv");

const data = require("./destinations/destinations.json");

const fields = ["uid", "term", "lat", "lng", "type", "state"];
const parser = new Parser({ fields });
const csv = parser.parse(data);

fs.writeFileSync("destinations.csv", csv);
console.log("✅ destinations.csv created!");
