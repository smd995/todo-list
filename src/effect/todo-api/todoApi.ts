export const todoApi = () => {
  const baseUrl = process.env.API_URL;
  const apiKey = process.env.TENANT_ID;

  // getAll
  const findAll = async () => {
    const response = await fetch(baseUrl + `/${apiKey}/items`);
    const data = await response.json();
    return data;
  };

  // getOne
  const findOne = async (itemId: number) => {
    const response = await fetch(baseUrl + `/${apiKey}/items/${itemId}`);
    const data = await response.json();
    return data;
  };

  // postOne
  const registerOne = async (name: string) => {
    const response = await fetch(baseUrl + `/${apiKey}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error("Failed to register todo");
    }

    const data = await response.json();
    return data;
  };

  return { findAll, findOne, registerOne };
};
