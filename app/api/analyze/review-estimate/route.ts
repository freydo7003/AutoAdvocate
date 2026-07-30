import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const reviewSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    verdict: { type: "string" },
    summary: { type: "string" },
    urgent: {
      type: "array",
      items: { type: "string" },
    },
    canWait: {
      type: "array",
      items: { type: "string" },
    },
    needsConfirmation: {
      type: "array",
      items: { type: "string" },
    },
    concerns: {
      type: "array",
      items: { type: "string" },
    },
    questions: {
      type: "array",
      items: { type: "string" },
    },
    costs: {
      type: "object",
      additionalProperties: false,
      properties: {
        parts: { type: "string" },
        labor: { type: "string" },
        taxes: { type: "string" },
        fees: { type: "string" },
        total: { type: "string" },
      },
      required: ["parts", "labor", "taxes", "fees", "total"],
    },
  },
  required: [
    "verdict",
    "summary",
    "urgent",
    "canWait",
    "needsConfirmation",
    "concerns",
    "questions",
    "costs",
  ],
} as const;
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

Return a structured review using plain English.

Rules:
- Use "Not shown" when a cost is missing.
- Keep each list item concise.
- Do not invent repairs, prices, test results, or diagnoses.
- Do not claim a repair is definitely unnecessary unless the estimate clearly supports that conclusion.
- Put unclear, vague, unsupported, or insufficiently documented work under needsConfirmation or concerns.
      `.trim(),
  text: {
    format: {
      type: "json_schema",
      name: "repair_estimate_review",
      strict: true,
      schema: reviewSchema,
    },
  },
});

  const review = JSON.parse(response.output_text);

return NextResponse.json({
  success: true,
  review,
}); 
  } catch (error) {
    console.error("Estimate review error:", error);

    return NextResponse.json(
      { error: "The repair estimate could not be reviewed." },
      { status: 500 }
    );
  }
}