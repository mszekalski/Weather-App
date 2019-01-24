const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname + "/../build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../build/index.html"));
});

//start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
