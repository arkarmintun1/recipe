import formidable from "formidable";
import fs from "fs-extra";
import path from "path";
import { User } from "../models/user";

export const uploadImage = async (
  files: formidable.Files,
  doc: formidable.Fields
) => {
  if (files.avatar != null) {
    const fileExtension = files.avatar.name.split(".").pop();
    doc.avatar = `${Date.now()}+${doc.username}.${fileExtension}`;
    const newPath =
      path.resolve(__dirname + "./../images/uploads/") + "/" + doc.avatar;

    fs.exists(newPath, async (status) => {
      if (status) await fs.remove(newPath);
    });

    await fs.move(files.avatar.path, newPath);

    await User.findOneAndUpdate({ _id: doc.id }, doc);
  }
};
