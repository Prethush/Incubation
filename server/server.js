const express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 5555;
const cors = require("cors");
const errorHandler = require("./middleware/err");
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/users", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
app.use(errorHandler);
