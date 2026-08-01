def generate_explanation(data):
    """
    Generates a list of user-friendly messages based on the provided data.

    Args:
        data (dict): A dictionary containing the data for explanation.
            - item (str): The detected item.
            - coins (int): The number of EcoCoins earned.
            - trustScore (int): The user's trust score.
            - priority (str): The pickup priority.

    Returns:
        list: A list of user-friendly messages.
    """
    explanation = []

    item_message = f"{data['item']} detected."
    explanation.append(item_message)

    coins_message = f"You earned {data['coins']} EcoCoins."
    explanation.append(coins_message)

    trust_score_message = f"Your Trust Score is {data['trustScore']}."
    explanation.append(trust_score_message)

    priority_message = f"Pickup Priority: {data['priority']}."
    explanation.append(priority_message)

    return explanation


if _name_ == "_main_":
    test_data = {
        "item": "Plastic Bottle",
        "coins": 30,
        "trustScore": 82,
        "priority": "Medium"
    }

    result = generate_explanation(test_data)
    for message in result:
        print(message)