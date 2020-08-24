import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Recipe } from "../../models/recipe";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.put(
  "/api/recipes/:recipeId",
  [
    param("recipeId").notEmpty().withMessage("recipeId is required"),
    param("recipeId").isMongoId().withMessage("recipeId is not valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, link, ingredients, steps } = req.body;

    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      throw new NotFoundError();
    }

    recipe.set({
      title: title ? title : recipe.title,
      description: description ? description : recipe.description,
      link: link ? link : recipe.link,
      ingredients: ingredients ? ingredients : recipe.ingredients,
      steps: steps ? steps : recipe.steps,
    });
    await recipe.save();

    res.send(recipe);
  }
);

export { router as updateRecipeRouter };
