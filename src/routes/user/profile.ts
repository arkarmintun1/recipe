import express, { Request, Response } from "express";
import { param } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

router.get(
  "/api/profile/id/:id",
  [
    param("id").notEmpty().withMessage("user id cannot be empty"),
    param("id").isMongoId().withMessage("Provided user id is not valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      throw new BadRequestError("User cannot be found");
    }

    res.status(200).send(user);
  }
);

export { router as profileUserRouter };
