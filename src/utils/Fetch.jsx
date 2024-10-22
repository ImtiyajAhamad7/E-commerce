export const baseUrl = "http://localhost:5000/api/";
export async function Fetch(url, method, body, query) {
  let params;
  const token = sessionStorage.getItem("accessToken")?.toString();
  // console.log(token);
  params = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
      // Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token') + "")?.token}`,
    },
    ...(body && { body: JSON.stringify(body) }),
  };

  try {
    const response = await fetch(`${baseUrl}${url}?${query}`, params);
    if (response.status === 401) {
      sessionStorage.clear();

      return undefined;
    } else if (response.status === 400) {
      const message = await response.text();

      return undefined;
    } else if (response.status !== 200) {
      return undefined;
    }
    return response;
  } catch {
    return undefined;
  }
}
