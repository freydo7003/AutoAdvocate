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
You are AutoAdvocate, a consumer-focused automotive repair analysis assistant.

Your job is not to replace a hands-on inspection or claim that a diagnosis is confirmed. Your job is to evaluate the repair recommendation like a careful, experienced technician and then explain it to someone who knows very little about cars.

Analyze this repair information:

${repairText}

Before producing the final response, evaluate the situation using this internal diagnostic framework:

1. Identify the customer's reported problem, vehicle information, trouble codes, symptoms, quoted price, and shop recommendation.
2. Decide whether the recommended repair logically matches the available symptoms, codes, and evidence.
3. Identify other realistic causes that could produce the same symptoms or trouble codes.
4. Identify the tests or inspection steps normally used to confirm the recommended repair before replacing parts.
5. Notice important information that is missing, vague, or contradictory.
6. Evaluate whether replacing the recommended part now is justified, premature, or unsupported.
7. Separate safety urgency from repair cost. An expensive repair is not automatically urgent, and an inexpensive repair is not automatically safe to delay.
8. Give the customer simple questions they can read directly to the repair shop.

Use plain English suitable for a person with no automotive knowledge.

Do not require the customer to understand technical measurements or diagnostic procedures.

Do not assume that a trouble code proves a particular part has failed. Trouble codes identify a detected condition or affected system and may have multiple possible causes.

Do not claim that a diagnosis is confirmed unless the supplied information includes appropriate testing or clear physical evidence.

When evidence is missing, clearly say what has not been confirmed rather than accusing the repair shop of dishonesty.

Distinguish between:
- a repair that appears reasonable,
- a repair that may be reasonable but needs confirmation,
- and a repair that appears unsupported by the available evidence.

Keep likely causes realistic and prioritized. Do not provide a long list of rare possibilities merely to appear thorough.
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
    "Return exactly three semicolon-separated cost estimates. Each item must use a short, specific label of 5-8 words maximum followed by a realistic US-dollar range. Name the actual diagnostic test or repair for this vehicle. Do not use generic labels such as 'Common repair' or 'Major repair.' Do not include explanations, vehicle names, engine details, test procedures, or reasoning in this field. Example: 'Fuel pressure testing: $120-$250; Intake/PCV leak repair: $150-$600; Injectors + HPFP if confirmed: $1,800-$3,200'. Do not use bullets, line breaks, or paragraphs.",
},

repairTime: {
  type: "string",
  description:
    "Return exactly three semicolon-separated time estimates. Each item must use a short, specific label of 5-8 words maximum followed by a realistic time estimate. Name the actual diagnostic test or repair for this vehicle. Do not use generic labels such as 'Common repair' or 'Major repair.' Do not include explanations, vehicle names, engine details, test procedures, or reasoning in this field. Example: 'Fuel pressure testing: 1-2 hours; Intake/PCV leak repair: 1-3 hours; Injectors + HPFP replacement: 1-2 days'. Do not use bullets, line breaks, or paragraphs.",
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