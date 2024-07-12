const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/eschoolDB?retryWrites=true&w=majority&appName=Cluster0"
);

const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  role: { type: String },
});

const userModel = mongoose.model("user_tb", userSchema);
module.exports = userModel;
