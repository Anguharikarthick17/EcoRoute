// backend/src/ai/index.js

// Import the reward engine function.
// calculateReward(data) -> returns { coins, reasons }
const calculateReward = require('./rewardEngine');

// Import the trust engine function.
// calculateTrustScore(data) -> returns { trustScore, reasons }
const calculateTrustScore = require('./trustEngine');

// Import the priority engine function.
// calculatePriority(data) -> returns { score, priority, reasons }
const calculatePriority = require('./priorityEngine');

// Import the explanation engine function.
// generateExplanation(data) -> returns an array of user-friendly messages
const generateExplanation = require('./explainEngine');

// Import the Gemini Vision function.
// analyzeWasteImage(imagePath) -> async, returns { item, material, condition, confidence }
const { analyzeWasteImage } = require('./gemini');

// Export all AI engine functions from a single entry point.
// This lets other files import everything from './ai' instead of each file separately.
module.exports = {
  calculateReward,      // Calculates EcoCoins for an item
  calculateTrustScore,  // Calculates a user's trust score
  calculatePriority,    // Calculates pickup priority
  generateExplanation,  // Builds human-readable result messages
  analyzeWasteImage     // Analyzes a waste image via Gemini Vision
};