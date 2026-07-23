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

Analyze this repair information:

${repairText}

Use plain English. Do not claim that a diagnosis is confirmed unless testing supports it.
Choose severity using these rules:

high = the shop recommendation appears unsupported, potentially unsafe, or could cause major unnecessary expense

medium = the diagnosis is uncertain and more testing is needed before approving the repair

low = the recommendation reasonably matches the trouble code, symptoms, and available evidence
Choose urgency using these rules:

immediate = delaying the repair could create a serious safety risk, major engine damage, transmission damage, or leave the driver stranded

soon = the repair should be scheduled soon to prevent the problem from getting worse or becoming more expensive

routine = the repair can normally wait until regular maintenance or a convenient service appointment
Estimate the likely repair cost as a realistic range in US dollars. Include both parts and labor when possible. Use a simple format such as $100-$350.

Estimate the typical shop repair time using a simple format such as 1-2 hours, 3-5 hours, or 1-2 days.

For safeToDrive, return exactly one of these values:

yes
Use this when normal driving is generally reasonable.

limited
Use this when the vehicle should only be driven for short or necessary trips until it is inspected or repaired.

no
Use this when continued driving could create a serious safety risk, cause major additional damage, or leave the driver stranded.
For confidence, return a whole number from 0 to 100.

Use a higher confidence score only when the trouble code, symptoms, vehicle information, and shop recommendation strongly agree.

Use a lower confidence score when information is missing, vague, contradictory, or when several different causes are equally plausible.

For confidenceReason, briefly explain why the confidence score is high, medium, or low. Do not claim the diagnosis is certain.
`,
  text: {
    format: {
      type: "json_schema",
      name: "repair_analysis",
      strict: true,
      schema: {
        type: "object",
        properties: {
         severity: {    
  type: "string",
  enum: ["high", "medium", "low"],
}, 
urgency: {
  type: "string",
  enum: ["immediate", "soon", "routine"],
},
estimatedCost: {
  type: "string",
  description:
    "A realistic estimated repair cost range in US dollars, such as $100-$350. Include parts and labor when possible.",
},

repairTime: {
  type: "string",
  description:
    "A realistic estimated shop repair time, such as 1-2 hours or 1-2 days.",
},

safeToDrive: {
  type: "string",
  enum: ["yes", "no", "limited"],
  description:
    "Whether the vehicle is generally safe to drive: yes, no, or limited. Use limited when only short or necessary trips may be reasonable.",
},
confidence: {
  type: "number",
  minimum: 0,
  maximum: 100,
},

confidenceReason: {
  type: "string",
},
          verdict: {
            type: "string",
          },
          summary: {
            type: "string",
          },
          concerns: {
            type: "array",
            items: {
              type: "string",
            },
          },
          likelyCauses: {
            type: "array",
            items: {
              type: "string",
            },
          },
          recommendedTests: {
            type: "array",
            items: {
              type: "string",
            },
          },
          questions: {
            type: "array",
            items: {
              type: "string",
            },
          },
          spendingAdvice: {
            type: "string",
          },
        },
        required: [
          'severity',
          'urgency',
          "estimatedCost",
"repairTime",
"safeToDrive",
          "verdict",
          "summary",
          "concerns",
          "likelyCauses",
          "recommendedTests",
          "questions",
          "spendingAdvice",
          "confidence",
"confidenceReason",
        ],
        additionalProperties: false,
      },
    },
  },
});

  const analysis = JSON.parse(response.output_text);

return NextResponse.json({
  analysis,
});  
  } catch (error) {
    console.error("AutoAdvocate AI error:", error);

    return NextResponse.json(
      { error: "AutoAdvocate could not analyze the repair." },
      { status: 500 }
    );
  }
}