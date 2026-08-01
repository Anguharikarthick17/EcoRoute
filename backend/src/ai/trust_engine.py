def calculate_trust_score(data):
    """
    Calculates the trust score based on various factors.

    Args:
        data (dict): A dictionary containing the user's upload history.
            - verifiedUploads (int): Number of verified uploads.
            - correctClassifications (int): Number of correct classifications.
            - municipalityApproved (int): Number of municipality-approved uploads.
            - spamUploads (int): Number of spam uploads.
            - fakeUploads (int): Number of fake uploads.
            - duplicateUploads (int): Number of duplicate uploads.
            - consecutiveValidUploads (int): Number of consecutive valid uploads.

    Returns:
        dict: A dictionary containing the trust score and the reasons.
            - trustScore (int): The calculated trust score.
            - reasons (list): A list of strings explaining the score calculation.
    """
    score = 50
    reasons = ["Initial score: 50"]

    verified_uploads_score = data["verifiedUploads"] * 3
    score += verified_uploads_score
    reasons.append(f"Verified uploads: {verified_uploads_score} points")

    correct_classifications_score = data["correctClassifications"] * 2
    score += correct_classifications_score
    reasons.append(f"Correct classifications: {correct_classifications_score} points")

    municipality_approved_score = data["municipalityApproved"] * 5
    score += municipality_approved_score
    reasons.append(f"Municipality-approved uploads: {municipality_approved_score} points")

    spam_uploads_score = data["spamUploads"] * -8
    score += spam_uploads_score
    reasons.append(f"Spam uploads: {spam_uploads_score} points")

    fake_uploads_score = data["fakeUploads"] * -10
    score += fake_uploads_score
    reasons.append(f"Fake uploads: {fake_uploads_score} points")

    duplicate_uploads_score = data["duplicateUploads"] * -5
    score += duplicate_uploads_score
    reasons.append(f"Duplicate uploads: {duplicate_uploads_score} points")

    if data["consecutiveValidUploads"] >= 5:
        score += 5
        reasons.append("Consecutive valid uploads bonus: 5 points")

    score = max(0, min(100, score))
    reasons.append(f"Final score clamped between 0 and 100: {score}")

    return {"trustScore": score, "reasons": reasons}


if __name__ == "__main__":
    test_data = {
        "verifiedUploads": 10,
        "correctClassifications": 8,
        "municipalityApproved": 5,
        "spamUploads": 2,
        "fakeUploads": 1,
        "duplicateUploads": 3,
        "consecutiveValidUploads": 6
    }

    result = calculate_trust_score(test_data)
    print("\n========== RESULT ==========\n")

    for key, value in result.items():
        if isinstance(value, list):
            print(f"{key}:")
            for item in value:
                print(f"  • {item}")
        else:
            print(f"{key}: {value}")

    print("\n============================")