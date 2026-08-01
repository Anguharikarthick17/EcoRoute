/**
 * Calculates the priority score and level for waste collection based on various factors.
 *
 * @param {Object} data - The input data object containing waste collection details.
 * @param {boolean} data.hazardous - Indicates if the waste is hazardous.
 * @param {number} data.weight - The weight of the waste in kilograms.
 * @param {number} data.daysWaiting - The number of days the waste has been waiting for collection.
 * @param {string} data.locationType - The type of location where the waste is located.
 *
 * @returns {Object} An object containing the calculated priority score, priority level, and reasons.
 * @returns {number} score - The calculated priority score.
 * @returns {string} priority - The priority level based on the score (Low, Medium, High, Critical).
 * @returns {string[]} reasons - An array of strings describing the reasons for the priority score.
 */
function calculatePriority(data) {
    // Extract the input data from the data object
    const { hazardous, weight, daysWaiting, locationType } = data;
  
    // Initialize the priority score and reasons array
    let score = 0;
    const reasons = [];
  
    // Check if the waste is hazardous
    if (hazardous) {
      score += 40;
      reasons.push('+40 points for hazardous waste');
    }
  
    // Add points based on the weight of the waste
    score += weight * 2;
    reasons.push(`+${weight * 2} points for ${weight} kg of waste`);
  
    // Add points based on the number of days the waste has been waiting
    score += daysWaiting * 5;
    reasons.push(`+${daysWaiting * 5} points for ${daysWaiting} days waiting`);
  
    // Add points based on the location type
    switch (locationType) {
      case 'Hospital':
        score += 30;
        reasons.push('+30 points for hospital location');
        break;
      case 'School':
        score += 20;
        reasons.push('+20 points for school location');
        break;
      case 'Residential':
        score += 10;
        reasons.push('+10 points for residential location');
        break;
      case 'Market':
        score += 15;
        reasons.push('+15 points for market location');
        break;
    }
  
    // Determine the priority level based on the score
    let priority;
    if (score >= 91) {
      priority = 'Critical';
    } else if (score >= 61) {
      priority = 'High';
    } else if (score >= 31) {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }
  
    // Return the calculated priority score, priority level, and reasons
    return {
      score,
      priority,
      reasons
    };
  }
  
  // Export the calculatePriority function using CommonJS
  module.exports = calculatePriority;