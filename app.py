# Import necessary modules from Flask
from flask import Flask, render_template, request

# Import your helper functions
from utils.mic_input import capture_chicken_input          # This will simulate microphone input
from utils.cluck_ai import translate_cluck_to_english      # This sends the "cluck" to an AI model and gets a response

# Create a Flask app instance
app = Flask(__name__)

# Home route (GET request only)
@app.route("/", methods=["GET"])
def index():
    # Renders the HTML template for the home page
    # At first, no input or translation is shown (they are set to None)
    return render_template("index.html", cluck_input=None, translation=None)

# Route to handle "Start Microphone" button (POST request)
@app.route("/start-mic", methods=["POST"])
def start_mic():
    # Step 1: Simulate capturing audio (or later, actually record chicken sounds)
    cluck_input = capture_chicken_input()

    # Step 2: Send the audio pattern (or placeholder) to an AI model to translate
    translation = translate_cluck_to_english(cluck_input)

    # Step 3: Render the same HTML template again, but now pass the cluck input and its translation
    return render_template("index.html", cluck_input=cluck_input, translation=translation)

# This runs the Flask app when you run this file directly
if __name__ == "__main__":
    app.run(debug=True)  # debug=True helps during development (auto reloads when you save)
