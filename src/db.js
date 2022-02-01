import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connect to database MONGODB`);
  })
  .catch((error) => {
    console.error(`Error connecting to database: ${error.message}`);
  });
