// const mongoose = require("mongoose");
// require("dotenv").config();

// const { MONGO_URI } = process.env;

// console.log("MongoDB URL:", MONGO_URI);

// exports.connect = () => {
//   mongoose
//     .connect(MONGO_URI)
//     .then(() => console.log(`✅ DB Connection Success`))
//     .catch((err) => {
//       console.error(`❌ DB Connection Failed`);
//       console.error(err);
//       process.exit(1);
//     });
// };
// **
const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

console.log("MongoDB URL:", MONGO_URI);

module.exports.connect = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log(`✅ DB Connection Success`))
    .catch((err) => {
      console.error(`❌ DB Connection Failed`);
      console.error(err);
      process.exit(1);
    });
};
