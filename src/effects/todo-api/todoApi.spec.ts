import { test, describe } from "vitest";
import { todoApi } from "./todoApi";
import { TodoRequest } from "@/types/todo-list/type";

const todo: TodoRequest = {
  name: "updateTest",
  memo: "비타민 아연 챙겨먹기",
  imageUrl: "/check/check.svg",
  isCompleted: true,
};

describe("/api/todo", () => {
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

  test("isCompleted", async () => {
    const data = await api.isCompleted(5731, true);

    console.log(data);
  });

  test("updateOne", async () => {
    const data = await api.updateOne(5732, todo);

    console.log(data);
  });

  test("deleteOne", async () => {
    const data = await api.deleteOne(5731);

    console.log(data);
  });

  test("uploadImage", async () => {
    const file = new File(["dummy content"], "test.png", { type: "image/png" });

    const data = await api.uploadImage(file);

    console.log(data);
  });
});
