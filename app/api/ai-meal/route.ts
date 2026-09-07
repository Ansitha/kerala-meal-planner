import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return Response.json({ error: "Missing API key" }, { status: 500 });
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-3.6-flash:generateContent?key=" + key,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: "Give me a simple Kerala breakfast recipe as plain text only."
                }
              ]
            }
          ]
        })
      }
    );

    const json = await response.json();

    // ⭐ Extract only the recipe text
    const recipe =
      json?.candidates?.[0]?.content?.parts?.[0]?.text || "No recipe found";

    return Response.json({ recipe }, { status: 200 });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}




