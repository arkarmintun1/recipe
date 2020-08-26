import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { createRecipeRouter } from "./routes/recipe/create";
import { readRecipeRouter } from "./routes/recipe/read";
import { indexRecipeRouter } from "./routes/recipe";
import { updateRecipeRouter } from "./routes/recipe/update";
import { deleteRecipeRouter } from "./routes/recipe/delete";

const app = express();
app.use(json());

app.use(indexRecipeRouter);
app.use(createRecipeRouter);
app.use(readRecipeRouter);
app.use(updateRecipeRouter);
app.use(deleteRecipeRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
