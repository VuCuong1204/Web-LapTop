const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
