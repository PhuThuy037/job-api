require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// connect db
const connectDb = require("./db/connect");

// securerity
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// router
app.get("/", (req, res) => {
  res.send("Jobs API");
});
const auth = require("./routes/auth");
const jobs = require("./routes/jobs");

const authUser = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
// extra packages

// routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/jobs", authUser, jobs);
app.use("/api/v1/jobs/:id", authUser, jobs);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    console.log("Hello");
  } catch (error) {
    console.log(error);
  }
};

start();
