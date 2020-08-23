import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandlers } from "./middlewares/error-handler";
import { createRecipeRouter } from "./routes/create";

const app = express();
app.use(json());

app.use(createRecipeRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandlers);

export { app };
