const userRoute = require("./routes/users.js");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser")
const cors = require("cors");
const app = express();
dotenv.config({});

// Middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoute);
app.get("/", (req,res) => {
	res.send("helo")
})
// Server
const PORT = 3000 || 3001;
app.listen(PORT, () => {
	console.log(`Listining on *${PORT}`);
})