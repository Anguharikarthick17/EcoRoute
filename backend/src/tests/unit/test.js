// backend/src/tests/unit/test.js

const {
  calculateReward,
  calculateTrustScore,
  calculatePriority,
  generateExplanation,
} = require('../../ai');

describe('EcoRoute AI Engine Unit Tests', () => {
  describe('[1/4] rewardEngine', () => {
    it('calculates reward for Clean Plastic Bottle with High Trust', () => {
      const reward1 = calculateReward({ item: 'Plastic Bottle', condition: 'Clean', trustScore: 85 });
      expect(reward1.coins).toBe(30);
      expect(reward1.reasons).toContain('Clean Bonus');
    });

    it('calculates reward for Dirty Glass Bottle', () => {
      const reward2 = calculateReward({ item: 'Glass Bottle', condition: 'Dirty', trustScore: 60 });
      expect(reward2.coins).toBe(25);
    });

    it('calculates reward for Clean Paper with High Trust', () => {
      const reward3 = calculateReward({ item: 'Paper', condition: 'Clean', trustScore: 90 });
      expect(reward3.coins).toBe(20);
    });
  });

  describe('[2/4] trustEngine', () => {
    it('clamps high accuracy trust score at 100', () => {
      const trust1 = calculateTrustScore({
        verifiedUploads: 10,
        correctClassifications: 8,
        municipalityApproved: 5,
        spamUploads: 0,
        fakeUploads: 0,
        duplicateUploads: 0,
        consecutiveValidUploads: 7,
      });
      expect(trust1.trustScore).toBe(100);
    });

    it('computes trust score for mixed uploads correctly', () => {
      const trust2 = calculateTrustScore({
        verifiedUploads: 5,
        correctClassifications: 3,
        municipalityApproved: 2,
        spamUploads: 1,
        fakeUploads: 1,
        duplicateUploads: 1,
        consecutiveValidUploads: 3,
      });
      expect(typeof trust2.trustScore).toBe('number');
      expect(trust2.trustScore).toBeGreaterThan(0);
    });
  });

  describe('[3/4] priorityEngine', () => {
    it('assigns Critical priority for hazardous waste at hospital', () => {
      const priority1 = calculatePriority({
        hazardous: true,
        weight: 5,
        daysWaiting: 3,
        locationType: 'Hospital',
      });
      expect(priority1.priority).toBe('Critical');
    });

    it('assigns Low/Medium priority for low weight residential waste', () => {
      const priority2 = calculatePriority({
        hazardous: false,
        weight: 2,
        daysWaiting: 1,
        locationType: 'Residential',
      });
      expect(['Low', 'Medium']).toContain(priority2.priority);
    });
  });

  describe('[4/4] explainEngine', () => {
    it('generates human-readable explanation array output', () => {
      const explain1 = generateExplanation({
        item: 'Plastic Bottle',
        coins: 30,
        trustScore: 85,
        priority: 'Medium',
      });
      expect(Array.isArray(explain1)).toBe(true);
      expect(explain1.length).toBeGreaterThan(0);
    });
  });
});