import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import sendgrid from "@sendgrid/mail";
import jwt from "jsonwebtoken";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY!);

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
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        throw new BadRequestError("User already exists!");
      }

      const activated_token = jwt.sign(
        { username, email },
        process.env.JWT_ACCOUNT_ACTIVATION!,
        { expiresIn: "365d" }
      );

      const emailData = {
        from: "arkarmintun1@gmail.com",
        to: email,
        subject: "Account activtion link",
        html: `
          <h1>Please use the following link to activate your account</h1>
          <p>http://localhost:3000/api/activation/${activated_token}</p>
          <hr />
          <p>This email may contain sensitive information.</p>
          <p>Link will expire in 60 minutes</p>`,
      };

      const user = User.build({ username, email, password, activated_token });
      await user.save();

      sendgrid
        .send(emailData)
        .then((sent) => {
          res.status(201).json({
            result: "warning",
            message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
          });
        })
        .catch((err) => {
          console.log(err.response.body);
          res.status(200).json({
            result: "error",
            message: "Error occurred while creating user account",
          });
        });
    } catch (err) {
      console.log(err.response.body);
      res.status(200).json({
        result: "error",
        message: "Error occurred while creating user account",
      });
    }
  }
);

export { router as registerUserRouter };
