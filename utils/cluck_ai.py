import openai

openai.api_key = "your-key-here"

def translate_cluck_to_english(cluck_input):
    """
    Send the chicken vocalization to GPT and get a Henspeak-based English translation.
    """
    prompt = f"""
You are a linguistic AI who has invented a fictional chicken language called Henspeak.

Henspeak is made of onomatopoeic sounds like 'bwak', 'skrree', 'bruk-bruk', and has a loose structure. 
Each sentence in Henspeak conveys emotions, needs, or social messages from chickens.

Translate the following chicken vocalization into Henspeak, then explain what it likely means in English.

Chicken input: "{cluck_input}"
"""

    # Send the prompt to OpenAI and get the response
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    # Extract the text from the response
    return response["choices"][0]["message"]["content"]
