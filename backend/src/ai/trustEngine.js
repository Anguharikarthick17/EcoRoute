/**
 * Calculates the trust score for a user based on their upload history and behavior.
 *
 * @param {Object} data - The input data object containing user upload statistics.
 * @param {number} data.verifiedUploads - The number of verified uploads by the user.
 * @param {number} data.correctClassifications - The number of correct classifications by the user.
 * @param {number} data.municipalityApproved - The number of uploads approved by the municipality.
 * @param {number} data.spamUploads - The number of spam uploads by the user.
 * @param {number} data.fakeUploads - The number of fake uploads by the user.
 * @param {number} data.duplicateUploads - The number of duplicate uploads by the user.
 * @param {number} data.consecutiveValidUploads - The number of consecutive valid uploads by the user.
 *
 * @returns {Object} An object containing the calculated trust score and the reasons for the score.
 * @returns {number} trustScore - The calculated trust score for the user (between 0 and 100).
 * @returns {string[]} reasons - An array of strings describing the reasons for the trust score.
 */
function calculateTrustScore(data) {
    // Extract the input data from the data object
    const {
      verifiedUploads,
      correctClassifications,
      municipalityApproved,
      spamUploads,
      fakeUploads,
      duplicateUploads,
      consecutiveValidUploads
    } = data;
  
    // Initialize the trust score to 50
    let trustScore = 50;
    const reasons = [];
  
    // Add points for verified uploads
    trustScore += verifiedUploads * 3;
    reasons.push(`+${verifiedUploads * 3} points for ${verifiedUploads} verified uploads`);
  
    // Add points for correct classifications
    trustScore += correctClassifications * 2;
    reasons.push(`+${correctClassifications * 2} points for ${correctClassifications} correct classifications`);
  
    // Add points for municipality approved uploads
    trustScore += municipalityApproved * 5;
    reasons.push(`+${municipalityApproved * 5} points for ${municipalityApproved} municipality approved uploads`);
  
    // Deduct points for spam uploads
    trustScore -= spamUploads * 8;
    reasons.push(`-${spamUploads * 8} points for ${spamUploads} spam uploads`);
  
    // Deduct points for fake uploads
    trustScore -= fakeUploads * 10;
    reasons.push(`-${fakeUploads * 10} points for ${fakeUploads} fake uploads`);
  
    // Deduct points for duplicate uploads
    trustScore -= duplicateUploads * 5;
    reasons.push(`-${duplicateUploads * 5} points for ${duplicateUploads} duplicate uploads`);
  
    // Add bonus points for consecutive valid uploads
    if (consecutiveValidUploads >= 5) {
      trustScore += 5;
      reasons.push('+5 bonus points for 5 or more consecutive valid uploads');
    }
  
    // Ensure the trust score stays within the range of 0 to 100
    trustScore = Math.max(0, Math.min(100, trustScore));
  
    // Return the calculated trust score and reasons
    return {
      trustScore,
      reasons
    };
  }
  
  // Export the calculateTrustScore function using CommonJS
  module.exports = calculateTrustScore;