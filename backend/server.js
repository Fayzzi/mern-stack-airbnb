const express = require("express");
const cookieparser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const app = express();

const UserRouter = require("./Routes/UserRoutes/UserRoutes");
const cors = require("cors");
require("dotenv").config();
//middleware
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(cookieparser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.use("/", UserRouter);
mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`)
    );
  })
  .catch((e) => {
    console.log(e);
  });
