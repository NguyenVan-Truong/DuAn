import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./src/routes/index.js";


dotenv.config();

const { PORT, DB_URI } = process.env;

const app = express();

app.use(cors());
app.use(express.json()); // Middleware để parse JSON

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connected to database"))
    .catch((error) => {
        console.log("connect db thất bại, error: ", error);
    });

app.use("/api", router);

app.listen(PORT || 8000, () => {
    console.log(`server is running on port ${PORT || 8000}`);
});
