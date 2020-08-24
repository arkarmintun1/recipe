import mongoose from "mongoose";

interface RecipeAttrs {
  title: string;
  description: string;
  link: string;
  ingredients: {
    name: string;
    amount: string;
    note: string;
  }[];
  steps: string[];
}

interface RecipeDoc extends mongoose.Document {
  title: string;
  description: string;
  link: string;
  ingredients: {
    name: string;
    amount: string;
    note: string;
  }[];
  steps: string[];
}

interface RecipeModel extends mongoose.Model<RecipeDoc> {
  build(attrs: RecipeAttrs): RecipeDoc;
}

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    ingredients: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          amount: {
            type: String,
            required: true,
          },
          note: {
            type: String,
          },
        },
      ],
      required: true,
    },
    steps: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
  return new Recipe(attrs);
};

const Recipe = mongoose.model<RecipeDoc, RecipeModel>("Recipe", recipeSchema);

export { Recipe };
