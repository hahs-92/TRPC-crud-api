import express from "express";
import morgan from "morgan";
import * as trpcExpress from "@trpc/server/adapters/express";

import { router, createContext } from "./trcp";

const app = express();
const appRouter = router({});

app.use(morgan("dev"));
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    // rutas que se pueden consultar
    router: appRouter,
    createContext: createContext,
  })
);

export default app;
