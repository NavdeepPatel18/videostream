const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "testschema",
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/videoName", (req, res) => {
  connection.query("SELECT * FROM video_feed_data;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.put("/feedchange", (req, res) => {
  const values = req.body.data;
  const feed = req.body.feed;

  var queries = "";

  values.forEach(function (item) {
    queries += mysql.format(
      `UPDATE video_feed_data SET feed = ${feed} WHERE id = ?; `,
      item.id
    );
  });

  connection.query(queries, (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/video/:id", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires range header");
  }

  const videoId = req.params.id;

  const videopath = path.join(__dirname, "../Server-Side", videoId);
  const videosize = fs.statSync(videopath).size;

  const cunck_size = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + cunck_size, videosize - 1);

  const content_length = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videosize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": content_length,
    "Content-Type": "video/mp4",
  };

  res.writeHead(206, headers);

  const videostream = fs.createReadStream(videopath, { start, end });

  videostream.pipe(res);
});

app.listen(3001, () => {
  console.log("Listing on port 3001");
});
