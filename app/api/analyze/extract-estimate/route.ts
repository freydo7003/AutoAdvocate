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
if (file.size > 5 * 1024 * 1024) {
  return NextResponse.json(
    { error: "File too large. Maximum upload size is 5 MB." },
    { status: 413 }
  );
}
if (
  file.type !== "image/jpeg" &&
  file.type !== "image/png" &&
  file.type !== "application/pdf"
) {
  return NextResponse.json(
    { error: "Please upload a PDF, PNG, or JPEG file." },
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
           file.type === "application/pdf"
  ? {
      type: "input_file" as const,
      filename: file.name,
      file_data: imageDataUrl,
    }
  : {
      type: "input_image" as const,
      image_url: imageDataUrl,
      detail: "high" as const,
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