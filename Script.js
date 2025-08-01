// Cache all relevant DOM elements
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation-select');
const calculateBtn = document.getElementById('calculate-btn');
const resultElement = document.getElementById('result');
const guideMessageElement = document.getElementById('guide-message');
const historyLogElement = document.getElementById('history-log');
const clearHistoryBtn = document.getElementById('clear-history-btn');

// Set the maximum number of items to keep in the history log
const MAX_HISTORY_ITEMS = 10;

// A dictionary to map operation strings to functions and their symbols
const operations = {
    'add': (a, b) => a + b,
    'subtract': (a, b) => a - b,
    'multiply': (a, b) => a * b,
    'divide': (a, b) => {
        if (b === 0) {
            throw new Error("Cannot divide by zero!");
        }
        return a / b;
    }
};

const operationSymbols = {
    'add': '+',
    'subtract': '-',
    'multiply': '*',
    'divide': '/'
};

/**
 * Updates the step-by-step guide message based on user interaction.
 * @param {string} message The message to display in the guide.
 */
function updateGuide(message) {
    guideMessageElement.innerText = message;
}

/**
 * Adds a new calculation to the history log.
 * @param {string} entry The formatted string to add to the log.
 */
function addHistoryItem(entry) {
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    
    // Create a span for the text
    const entryText = document.createElement('span');
    entryText.innerText = entry;

    // Create the "❌" button
    const removeBtn = document.createElement('button');
    removeBtn.innerText = '❌';
    removeBtn.className = 'remove-history-btn';
    
    // Add event listener to the remove button
    removeBtn.addEventListener('click', (e) => {
        e.currentTarget.parentElement.remove();
    });

    // Append the text and button to the history item div
    historyItem.appendChild(entryText);
    historyItem.appendChild(removeBtn);

    historyLogElement.prepend(historyItem);

    // Check if the history log has exceeded the max limit
    if (historyLogElement.children.length > MAX_HISTORY_ITEMS) {
        // Remove the oldest item, which is the last one in the list
        historyLogElement.lastChild.remove();
    }
}

/**
 * Clears all entries from the history log.
 */
function clearHistory() {
    historyLogElement.innerHTML = '';
}

/**
 * Handles the calculation logic and updates the DOM.
 */
function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;

    resultElement.innerText = '';
    resultElement.className = '';
    
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.innerText = "Error: Please enter valid numbers.";
        resultElement.classList.add('error');
        updateGuide("Error: Please go back and enter valid numbers for both fields.");
        return;
    }

    try {
        const result = operations[operation](num1, num2);
        resultElement.innerText = `Result: ${result}`;
        resultElement.classList.add('success');
        updateGuide("Calculation successful! You can now perform another calculation.");
        
        const symbol = operationSymbols[operation];
        const historyEntry = `${num1} ${symbol} ${num2} = ${result}`;
        addHistoryItem(historyEntry);

    } catch (e) {
        resultElement.innerText = `Error: ${e.message}`;
        resultElement.classList.add('error');
        updateGuide("Error: Division by zero is not allowed. Please enter a different number.");
    }
}

// Add event listeners to guide the user
num1Input.addEventListener('input', () => {
    if (num1Input.value !== '') {
        updateGuide("Step 2: Now choose an operation (+, -, *, /).");
    } else {
        updateGuide("Step 1: Enter your first number.");
    }
});

operationSelect.addEventListener('change', () => {
    updateGuide("Step 3: Enter your second number.");
});

num2Input.addEventListener('input', () => {
    if (num2Input.value !== '') {
        updateGuide("Step 4: Click the 'Calculate' button to see the result.");
    } else {
        updateGuide("Step 3: Enter your second number.");
    }
});

calculateBtn.addEventListener('click', calculate);

clearHistoryBtn.addEventListener('click', clearHistory);

updateGuide("Step 1: Enter your first number.");
