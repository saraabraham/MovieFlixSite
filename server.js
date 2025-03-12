import reviews from "./api/reviews.route.js"
import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env['PORT'] || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/reviews",reviews);
app.use("*",(req,res) =>
    res.status(404).json({error:"not found"}));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

export default app;