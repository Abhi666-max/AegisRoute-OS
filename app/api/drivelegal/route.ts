import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      console.error("DriveLegal API Error: GEMINI_API_KEY is missing in environment variables.");
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing in environment variables' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

    const body = await req.json();
    const { messages, country } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const targetCountry = country || 'BIMSTEC nations';
    const systemPrompt = `You are the core AI of AegisRoute OS, an enterprise road safety and compliance platform. You provide precise, professional legal and safety guidance for traffic laws, fines, and compliance in BIMSTEC countries. The user is currently asking about rules in ${targetCountry}. Be concise, format with markdown, and maintain a highly professional, enterprise-grade tone.`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro",
      systemInstruction: systemPrompt 
    });

    const formattedHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error("DriveLegal API Execution Failure. Trace:", error);
    return NextResponse.json({ error: error.message || 'Failed to process request' }, { status: 500 });
  }
}
