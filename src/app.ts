import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { createRecipeRouter } from "./routes/recipe/create";
import { readRecipeRouter } from "./routes/recipe/read";
import { indexRecipeRouter } from "./routes/recipe";
import { updateRecipeRouter } from "./routes/recipe/update";
import { deleteRecipeRouter } from "./routes/recipe/delete";
import { registerUserRouter } from "./routes/user/register";
import { loginUserRouter } from "./routes/user/login";
import { profileUserRouter } from "./routes/user/profile";
import { updateUserRouter } from "./routes/user/update";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.static(__dirname + "/images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(registerUserRouter);
app.use(loginUserRouter);
app.use(profileUserRouter);
app.use(updateUserRouter);

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
