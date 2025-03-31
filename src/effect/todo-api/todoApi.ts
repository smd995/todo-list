import { TodoRequest } from "@/types/todo-list/type";

export const todoApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiKey = process.env.NEXT_PUBLIC_TENANT_ID;

  const handleResponse = async (response: Response) => {
    const contentType = response.headers.get("Content-Type");
    const isJson = contentType?.includes("application/json");

    if (!response.ok) {
      const errorData = isJson ? await response.json() : await response.text();
      throw new Error(
        typeof errorData === "string"
          ? errorData
          : errorData.message || "Something went wrong"
      );
    }

    return isJson ? response.json() : response;
  };

  // getAll
  const findAll = async (page: number = 1, pageSize: number = 20) => {
    try {
      const response = await fetch(
        baseUrl + `/${apiKey}/items?page=${page}&pageSize=${pageSize}`
      );
      return await handleResponse(response);
    } catch (error) {
      console.error("findAll error", error);
      throw error;
    }
  };

  // getOne
  const findOne = async (itemId: number) => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}/items/${itemId}`);
      return await handleResponse(res);
    } catch (error) {
      console.error("❌ findOne error:", error);
      throw error;
    }
  };

  // postOne
  const registerOne = async (name: string) => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      return await handleResponse(res);
    } catch (error) {
      console.error("❌ registerOne error:", error);
      throw error;
    }
  };

  // isCompleted
  const isCompleted = async (itemId: number, isCompleted: boolean) => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted }),
      });
      return await handleResponse(res);
    } catch (error) {
      console.error("❌ isCompleted error:", error);
      throw error;
    }
  };

  // updateOne
  const updateOne = async (itemId: number, todo: TodoRequest) => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}/items/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      return await handleResponse(res);
    } catch (error) {
      console.error("❌ updateOne error:", error);
      throw error;
    }
  };

  // deleteOne
  const deleteOne = async (itemId: number) => {
    try {
      const res = await fetch(`${baseUrl}/${apiKey}/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await handleResponse(res);
    } catch (error) {
      console.error("❌ deleteOne error:", error);
      throw error;
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${baseUrl}/${apiKey}/images/upload`, {
        method: "POST",
        body: formData,
      });

      return await handleResponse(res);
    } catch (error) {
      console.error("❌ uploadImage error:", error);
      throw error;
    }
  };

  return {
    findAll,
    findOne,
    registerOne,
    isCompleted,
    updateOne,
    deleteOne,
    uploadImage,
  };
};

export const api = todoApi();
