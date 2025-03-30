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
  const findAll = async () => {
    try {
      const response = await fetch(baseUrl + `/${apiKey}/items`);
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

  return { findAll, findOne, registerOne };
};
