/**
 * Calculates the reward points for a given item based on its condition and the user's trust score.
 *
 * @param {Object} data - The input data object.
 * @param {string} data.item - The type of item (e.g., "Plastic Bottle", "Glass Bottle", "Metal Can", "Paper", "Battery").
 * @param {string} data.condition - The condition of the item (e.g., "Clean", "Dirty").
 * @param {number} data.trustScore - The trust score of the user (0-100).
 *
 * @returns {Object} An object containing the calculated reward points and the reasons for the reward.
 * @returns {number} reward.coins - The total reward points earned.
 * @returns {string[]} reward.reasons - An array of strings describing the reasons for the reward.
 */
function calculateReward(data) {
    // Define the base reward points for each item type
    const itemPoints = {
      "Plastic Bottle": 20,
      "Glass Bottle": 25,
      "Metal Can": 30,
      "Paper": 10,
      "Battery": 50
    };
  
    // Extract the item, condition, and trustScore from the input data
    const { item, condition, trustScore } = data;
  
    // Initialize the reward object with the base points and reasons
    const reward = {
      coins: itemPoints[item] || 0, // Use the base points for the item, or 0 if not found
      reasons: [item] // Add the item type as the first reason for the reward
    };
  
    // Check if the item condition is "Clean" and add a bonus
    if (condition === "Clean") {
      reward.coins += 5; // Add 5 bonus points for a clean item
      reward.reasons.push("Clean Bonus"); // Add "Clean Bonus" as a reason for the reward
    }
  
    // Check if the user's trust score is greater than or equal to 80 and add a bonus
    if (trustScore >= 80) {
      reward.coins += 5; // Add 5 bonus points for a high trust score
      reward.reasons.push("High Trust Bonus"); // Add "High Trust Bonus" as a reason for the reward
    }
  
    // Return the final reward object
    return reward;
  }
  
  // Export the calculateReward function using CommonJS
  module.exports = calculateReward;