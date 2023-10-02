import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "next_authentication",
    });

    const connection = mongoose.connection;

    connection.on("connect", () => {
      console.log("MongoDB connected.");
    });

    connection.on("error", (e) => {
      console.log(`Error while making connection with MongoDB:\n${e}`);
      process.exit(1);
    });
  } catch (error) {
    console.log(`Error connecting to DB:\n${error}`);
  }
};
