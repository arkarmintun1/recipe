import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { Recipe } from "../../models/recipe";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.delete(
  "/api/recipes/:recipeId",
  [
    param("recipeId").notEmpty().withMessage("recipeId is required"),
    param("recipeId").isMongoId().withMessage("recipeId is not valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const recipe = await Recipe.findById(req.params.recipeId);
    if (!recipe) {
      throw new NotFoundError();
    }

    await recipe.remove();

    res.send({});
  }
);

export { router as deleteRecipeRouter };
