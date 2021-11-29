// const mongoose = require("mongoose");

// const connectDB = async () => {
//   await mongoose.connect(process.env.ATLAS_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   console.log("Mongodb Connect");
// };


// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  });

  console.log("MongoDB Connected");
};

module.exports = connectDB;




