import request from "supertest";
import { Recipe } from "../../../models/recipe";
import { app } from "../../../app";

it("has a route handler listening to /api/recipes for post requests", async () => {
  const response = await request(app).post("/api/recipes").send({});
  expect(response.status).not.toEqual(404);
});

it("returns an error if an invalid title is provided", async () => {
  await request(app)
    .post("/api/recipes")
    .send({
      title: "",
      description: "Recipe Description",
      ingredients: [
        { name: "Ingredient 1", amount: "1 tablespoon" },
        { name: "Ingredient 2", amount: "2 tablespoons" },
        { name: "Ingredient 3", amount: "3 tablespoons" },
        { name: "Ingredient 4", amount: "4 tablespoons" },
      ],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);

  await request(app)
    .post("/api/recipes")
    .send({
      description: "Recipe Description",
      ingredients: [
        { name: "Ingredient 1", amount: "1 tablespoon" },
        { name: "Ingredient 2", amount: "2 tablespoons" },
        { name: "Ingredient 3", amount: "3 tablespoons" },
        { name: "Ingredient 4", amount: "4 tablespoons" },
      ],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);
});

it("returns an error if an invalid description is provided", async () => {
  await request(app)
    .post("/api/recipes")
    .send({
      title: "Recipe Title 1",
      description: "",
      ingredients: [
        { name: "Ingredient 1", amount: "1 tablespoon" },
        { name: "Ingredient 2", amount: "2 tablespoons" },
        { name: "Ingredient 3", amount: "3 tablespoons" },
        { name: "Ingredient 4", amount: "4 tablespoons" },
      ],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);

  await request(app)
    .post("/api/recipes")
    .send({
      title: "Recipe Title 1",
      ingredients: [
        { name: "Ingredient 1", amount: "1 tablespoon" },
        { name: "Ingredient 2", amount: "2 tablespoons" },
        { name: "Ingredient 3", amount: "3 tablespoons" },
        { name: "Ingredient 4", amount: "4 tablespoons" },
      ],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);
});

it("returns an error if an invalid ingredient is provided", async () => {
  await request(app)
    .post("/api/recipes")
    .send({
      title: "Recipe Title 1",
      description: "Recipe Description",
      ingredients: [],
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);

  await request(app)
    .post("/api/recipes")
    .send({
      title: "Recipe Title 1",
      description: "Recipe Description",
      steps: ["This is step 1", "This is step 2", "This is step 3"],
    })
    .expect(400);
});

it("returns an error if an invalid stepes is provided", async () => {
  await request(app)
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
      steps: [],
    })
    .expect(400);

  await request(app)
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
    })
    .expect(400);
});

it("create a recipe with valid inputs", async () => {
  let recipes = await Recipe.find({});
  expect(recipes.length).toEqual(0);

  await request(app)
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

  recipes = await Recipe.find({});
  expect(recipes.length).toEqual(1);
});
