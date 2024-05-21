export default async function fetchApi(url, options) {
  const token = JSON.parse(localStorage.getItem("token"))?.token || "";
  options.headers = {
    ...options.headers,
    Authorization: `${token}`,
  };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 409) {
      throw new Error(data || " có lỗi xuất hiện");
    }
    if (!response.ok) {
      throw new Error(
        `Server responded with ${response.status}: ${
          data.message || "An error occurred"
        }`
      );
    }
    return data;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}
