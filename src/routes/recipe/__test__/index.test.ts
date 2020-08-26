import request from "supertest";
import { Recipe } from "../../../models/recipe";
import { app } from "../../../app";
import mongoose from "mongoose";

const createRecipe = () => {
  return request(app)
    .post("/api/recipes")
    .send({
      title: "Recipe Title 1",
      description: "Recipe Description",
      ingredients: [
        { name: "Ingredient 1", amount: "1 tablespoon" },
        { name: "Ingredient 2", amount: "2 tablespoons" },
        { name: "Ingredient 3", amount: "3 tablespoons" },
        { name: "Ingredient 4", amount: "4 tablespoons" },
      ],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    });
};

it("has a route handler for listing recipes", async () => {
  const response = await request(app).get("/api/recipes").send({});
  expect(response.status).not.toEqual(404);
});

it("returns a list of recipes", async () => {
  await createRecipe();
  await createRecipe();
  await createRecipe();

  const response = await request(app).get("/api/recipes").send({}).expect(200);
  expect(response.body.length).toEqual(3);
});
