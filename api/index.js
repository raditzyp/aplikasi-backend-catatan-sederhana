import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Import app routes
import appRoutes from "../src/routes/index.js";


const app = express();
dotenv.config();
app.use(express.json());

// App routes
app.use(appRoutes);
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
})