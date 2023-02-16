import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import morgan from "morgan";
import cors from "cors";

import { notesRouter } from "./routes/note";
import { router, createContext } from "./trpc";

const app = express();

const appRouter = router({
  note: notesRouter,
});

app.use(morgan("dev"));
app.use(cors());
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof appRouter;
export default app;
