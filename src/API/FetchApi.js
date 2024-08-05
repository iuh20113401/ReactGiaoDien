const URL = "https://54.206.33.181/server/api/";
export default async function fetchApi(url, options) {
  const token = JSON.parse(localStorage.getItem("token")) || "";
  const date = new Date().getTime();
  if (!token || token?.expire < date) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  }
  options.headers = {
    ...options.headers,
    Authorization: `${token.token}`,
  };
  try {
    const response = await fetch(URL + url, options);
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
