import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Recipe } from "../../models/recipe";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.get(
  "/api/recipes/:recipeId",
  [
    param("recipeId")
      .notEmpty()
      .isMongoId()
      .withMessage("recipeId is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.recipeId);

    if (!recipe) {
      throw new NotFoundError();
    }

    res.send(recipe);
  }
);

export { router as readRecipeRouter };
