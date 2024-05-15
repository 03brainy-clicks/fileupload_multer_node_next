const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const { originalname, mimetype, size, path: filePath } = req.file;
  return res.json({
    filename: originalname,
    mimetype,
    size,
    location: path.resolve(filePath),
  });
});

app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.all("*", (req, res) => {
  return res.status(404).send("404 Route not found");
});

app.listen(8000, () => {
  console.log("Server running at 8000");
});
