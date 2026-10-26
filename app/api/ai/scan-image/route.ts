import { analyzeScrapImage } from "@/lib/ai";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse(new Error("Invalid JSON body in request."), "Invalid JSON payload.", 400);
    }

    const { imageDataUrl, fileName } = body;

    if (!imageDataUrl || typeof imageDataUrl !== "string") {
      return errorResponse(new Error("Missing or invalid image data URL."), "Missing or invalid image data.", 400);
    }

    const result = await analyzeScrapImage(imageDataUrl, fileName);

    return successResponse(result, "Scrap image analyzed successfully.");
  } catch (error: unknown) {
    return errorResponse(error, "AI scrap visual analysis failed. Please try again with a clearer photo.", 500);
  }
}

