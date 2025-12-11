export async function fetchAPI(url, options) {
    const { method, authToken, body, next } = options;
  
    const headers = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(next && { next }),
    };
  
    try {
      const response = await fetch(url, headers);
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json") && response.ok) {
        return await response.json();
      } else {
        return { status: response.status, statusText: response.statusText };
      }
    } catch (error) {
      console.error(`Error ${method} data:`, error);
      throw error;
    }
  }
  