import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB)
    .then((e) => {
      console.log("connected mongoDB");
    })
    .catch();
};

export default connectDB;
