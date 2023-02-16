import app from "./app";
import { dbConncet } from "./db";

dbConncet();

app.listen(3000);
console.log("Listening...");
