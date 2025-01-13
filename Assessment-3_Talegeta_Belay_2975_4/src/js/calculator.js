const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let expression = "";

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if (value === "=") {
            try {
                expression = evaluateExpression(expression);
                display.value = expression;
            } catch {
                expression = "";
                display.value = "Error";
            }
        } else if (value === "C") {
            expression = "";
            display.value = "";
        } else {
            expression += value;
            display.value = expression;
        }
    });
});

function evaluateExpression(expr) {
    if (/[^0-9+\-*/().^]/.test(expr)) {
        throw new Error("Invalid characters detected.");
    }

    expr = expr.replace(/\^/g, '**');

    return new Function('return ' + expr)();
}
