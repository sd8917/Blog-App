const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user-routes");
const blogRoutes = require("./routes/blog-routes");

const url = "mongodb://localhost/Blog";
const app = express();

mongoose.connect(url);
const conn = mongoose.connection;
conn.on("open", () => {
  console.log("DB connected !!");
});

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

app.listen(5000, () => {
  console.log("server connected !");
});
