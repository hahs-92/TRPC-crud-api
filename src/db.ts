import mongoose from "mongoose";

export const dbConncet = async () => {
  try {
    mongoose.set("strictQuery", false); // resuleve un error de mongoose
    const db = await mongoose.connect(
      "mongodb+srv://hahs:TravelMate@cluster0.tmnqqvn.mongodb.net/trpc?retryWrites=true&w=majority"
    );

    console.log(`Database is connected to: ${db.connection.db.databaseName} `);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
