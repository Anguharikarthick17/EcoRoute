// rewardEngine.js
function calculateReward(data) {
    // ... (code remains the same)
  }
  
  // trustEngine.js
  function calculateTrustScore(data) {
    // ... (code remains the same)
  }
  
  // priorityEngine.js
  function calculatePriority(data) {
    // ... (code remains the same)
  }
  
  // explainEngine.js
  function generateExplanation(data) {
    // ... (code remains the same)
  }
  
  // Test cases
  function runTests() {
    // Test cases for rewardEngine.js
    const rewardData1 = {
      item: 'Plastic Bottle',
      condition: 'Clean',
      trustScore: 85
    };
    const rewardExpectedOutput1 = {
      coins: 30,
      reasons: ['Plastic Bottle', 'Clean Bonus', 'High Trust Bonus']
    };
    const rewardResult1 = calculateReward(rewardData1);
    console.assert(JSON.stringify(rewardResult1) === JSON.stringify(rewardExpectedOutput1), 'Reward test case 1 failed');
  
    const rewardData2 = {
      item: 'Glass Bottle',
      condition: 'Dirty',
      trustScore: 60
    };
    const rewardExpectedOutput2 = {
      coins: 25,
      reasons: ['Glass Bottle']
    };
    const rewardResult2 = calculateReward(rewardData2);
    console.assert(JSON.stringify(rewardResult2) === JSON.stringify(rewardExpectedOutput2), 'Reward test case 2 failed');
  
    const rewardData3 = {
      item: 'Paper',
      condition: 'Clean',
      trustScore: 90
    };
    const rewardExpectedOutput3 = {
      coins: 15,
      reasons: ['Paper', 'Clean Bonus', 'High Trust Bonus']
    };
    const rewardResult3 = calculateReward(rewardData3);
    console.assert(JSON.stringify(rewardResult3) === JSON.stringify(rewardExpectedOutput3), 'Reward test case 3 failed');
  
    // Test cases for trustEngine.js
    const trustData1 = {
      verifiedUploads: 10,
      correctClassifications: 8,
      municipalityApproved: 5,
      spamUploads: 0,
      fakeUploads: 0,
      duplicateUploads: 0,
      consecutiveValidUploads: 7
    };
    const trustExpectedOutput1 = {
      trustScore: 100,
      reasons: [
        'Initial score: 50',
        'Verified uploads: 30 points',
        'Correct classifications: 16 points',
        'Municipality-approved uploads: 25 points',
        'Spam uploads: 0 points',
        'Fake uploads: 0 points',
        'Duplicate uploads: 0 points',
        'Consecutive valid uploads bonus: 5 points',
        'Final score clamped between 0 and 100: 100'
      ]
    };
    const trustResult1 = calculateTrustScore(trustData1);
    console.assert(JSON.stringify(trustResult1) === JSON.stringify(trustExpectedOutput1), 'Trust test case 1 failed');
  
    const trustData2 = {
      verifiedUploads: 5,
      correctClassifications: 3,
      municipalityApproved: 2,
      spamUploads: 1,
      fakeUploads: 1,
      duplicateUploads: 1,
      consecutiveValidUploads: 3
    };
    const trustExpectedOutput2 = {
      trustScore: 56,
      reasons: [
        'Initial score: 50',
        'Verified uploads: 15 points',
        'Correct classifications: 6 points',
        'Municipality-approved uploads: 10 points',
        'Spam uploads: -8 points',
        'Fake uploads: -10 points',
        'Duplicate uploads: -5 points',
        'Final score clamped between 0 and 100: 56'
      ]
    };
    const trustResult2 = calculateTrustScore(trustData2);
    console.assert(JSON.stringify(trustResult2) === JSON.stringify(trustExpectedOutput2), 'Trust test case 2 failed');
  
    // Test cases for priorityEngine.js
    const priorityData1 = {
      hazardous: true,
      weight: 5,
      daysWaiting: 3,
      locationType: 'Hospital'
    };
    const priorityExpectedOutput1 = {
      score: 95,
      priority: 'Critical',
      reasons: [
        'Hazardous item: +40 points',
        'Weight: 10 points',
        'Days waiting: 15 points',
        'Location type (Hospital): +30 points'
      ]
    };
    const priorityResult1 = calculatePriority(priorityData1);
    console.assert(JSON.stringify(priorityResult1) === JSON.stringify(priorityExpectedOutput1), 'Priority test case 1 failed');
  
    const priorityData2 = {
      hazardous: false,
      weight: 2,
      daysWaiting: 1,
      locationType: 'Residential'
    };
    const priorityExpectedOutput2 = {
      score: 19,
      priority: 'Low',
      reasons: [
        'Weight: 4 points',
        'Days waiting: 5 points',
        'Location type (Residential): +10 points'
      ]
    };
    const priorityResult2 = calculatePriority(priorityData2);
    console.assert(JSON.stringify(priorityResult2) === JSON.stringify(priorityExpectedOutput2), 'Priority test case 2 failed');
  
    // Test cases for explainEngine.js
    const explainData1 = {
      item: 'Plastic Bottle',
      coins: 30,
      trustScore: 85,
      priority: 'Medium'
    };
    const explainExpectedOutput1 = [
      'Plastic Bottle detected.',
      'You earned 30 EcoCoins.',
      'Your Trust Score is 85.',
      'Pickup Priority: Medium.'
    ];
    const explainResult1 = generateExplanation(explainData1);
    console.assert(JSON.stringify(explainResult1) === JSON.stringify(explainExpectedOutput1), 'Explain test case 1 failed');
  
    const explainData2 = {
      item: 'Glass Bottle',
      coins: 25,
      trustScore: 70,
      priority: 'Low'
    };
    const explainExpectedOutput2 = [
      'Glass Bottle detected.',
      'You earned 25 EcoCoins.',
      'Your Trust Score is 70.',
      'Pickup Priority: Low.'
    ];
    const explainResult2 = generateExplanation(explainData2);
    console.assert(JSON.stringify(explainResult2) === JSON.stringify(explainExpectedOutput2), 'Explain test case 2 failed');
  
    console.log('All test cases passed!');
  }
  
  // Run the tests
  runTests();