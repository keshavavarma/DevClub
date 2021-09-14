const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/api/users");
const authRouter = require("./routes/api/auth");
const profileRouter = require("./routes/api/profile");
const postsRouter = require("./routes/api/posts");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

// api routes

app.use("/api/users", userRouter);
app.use("/api/profile", profileRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
