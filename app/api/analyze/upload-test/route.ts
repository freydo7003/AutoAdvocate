import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";

export async function POST(request: Request) {
console.log("1. Route started");  
  const formData = await request.formData();
console.log("2. Form data received");
  const file = formData.get("estimate") as File | null;
console.log("3. File:", file?.name);
  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded." },
      { status: 400 }
    );
  }

 const fileBuffer = Buffer.from(await file.arrayBuffer());
console.log("4. Buffer created");
if (file.type === "image/jpeg" || file.type === "image/png") {
 const worker = await createWorker("eng");
console.log("5. Worker created");
  const {
    data: { text },
  } = await worker.recognize(fileBuffer);
console.log("6. OCR complete");
  await worker.terminate();
console.log("7. Worker terminated");
  return NextResponse.json({
    success: true,
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size,
    extractedText: text.trim(),
  });
}

return NextResponse.json({
  success: true,
  fileName: file.name,
  fileType: file.type,
  fileSize: file.size,
  extractedText: "Text extraction is not enabled for this file type yet.",
});
}