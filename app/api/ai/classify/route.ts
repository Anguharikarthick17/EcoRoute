import { classifyDeviceImage } from "@/lib/ai";
import { successResponse, errorResponse } from "@/lib/api-response";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return errorResponse(new Error("Invalid request body."), "Invalid JSON payload.", 400);
    }

    const result = await classifyDeviceImage(body.imageUrl || "", body.deviceName);

    return successResponse(result, "Device classified successfully.");
  } catch (error: unknown) {
    return errorResponse(error, "AI device classification failed.", 500);
  }
}

