import mongoose from "mongoose";

interface RecipeAttrs {
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: string;
  }[];
  steps: string[];
}

interface RecipeDoc extends mongoose.Document {
  title: string;
  description: string;
  ingredients: {
    name: string;
    amount: string;
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
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
      },
    ],
    steps: [String],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

recipeSchema.statics.build = (attrs: RecipeAttrs) => {
  return new Recipe(attrs);
};

const Recipe = mongoose.model<RecipeDoc, RecipeModel>("Recipe", recipeSchema);

export { Recipe };
