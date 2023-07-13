export const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  organization: "org-Hlcz4MCpXJmdEqS1xOyIneZd",
};

export const headers2 = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
  organization: "org-Hlcz4MCpXJmdEqS1xOyIneZd",
  "Content-Type": "multipart/form-data",
};
