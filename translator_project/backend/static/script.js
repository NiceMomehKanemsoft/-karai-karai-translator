// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 200);
    });
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
    
    // Add floating animation to icons
    document.querySelectorAll('.bi-translate').forEach(icon => {
        icon.classList.add('floating');
    });
});

function switchLanguages() {
    const karaiToEnglish = document.getElementById('karai_to_english');
    const englishToKarai = document.getElementById('english_to_karai');
    const inputLabel = document.getElementById('inputLabel');
    const inputText = document.getElementById('inputText');
    
    if (karaiToEnglish.checked) {
        englishToKarai.checked = true;
        inputLabel.textContent = 'Enter English Text:';
        inputText.placeholder = 'Type your English text here... (Press Enter to translate)';
    } else {
        karaiToEnglish.checked = true;
        inputLabel.textContent = 'Enter Karai-Karai Text:';
        inputText.placeholder = 'Type your Karai-Karai text here... (Press Enter to translate)';
    }
    
    // Clear previous results
    document.getElementById('result').innerHTML = '';
    document.getElementById('result').classList.remove('show');
}

// Update labels when radio buttons change
document.addEventListener('DOMContentLoaded', function() {
    const radioButtons = document.querySelectorAll('input[name="direction"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            const inputLabel = document.getElementById('inputLabel');
            const inputText = document.getElementById('inputText');
            
            if (this.value === 'karai_to_english') {
                inputLabel.textContent = 'Enter Karai-Karai Text:';
                inputText.placeholder = 'Type your Karai-Karai text here... (Press Enter to translate)';
            } else {
                inputLabel.textContent = 'Enter English Text:';
                inputText.placeholder = 'Type your English text here... (Press Enter to translate)';
            }
            
            // Clear previous results
            document.getElementById('result').innerHTML = '';
            document.getElementById('result').classList.remove('show');
        });
    });
});

async function translateText() {
    const inputText = document.getElementById('inputText').value.trim();
    const resultDiv = document.getElementById('result');
    const translateBtn = document.querySelector('button[onclick="translateText()"]');
    const direction = document.querySelector('input[name="direction"]:checked').value;
    
    if (!inputText) {
        resultDiv.innerHTML = '<div class="alert alert-warning bounce-in"><i class="bi bi-exclamation-triangle me-2"></i>Please enter some text to translate.</div>';
        resultDiv.classList.add('show');
        return;
    }
    
    // Disable button and show loading
    translateBtn.disabled = true;
    translateBtn.innerHTML = '<div class="spinner-border spinner-border-sm me-2" role="status"></div>Translating<span class="loading-dots"></span>';
    
    // Show loading state with animation
    resultDiv.innerHTML = `
        <div class="d-flex align-items-center justify-content-center p-4">
            <div class="spinner-border text-primary me-3" role="status"></div>
            <div>
                <div class="fw-semibold">Processing translation</div>
                <small class="text-muted">Please wait<span class="loading-dots"></span></small>
            </div>
        </div>
    `;
    resultDiv.classList.add('show', 'glow');
    
    try {
        // Add artificial delay for better UX
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                text: inputText,
                direction: direction
            })
        });
        
        const data = await response.json();
        
        // Remove glow effect
        resultDiv.classList.remove('glow');
        
        const fromLang = direction === 'karai_to_english' ? 'Karai-Karai' : 'English';
        const toLang = direction === 'karai_to_english' ? 'English' : 'Karai-Karai';
        
        if (data.translation === 'Translation not found') {
            resultDiv.innerHTML = `
                <div class="alert alert-info mb-0 slide-in-left">
                    <div class="d-flex align-items-center">
                        <i class="bi bi-info-circle me-3 fs-4"></i>
                        <div>
                            <h6 class="mb-1">No translation found</h6>
                            <small>The text "<strong>${inputText}</strong>" is not in our database.</small>
                        </div>
                    </div>
                </div>
            `;
        } else {
            resultDiv.innerHTML = `
                <div class="alert alert-success mb-0 slide-in-right">
                    <div class="d-flex align-items-start">
                        <i class="bi bi-check-circle me-3 fs-4 text-success floating"></i>
                        <div class="flex-grow-1">
                            <h6 class="mb-2">Translation Result:</h6>
                            <div class="fs-5 fw-semibold text-success">${data.translation}</div>
                            <small class="text-muted mt-2 d-block">Translated from ${fromLang} to ${toLang}</small>
                        </div>
                    </div>
                </div>
            `;
        }
    } catch (error) {
        resultDiv.classList.remove('glow');
        resultDiv.innerHTML = `
            <div class="alert alert-danger mb-0 bounce-in">
                <div class="d-flex align-items-center">
                    <i class="bi bi-exclamation-triangle me-3 fs-4"></i>
                    <div>
                        <h6 class="mb-1">Translation Error</h6>
                        <small>Something went wrong. Please try again.</small>
                    </div>
                </div>
            </div>
        `;
    } finally {
        // Re-enable button
        translateBtn.disabled = false;
        translateBtn.innerHTML = '<i class="bi bi-arrow-right-circle me-2"></i>Translate';
    }
}

// Add enter key support for translation
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('inputText');
    if (textarea) {
        textarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                translateText();
            }
        });
    }
});

// Add typing animation effect
function addTypingEffect(element, text, speed = 50) {
    element.innerHTML = '';
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}