import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("estimate") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded." },
        { status: 400 }
      );
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return NextResponse.json(
        { error: "Please upload a PNG or JPEG image." },
        { status: 400 }
      );
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const base64Image = fileBuffer.toString("base64");
    const imageDataUrl = `data:${file.type};base64,${base64Image}`;

    const response = await openai.responses.create({
      model: "gpt-5",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
Extract all readable text from this vehicle repair estimate.

Preserve:
- repair items
- part names
- labor descriptions
- prices
- totals
- diagnostic notes

Return only the extracted estimate text.
Do not summarize it.
              `.trim(),
            },
            {
              type: "input_image",
              image_url: imageDataUrl,
              detail: "high",
            },
          ],
        },
      ],
    });

    const extractedText = response.output_text.trim();

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      extractedText,
    });
  } catch (error) {
    console.error("Estimate upload error:", error);

    return NextResponse.json(
      { error: "The estimate could not be read." },
      { status: 500 }
    );
  }
}