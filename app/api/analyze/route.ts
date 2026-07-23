import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const repairText = body.repairText;

    if (!repairText) {
      return NextResponse.json(
        { error: "Repair information is required." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
You are AutoAdvocate, an automotive repair assistant.

Analyze the following repair information and explain it in plain English:

${repairText}

Include:
- whether the recommendation seems reasonable
- possible concerns
- questions the customer should ask the shop
`,
    });

    return NextResponse.json({
      analysis: response.output_text,
    });
  } catch (error) {
    console.error("AutoAdvocate AI error:", error);

    return NextResponse.json(
      { error: "AutoAdvocate could not analyze the repair." },
      { status: 500 }
    );
  }
}