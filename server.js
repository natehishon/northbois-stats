const express = require("express");
const cors = require("cors");
require('dotenv').config()



const app = express();


var corsOptions = {
  origin: process.env.CLIENT_URL
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Tutorial = db.tutorials;

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", async (req, res) => {
  const yo = await Tutorial.create({
    title: 'yo',
    description: 'yo',
    published: true,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  //update
  // const yo = Tutorial.findAll()
  return res.json({ yo });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});