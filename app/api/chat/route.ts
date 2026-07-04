import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getGroqApiKey(): string {
  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key") {
    return process.env.GROQ_API_KEY;
  }
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/GROQ_API_KEY=["']?([^"'\r\n]+)["']?/);
      if (match && match[1]) {
        return match[1];
      }
    }
  } catch (e) {
    console.error("Failed to read .env.local dynamically:", e);
  }
  return process.env.GROQ_API_KEY || "";
}

export async function POST(req: Request) {
  try {
    const apiKey = getGroqApiKey();
    const groq = new Groq({ apiKey });

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

    const formattedMessages = [systemPrompt, ...messages];
    const modelsToTry = [
      "llama3-70b-8192",
      "llama-3.3-70b-versatile",
      "llama-3.1-8b-instant",
      "mixtral-8x7b-32768"
    ];

    let completion: any = null;
    let lastError: any = null;

    for (const model of modelsToTry) {
      try {
        completion = await groq.chat.completions.create({
          messages: formattedMessages,
          model: model,
          temperature: 0.5,
          max_tokens: 1024,
        });
        if (completion && completion.choices && completion.choices[0]?.message?.content) {
          break; // Successfully generated!
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Groq model ${model} failed, attempting next model in pipeline...`, err?.message || err);
      }
    }

    if (!completion || !completion.choices || !completion.choices[0]?.message?.content) {
      throw lastError || new Error("All Groq inference models failed to return tokens.");
    }

    const responseText = completion.choices[0].message.content;

    return NextResponse.json({ 
      response: responseText,
      content: responseText,
      role: "assistant"
    });
  } catch (error: any) {
    console.error("Groq API Error:", error?.message || error);
    return NextResponse.json({ error: "Sovereign Intelligence node currently unreachable." }, { status: 500 });
  }
}
