// backend/src/tests/unit/test.js

const {
  calculateReward,
  calculateTrustScore,
  calculatePriority,
  generateExplanation,
} = require('../../ai');

// Test runner function
function runTests() {
  console.log('Running EcoRoute AI Engine Unit Tests...\n');

  let passed = 0;
  let total = 0;

  function assert(condition, message) {
    total++;
    if (condition) {
      passed++;
      console.log(`  ✓ ${message}`);
    } else {
      console.error(`  ✕ ASSERTION FAILED: ${message}`);
    }
  }

  // 1. rewardEngine Test Cases
  console.log('[1/4] Testing rewardEngine...');
  const reward1 = calculateReward({ item: 'Plastic Bottle', condition: 'Clean', trustScore: 85 });
  assert(reward1.coins === 30, `Plastic Bottle Clean + High Trust = 30 coins (got ${reward1.coins})`);
  assert(reward1.reasons.includes('Clean Bonus'), 'Includes Clean Bonus reason');

  const reward2 = calculateReward({ item: 'Glass Bottle', condition: 'Dirty', trustScore: 60 });
  assert(reward2.coins === 25, `Glass Bottle = 25 coins (got ${reward2.coins})`);

  const reward3 = calculateReward({ item: 'Paper', condition: 'Clean', trustScore: 90 });
  assert(reward3.coins === 20, `Paper Clean + High Trust = 20 coins (got ${reward3.coins})`);

  // 2. trustEngine Test Cases
  console.log('\n[2/4] Testing trustEngine...');
  const trust1 = calculateTrustScore({
    verifiedUploads: 10,
    correctClassifications: 8,
    municipalityApproved: 5,
    spamUploads: 0,
    fakeUploads: 0,
    duplicateUploads: 0,
    consecutiveValidUploads: 7,
  });
  assert(trust1.trustScore === 100, `High accuracy score clamped at 100 (got ${trust1.trustScore})`);

  const trust2 = calculateTrustScore({
    verifiedUploads: 5,
    correctClassifications: 3,
    municipalityApproved: 2,
    spamUploads: 1,
    fakeUploads: 1,
    duplicateUploads: 1,
    consecutiveValidUploads: 3,
  });
  assert(typeof trust2.trustScore === 'number' && trust2.trustScore > 0, `Trust score computed correctly (${trust2.trustScore})`);

  // 3. priorityEngine Test Cases
  console.log('\n[3/4] Testing priorityEngine...');
  const priority1 = calculatePriority({
    hazardous: true,
    weight: 5,
    daysWaiting: 3,
    locationType: 'Hospital',
  });
  assert(priority1.priority === 'Critical', `Hazardous + Hospital = Critical priority (got ${priority1.priority})`);

  const priority2 = calculatePriority({
    hazardous: false,
    weight: 2,
    daysWaiting: 1,
    locationType: 'Residential',
  });
  assert(priority2.priority === 'Low' || priority2.priority === 'Medium', `Low weight residential priority (got ${priority2.priority})`);

  // 4. explainEngine Test Cases
  console.log('\n[4/4] Testing explainEngine...');
  const explain1 = generateExplanation({
    item: 'Plastic Bottle',
    coins: 30,
    trustScore: 85,
    priority: 'Medium',
  });
  assert(Array.isArray(explain1) && explain1.length > 0, 'Explanation generated array output');

  console.log(`\n========================================`);
  console.log(`Test Summary: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)`);
  console.log(`========================================\n`);

  if (passed === total) {
    console.log('✅ All AI engine unit tests passed successfully!');
  } else {
    process.exit(1);
  }
}

runTests();