const express = require("express");
const app = express();
const clientPromise = require("./lib/mongodb");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const docsRoute = require("./routes/documentos/alldocs");

dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const Dbcon = async () => {
  await clientPromise;
  if (clientPromise) {
    console.log("connected to mongodb");
    return clientPromise;
  }
};
Dbcon();

app.use("/api/docs", docsRoute);
app.listen(process.env.PORT || 8800, () => {
  console.log("backend server is running");
});
