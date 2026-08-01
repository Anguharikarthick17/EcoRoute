def calculate_priority(data):
    """
    Calculates the priority score and priority level based on various factors.

    Args:
        data (dict): A dictionary containing the priority factors.
            - hazardous (bool): Whether the item is hazardous.
            - weight (float): The weight of the item.
            - daysWaiting (int): The number of days the item has been waiting.
            - locationType (str): The type of location (Hospital, School, Residential, Market).

    Returns:
        dict: A dictionary containing the priority score, priority level, and reasons.
            - score (int): The calculated priority score.
            - priority (str): The priority level (Low, Medium, High, Critical).
            - reasons (list): A list of strings explaining the score calculation.
    """
    score = 0
    reasons = []

    if data["hazardous"]:
        score += 40
        reasons.append("Hazardous item: +40 points")

    weight_score = data["weight"] * 2
    score += weight_score
    reasons.append(f"Weight: {weight_score} points")

    waiting_score = data["daysWaiting"] * 5
    score += waiting_score
    reasons.append(f"Days waiting: {waiting_score} points")

    if data["locationType"] == "Hospital":
        score += 30
        reasons.append("Location type (Hospital): +30 points")
    elif data["locationType"] == "School":
        score += 20
        reasons.append("Location type (School): +20 points")
    elif data["locationType"] == "Residential":
        score += 10
        reasons.append("Location type (Residential): +10 points")
    elif data["locationType"] == "Market":
        score += 15
        reasons.append("Location type (Market): +15 points")

    if score >= 91:
        priority = "Critical"
    elif score >= 61:
        priority = "High"
    elif score >= 31:
        priority = "Medium"
    else:
        priority = "Low"

    return {"score": score, "priority": priority, "reasons": reasons}


if __name__ == "__main__":
    test_data = {
        "hazardous": True,
        "weight": 5.5,
        "daysWaiting": 3,
        "locationType": "Hospital"
    }

    result = calculate_priority(test_data)
    print("\n========== RESULT ==========\n")

    for key, value in result.items():
        if isinstance(value, list):
            print(f"{key}:")
            for item in value:
                print(f"  • {item}")
        else:
            print(f"{key}: {value}")

    print("\n============================")