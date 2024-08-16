// src/app/api/chat/route.js
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY, // Ensure this matches your environment variable
});

export async function POST(req) {
  try {
    const body = await req.json();
    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages: body.messages,
    });

    return new Response(
      JSON.stringify({ message: completion.choices[0].message.content }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching completion" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
