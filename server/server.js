const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const adminRouter = require("./src/routes/adminRouter");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyparser.json());

app.use("/admin", adminRouter);

app.listen(8000, () => {
  console.log("server started");
});
 