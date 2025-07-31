// A dictionary to map operation strings to functions
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

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultElement = document.getElementById('result');

    // Clear previous results or errors
    resultElement.innerText = '';
    
    // Check for invalid numbers first
    if (isNaN(num1) || isNaN(num2)) {
        resultElement.innerText = "Error: Please enter valid numbers.";
        return;
    }

    try {
        const result = operations[operation](num1, num2);
        resultElement.innerText = `Result: ${result}`;
    } catch (e) {
        resultElement.innerText = `Error: ${e.message}`;
    }
}
