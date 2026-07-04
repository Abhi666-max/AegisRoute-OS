import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages: bodyMessages, query, prompt } = body;
    
    let messages: any[] = [];
    if (Array.isArray(bodyMessages)) {
      messages = bodyMessages;
    } else if (query || prompt) {
      messages = [{ role: "user", content: query || prompt }];
    }

    // Strict system prompt for B2G compliance
    const systemPrompt = {
      role: "system",
      content: "You are AegisRoute Sovereign Intelligence. Provide professional, concise legal and civic protocol advice based on BIMSTEC frameworks. Maintain a formal, high-authority tone."
    };

    const completion = await groq.chat.completions.create({
      messages: [systemPrompt, ...messages],
      model: "llama3-70b-8192",
      temperature: 0.5,
      max_tokens: 1024,
    });

    const responseText = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ 
      response: responseText,
      content: responseText,
      role: "assistant"
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Sovereign Intelligence node currently unreachable." }, { status: 500 });
  }
}
