/**
 * backend/src/ai/gemini.js
 * 
 * Google Gemini Flash Vision AI Integration Engine for EcoRoute
 * Uses @google/generative-ai and model 'gemini-1.5-flash'
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Fetch Gemini API Key from environment
const getApiKey = () => {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GEMINI_FLASH_API_KEY ||
    ""
  );
};

/**
 * Helper to convert local image file to generative part format
 */
function fileToGenerativePart(filePath, mimeType = "image/jpeg") {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType,
    },
  };
}

/**
 * Helper to convert base64 image data to generative part format
 */
function base64ToGenerativePart(base64Data, mimeType = "image/jpeg") {
  const cleanBase64 = base64Data.includes(",")
    ? base64Data.split(",")[1]
    : base64Data;
  return {
    inlineData: {
      data: cleanBase64,
      mimeType,
    },
  };
}

/**
 * Analyzes an e-waste or scrap image using Gemini Flash Vision AI
 * 
 * @param {string} imageInput - Base64 image string or file path
 * @param {string} [mimeType="image/jpeg"] - Image MIME type
 * @returns {Promise<Object>} Structured classification result
 */
async function analyzeWasteImage(imageInput, mimeType = "image/jpeg") {
  const apiKey = getApiKey();

  // If no API key provided, log warning and return baseline classification
  if (!apiKey || apiKey.includes("YOUR_GEMINI_API_KEY")) {
    console.warn(
      "[Gemini AI] No valid GEMINI_API_KEY found in .env.local. Please set GEMINI_API_KEY to enable live Gemini Flash Vision analysis."
    );
    return {
      success: false,
      item: "E-Waste / Metal Scrap",
      material: "Mixed Metals & Electronic Components",
      condition: "Usable Scrap",
      recyclable: true,
      confidence: 0.92,
      estimatedPrice: "₹150 - ₹400",
      cpcbCategory: "General E-Waste",
      note: "Set GEMINI_API_KEY in .env.local for live Gemini 1.5 Flash Vision AI analysis.",
    };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Use gemini-1.5-flash for fast multimodal vision inspection
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let imagePart;
    if (typeof imageInput === "string" && (imageInput.startsWith("data:") || imageInput.length > 500)) {
      imagePart = base64ToGenerativePart(imageInput, mimeType);
    } else if (typeof imageInput === "string" && fs.existsSync(imageInput)) {
      imagePart = fileToGenerativePart(imageInput, mimeType);
    } else {
      throw new Error("Invalid image input provided to Gemini Vision AI.");
    }

    const prompt = `
You are an expert CPCB certified E-Waste & Metal Scrap Inspector for EcoRoute India.
Analyze this item image carefully and return ONLY a valid JSON object (no markdown, no extra text) with the following structure:
{
  "item": "<Item Name e.g. Smartphone / Laptop / Charger Cable / Metal Bangle / Switch Board / Copper Wire>",
  "category": "<One of: Smartphones & Mobile Devices | Laptops & Computers | Cables & Accessories | Copper Wire & Windings | Metals & Aluminium Scrap | Smartwatches & Wearables | Bluetooth Earbuds & Audio | Electrical Switches & Sockets | Printed Circuit Boards (PCBs)>",
  "material": "<Primary materials e.g. Aluminium, Copper, Lithium-Ion, Plastic, PCB>",
  "condition": "<Clean | Fair | Damaged | Scrap>",
  "recyclable": true,
  "confidence": 0.95,
  "estimatedPrice": "<Estimated price in INR e.g. ₹250>",
  "inspectionNote": "<1 sentence description of condition and recycling value>"
}
`;

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const responseText = response.text();

    // Parse JSON from response
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        success: true,
        ...parsed,
      };
    }

    return {
      success: true,
      rawText: responseText,
      item: "Identified E-Waste Scrap",
      confidence: 0.9,
    };
  } catch (error) {
    console.error("[Gemini AI Error]", error);
    return {
      success: false,
      error: error.message,
      item: "E-Waste Scrap",
      confidence: 0.85,
    };
  }
}

module.exports = {
  analyzeWasteImage,
};
