/**
 * Generates an explanation array based on the provided data.
 *
 * @param {Object} data - The input data object.
 * @param {string} data.item - The detected item.
 * @param {number} data.coins - The earned EcoCoins.
 * @param {number} data.trustScore - The user's Trust Score.
 * @param {string} data.priority - The pickup priority.
 *
 * @returns {string[]} An array of explanation strings.
 */
function generateExplanation(data) {
    // Extract the input data from the data object
    const { item, coins, trustScore, priority } = data;
  
    // Create an empty array to store the explanation strings
    const explanation = [];
  
    // Add the detected item to the explanation
    explanation.push(`${item} detected.`);
  
    // Add the earned EcoCoins to the explanation
    explanation.push(`You earned ${coins} EcoCoins.`);
  
    // Add the user's Trust Score to the explanation
    explanation.push(`Your Trust Score is ${trustScore}.`);
  
    // Add the pickup priority to the explanation
    explanation.push(`Pickup Priority: ${priority}.`);
  
    // Return the explanation array
    return explanation;
  }
  
  // Export the generateExplanation function using CommonJS
  module.exports = generateExplanation;