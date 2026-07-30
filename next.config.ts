import type { NextConfig } from "next";

const nextConfig: NextConfig = {
outputFileTracingIncludes: {
  "/*": [
    "./node_modules/tesseract.js/**/*",
    "./node_modules/tesseract.js-core/**/*",
  ],
},
};

export default nextConfig;