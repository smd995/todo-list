import { test, describe, expect } from "vitest";
import { todoApi } from "./todoApi";

describe("GET /api/todo", () => {
  const api = todoApi();

  test("findAll", async () => {
    const data = await api.findAll();

    console.log(data);
  });

  test("findOne", async () => {
    const data = await api.findOne(5731);

    console.log(data);
  });

  test("registerOne", async () => {
    const data = await api.registerOne("first todo");

    console.log(data);
  });
});
