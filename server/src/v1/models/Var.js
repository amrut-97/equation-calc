const mongoose = require("mongoose");
const varListData = require("../constants/varListData");

const Schema = mongoose.Schema;

const varSchema = new Schema({
  name: String,
  value: String,
  type: String,
});

const varCollection = mongoose.model("Var", varSchema);

varCollection.count((err, count) => {
  if (err) {
    console.log(err);
  } else {
    if (count === 0) {
      varCollection.insertMany(varListData, (err) => {
        if (err) return handleError(err);
      });
    }
  }
});

module.exports = varCollection;
