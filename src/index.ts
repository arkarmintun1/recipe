require("dotenv").config();
import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.SENDGRID_API_KEY) {
    throw new Error("SENDGRID_API_KEY must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB.");
  } catch (err) {
    console.error(err);
  }

  app.listen(8080, () => {
    console.log("Server running on port: 8080");
  });
};

start();
