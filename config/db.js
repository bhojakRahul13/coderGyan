const mongoose = require("mongoose");

const db = () => {
  mongoose.connect(
    'mongodb://localhost:27017/practical',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (!err) {
        console.log("mongo connect successfully.");
      } else {
        console.log("ERROr in db:" + err);
        //process.exit(1);
      }
    }
  );
}; //db name sassy_prctical

module.exports = db;