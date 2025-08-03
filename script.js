window.addEventListener('DOMContentLoaded', () => {
    const micButton = document.getElementById('enable-mic');
    const inputTextArea = document.getElementById('input-text');
    const outputTextArea = document.getElementById('output-text');
    const translateButton = document.getElementById('translate-btn');
    const img = document.createElement("img");
    img.src = "images/mic-fill.png";

    // Check for browser support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.warn('Speech Recognition API not supported in this browser.');
        micButton.disabled = true;
        translateButton.disabled = true;
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let isListening = false;

    micButton.addEventListener('click', () => {
        if (!isListening) {
            recognition.start();
            micButton.textContent = 'Listening...';
            isListening = true;
        } else {
            recognition.stop();
            micButton.textContent = '';
            micButton.appendChild(img);
            isListening = false;
        }
    });

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        inputTextArea.value += transcript + ' ';
    });

    recognition.addEventListener('end', () => {
        // Do not automatically stop listening here to keep mic active until button pressed again
        if (isListening) {
            recognition.start();
        }
    });

    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error detected: ' + event.error);
        micButton.textContent = '';
        micButton.appendChild(img);
        isListening = false;
    });

    // Chicken sound translation dictionary (Chicken to English)
    const chickenTranslations = {
        "bok bok": "Hai brooo",
        "cluck cluck": "Give me fooodd broo",
        "bawk bawk": "HUH?",
        "bok": "yes.",
        "cluck": "Nop."
    };

    //To transfrom any sounds into chicken sounds (English to Chicken)
    function translateToChickenSounds(text) {
        const sounds = ["cluck", "bawk", "buk", "coo", "chirp"];
        return text
            .split(" ")
            .map(() => sounds[Math.floor(Math.random() * sounds.length)])
            .join(" ");
    }

    function translate() {
        const inputText = inputTextArea.value.trim().toLowerCase();
        const inputLanguage = document.getElementById('from-language').value;
        const outputLanguage = document.getElementById('to-language').value;

        // Chicken to English translation
        if (inputLanguage === 'es' && outputLanguage === 'en') {
            if (inputText in chickenTranslations) {
                outputTextArea.value = chickenTranslations[inputText];
            } else {
                outputTextArea.value = "Translation not found.";
            }
        } 
        // English to Chicken translation
        else if (inputLanguage === 'en' && outputLanguage === 'es') {
            outputTextArea.value = translateToChickenSounds(inputText);
        }
        // Same language (no translation)
        else if (inputLanguage === outputLanguage) {
            outputTextArea.value = inputText;
        }
        // Unsupported language pair
        else {
            outputTextArea.value = "Unsupported language pair.";
        }
    }

    window.translateToChicken = translate;

    translateButton.addEventListener('click', translate);
});
