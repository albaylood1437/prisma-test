const cors = require("cors");
const express = require("express");
const resgister = require("./register");

const app = express();
// middleware
app.use(express.json());
app.use(cors());
app.use("/register", resgister);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on ${port}`));
