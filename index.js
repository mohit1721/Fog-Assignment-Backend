const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");

dotenv.config();
db.connect(); // Connect to the database

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
