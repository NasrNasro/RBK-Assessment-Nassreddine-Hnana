const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/connection");
const pagesRouter = require("./routes/pages");
const imagesRouter = require("./routes/images");

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/pages", pagesRouter);
app.use("/api/images", imagesRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));