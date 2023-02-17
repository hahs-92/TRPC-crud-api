import mongoose from "mongoose";

import { MONGODB_URI } from "./config";

export const dbConncet = async () => {
  try {
    mongoose.set("strictQuery", false); // resuleve un error de mongoose
    const db = await mongoose.connect(MONGODB_URI);

    console.log(`Database is connected to: ${db.connection.db.databaseName} `);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
