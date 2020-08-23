import express, { Request, Response } from "express";
import { Recipe } from "../../models/recipe";

const router = express.Router();

router.get("/api/recipes", async (req: Request, res: Response) => {
  const recipes = await Recipe.find({});

  res.send(recipes);
});

export { router as indexRecipeRouter };
