import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const estimateText = body.estimateText?.trim();

    if (!estimateText) {
      return NextResponse.json(
        { error: "No repair estimate text was provided." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5",
      input: `
Review this vehicle repair estimate for a customer.

Estimate text:
${estimateText}

Explain:
- the overall verdict
- the repairs found
- which repairs appear urgent, can wait, or need confirmation
- the parts, labor, taxes, fees, and total when shown
- suspicious, duplicated, vague, or unsupported charges
- useful questions the customer should ask the repair shop

Use plain English.
Do not claim a repair is definitely unnecessary unless the estimate clearly supports that conclusion.
      `.trim(),
    });

    return NextResponse.json({
      success: true,
      review: response.output_text.trim(),
    });
  } catch (error) {
    console.error("Estimate review error:", error);

    return NextResponse.json(
      { error: "The repair estimate could not be reviewed." },
      { status: 500 }
    );
  }
}