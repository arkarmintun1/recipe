import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import { Password } from "../../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/login",
  [
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
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("User doesn't exist!");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    res
      .status(200)
      .send({ result: "success", token, message: "Login Successfully" });
  }
);

export { router as loginUserRouter };
