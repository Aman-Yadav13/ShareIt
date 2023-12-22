import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
//Note:route must be specfied after use cors -> else bug
//Middleware
// app.use((res, req, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
app.use("/posts", postRoutes); //All routes in post routes will be default /post first
app.use("/user", userRoutes);
//Connecting database to server
//https://www.mongodb.com/atlas/cloud

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
