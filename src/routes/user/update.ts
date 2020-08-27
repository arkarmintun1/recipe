import express, { Request, Response } from "express";
import { param } from "express-validator";
import formidable from "formidable";
import fs from "fs-extra";
import path from "path";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import { validateRequest } from "../../middlewares/validate-request";
import { uploadImage } from "../../services/upload-image";

const router = express.Router();

router.put("/api/profile", async (req: Request, res: Response) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const user = await User.findOneAndUpdate({ _id: fields.id }, fields);
      await uploadImage(files, fields);
      res.json({ result: "success", message: "Updated Successfully" });
    });
  } catch (err) {
    res.json({ result: "error", message: "Error occurred" });
  }
});

export { router as updateUserRouter };
