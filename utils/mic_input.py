# mic_input.py

import speech_recognition as sr

def capture_chicken_input():
    """
    Record voice from the user's microphone and transcribe it to text.
    This text is treated as a chicken vocalization for the AI to interpret.
    """
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("🎙️ Say something (cluck like a chicken)...")
        try:
            # Listen to mic input for 5 seconds
            audio = recognizer.listen(source, timeout=5)

            # Try to transcribe using Google’s free speech recognition
            transcript = recognizer.recognize_google(audio)
            print(f"[DEBUG] You said: {transcript}")
            return transcript

        except sr.UnknownValueError:
            # Couldn't understand the input
            return "inaudible cluck noises"

        except sr.RequestError:
            # If Google API is unreachable
            return "speech recognition service unavailable"

        except Exception as e:
            return f"[ERROR] {str(e)}"
