import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";

const router = express.Router();

router.post(
  "/api/register",
  [
    body("username").notEmpty().withMessage("username is required"),
    body("username")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("username must be between 2 and 50 characters"),
    body("email").notEmpty().withMessage("email is required"),
    body("email").isEmail().withMessage("email is not valid"),
    body("password").notEmpty().withMessage("password is required"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("User already exists!");
    }

    const user = User.build({ username, email, password });
    await user.save();

    res
      .status(201)
      .send({ result: "success", message: "Register Successfully" });
  }
);

export { router as registerUserRouter };
