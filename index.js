const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:year-:month-:date", (req, res) => {
  const time = req.params.year + "-" + req.params.month + "-" + req.params.date;
  const date = new Date(time);
  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:unix", (req, res) => {
  const date = new Date(Number(req.params.unix));
  res.send({ unix: date.getTime(), utc: date.toUTCString() });
});

// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
