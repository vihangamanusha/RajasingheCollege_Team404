export const sendMessage = async (data) => {
  const res = await fetch("http://localhost:8080/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  //IMPORTANT: show real error
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return res.json();
};