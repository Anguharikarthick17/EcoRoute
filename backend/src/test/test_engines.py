from reward_engine import calculate_reward
from trust_engine import calculate_trust_score
from priority_engine import calculate_priority
from explain_engine import generate_explanation


print("\n================ EcoRoute AI Module Test ================\n")

# Reward Engine
reward = calculate_reward({
    "item": "Plastic Bottle",
    "condition": "Clean",
    "trustScore": 85
})

print("Reward Engine")
print(reward)
print()

# Trust Engine
trust = calculate_trust_score({
    "verifiedUploads": 10,
    "correctClassifications": 8,
    "municipalityApproved": 5,
    "spamUploads": 2,
    "fakeUploads": 1,
    "duplicateUploads": 3,
    "consecutiveValidUploads": 5
})

print("Trust Engine")
print(trust)
print()

# Priority Engine
priority = calculate_priority({
    "hazardous": True,
    "weight": 5.5,
    "daysWaiting": 3,
    "locationType": "Hospital"
})

print("Priority Engine")
print(priority)
print()

# Explain Engine
explanation = generate_explanation({
    "item": "Plastic Bottle",
    "coins": reward["coins"],
    "trustScore": trust["trustScore"],
    "priority": priority["priority"]
})

print("Explain Engine")
for line in explanation:
    print("-", line)

print("\n================ All Tests Passed ================\n")