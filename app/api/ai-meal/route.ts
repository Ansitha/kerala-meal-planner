import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { type } = await req.json();

  const prompt = `
Generate one Kerala-style ${type} meal.
Return ONLY valid JSON with:
{
  "name": "",
  "description": "",
  "category": "",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number
}
No explanation. No markdown. No backticks. Only JSON.
`;

  const aiRes = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=" +
      process.env.GEMINI_API_KEY,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.4,
        },
      }),
    }
  );

  const data = await aiRes.json();

  let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

  // Clean markdown if Gemini adds it
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  let meal;
  try {
    meal = JSON.parse(text);
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON", raw: text },
      { status: 500 }
    );
  }

  return NextResponse.json({ meal });
}
