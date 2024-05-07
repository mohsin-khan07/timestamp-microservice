const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api", (req, res) => {
  res.send({ unix: new Date().getTime(), utc: new Date().toUTCString() });
});

app.get("/api/:date?", (req, res) => {
  let date = new Date(req.params.date);

  if (isInvalidDate(date)) date = new Date(+req.params.date);

  if (isInvalidDate(date)) {
    res.send({ error: "Invalid Date" });
    return;
  }

  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
