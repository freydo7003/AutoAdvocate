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
For confidenceReason, briefly explain why the confidence score is high, medium, or low. Do not claim the diagnosis is certain.

Create a mechanic fairness score from 0 to 100 by comparing the shop's recommendation or quoted price with the expected repair cost, likely diagnosis, repair time, and whether proper testing was performed.

Use these general ranges:
- 70 to 100: Fair Price
- 40 to 69: Questionable Price
- 0 to 39: Likely Overpriced

Return:
- fairnessScore as a whole number from 0 to 100
- fairnessRating as Fair Price, Questionable Price, or Likely Overpriced
- fairnessExplanation as a short plain-language explanation

If the user does not provide a specific quoted price, lower the fairness score and clearly explain that the quote cannot be fully evaluated without a price.
Create actionItems as an array of 3 to 5 short, specific steps the customer should take before approving or declining the repair.

The action items should:
- be written in plain language
- begin with an action verb
- focus on questions, testing, price breakdowns, warranties, parts quality, or second opinions
- avoid repeating the same idea
- match the fairness rating and verdict

Examples:
- Ask for an itemized parts and labor breakdown.
- Request the diagnostic test results that support the repair.
- Confirm whether OEM or aftermarket parts will be used.
- Ask about the parts and labor warranty.
- Get a second opinion if the quote remains above the expected range.
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
fairnessScore: {
  type: "number",
  minimum: 0,
  maximum: 100,
},

fairnessRating: {
  type: "string",
},

fairnessExplanation: {
  type: "string",
},
actionItems: {
  type: "array",
  items: {
    type: "string",
  },
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
"fairnessScore",
"fairnessRating",
"fairnessExplanation",
"actionItems",
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