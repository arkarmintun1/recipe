import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserAttrs {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: string;
  level?: string;
  status?: string;
  activated_token: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  avatar: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  level: string;
  status: string;
  activated_token: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    first_name: {
      type: String,
      default: "",
    },
    last_name: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      default: "normal",
    },
    status: {
      type: String,
      default: "not_activated",
    },
    activated_token: {
      type: String,
      default: "",
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
