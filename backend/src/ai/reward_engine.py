def calculate_reward(data):
    """
    Calculates the reward points based on the item type, condition, and trust score.

    Args:
        data (dict): A dictionary containing the item details.
            - item (str): The type of item.
            - condition (str): The condition of the item.
            - trustScore (int): The trust score of the user.

    Returns:
        dict: A dictionary containing the total reward points and the reasons.
            - coins (int): The total reward points.
            - reasons (list): A list of strings explaining the reward points.
    """
    item_points = {
        "Plastic Bottle": 20,
        "Glass Bottle": 25,
        "Metal Can": 30,
        "Paper": 10,
        "Battery": 50
    }

    item = data["item"]
    condition = data["condition"]
    trust_score = data["trustScore"]

    coins = item_points.get(item, 0)
    reasons = [f"{item}: {coins} points"]

    if condition == "Clean":
        coins += 5
        reasons.append("Clean condition bonus: 5 points")

    if trust_score >= 80:
        coins += 5
        reasons.append("High trust score bonus: 5 points")

    return {"coins": coins, "reasons": reasons}


if __name__ == "__main__":
    test_data = {
        "item": "Plastic Bottle",
        "condition": "Clean",
        "trustScore": 85
    }

    result = calculate_reward(test_data)
    print("\n========== RESULT ==========\n")

    for key, value in result.items():
        if isinstance(value, list):
            print(f"{key}:")
            for item in value:
                print(f"  • {item}")
        else:
            print(f"{key}: {value}")

    print("\n============================")