const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://nivedpk21:nivedpk21@cluster0.cuiosip.mongodb.net/eschoolDB?retryWrites=true&w=majority&appName=Cluster0"
);

const schema = mongoose.Schema;
const studentSchema = new schema({
  name: { type: String },
  age: { type: String },
  class: { type: String },
  rollnumber: { type: String },
  gender: { type: String },
});

const studentModel = mongoose.model("student_tb", studentSchema);
module.exports = studentModel;
