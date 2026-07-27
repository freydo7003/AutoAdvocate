import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";
import path from "path";
export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("estimate") as File | null;

  if (!file) {
    return NextResponse.json(
      { error: "No file uploaded." },
      { status: 400 }
    );
  }

 const fileBuffer = Buffer.from(await file.arrayBuffer());

if (file.type === "image/jpeg" || file.type === "image/png") {
 const worker = await createWorker("eng", 1, {
  workerPath: path.join(
    process.cwd(),
    "node_modules",
    "tesseract.js",
    "src",
    "worker-script",
    "node",
    "index.js"
  ),
}); 

  const {
    data: { text },
  } = await worker.recognize(fileBuffer);

  await worker.terminate();

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