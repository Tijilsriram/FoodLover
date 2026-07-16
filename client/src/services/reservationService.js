export async function reserveTable(formData) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reserve`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const text = await response.text();
  console.log("Response Body:", text);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text}`);
  }

  return JSON.parse(text);
}