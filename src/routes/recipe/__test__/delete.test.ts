import request from "supertest";
import { app } from "../../../app";
import mongoose from "mongoose";

it("has a route handler for deleting recipe", async () => {
  const recipeId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .delete(`/api/recipes/${recipeId}`)
    .send({});
  expect(response.status).not.toEqual(404);
});

it("retuns 400 if not specified recipe doesn't exist", async () => {
  const recipeId = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .delete(`/api/recipes/${recipeId}`)
    .send({});
  expect(response.status).toEqual(400);
});

it("retuns 400 if not specified recipe is not valid", async () => {
  const recipeId = "12345";
  const response = await request(app)
    .delete(`/api/recipes/${recipeId}`)
    .send({});
  expect(response.status).toEqual(400);
});

it("returns 200 after deleting successfully", async () => {
  const response = await request(app)
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
    })
    .expect(201);
  const recipeId = response.body.id;
  await request(app).delete(`/api/recipes/${recipeId}`).send({}).expect(200);
});
