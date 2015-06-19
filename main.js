// ================
// Global variables
// ================
var input = document.getElementById( 'input' );
input.value = "";
var buttons = document.getElementsByClassName( 'btn' );
var numResult, isOperator, currentOperator, firstNum, secondNum;

// Clear the input field
function clear() {
	input.value = "";
	isOperator = false;
	currentOperator = null;
	numResult = null;
}

// =========================================
// Add event listeners for all body elements
// =========================================
for(var i = 0; i < buttons.length; ++i) {
	buttons[i].addEventListener( 'click', calculate, false );
}

document.querySelector('#input').onkeydown = function (e) { return false; }

// ==============================
// Event handler for click events
// writes to the input field.
// Calculates the results.
// ==============================
function calculate() {

	currentEl = this.innerHTML; // In that case `this` equals to the pressed button element.

	if ( currentEl == 'C' || currentEl == 'CE' ) clear();

	if ( (/\d|\./).test(currentEl) && !(/[\+\-\*\/%\^]/).test(currentEl) ) {

		input.value += ( currentEl == "." && ( input.value.match(/\./g) || []).length > 0 )
						? "" : currentEl;

	} else if ( (/^\+\/-$/).test(currentEl) ) {

		if(input.value[0] != '-')
			input.value = "-" + input.value;

	} else if ( (/[\+\-\*\/%\^]/).test(currentEl) ) {

		if ( (input.value || "").length <= 0 ) { 
			clear();
			return false;
		};

		firstNum = input.value;
		input.value = "";
		currentOperator = currentEl;
		isOperator = true;


	} else if ( (/=/).test(currentEl) ) {

		secondNum = input.value;

		switch (currentOperator) {

			case "*":
				numResult = parseFloat(firstNum) * parseFloat(secondNum);
				break;

			case "/":
				if (secondNum == 0) clear();
				numResult = parseFloat(firstNum) / parseFloat(secondNum);
				break;

			case "-":
				numResult = parseFloat(firstNum) - parseFloat(secondNum);
				break;

			case "+":
				numResult = parseFloat(firstNum) + parseFloat(secondNum);
				break;

			case "%":
				numResult = parseFloat(firstNum) % parseFloat(secondNum);
				break;

			case "^":
				numResult = Math.pow(parseFloat(firstNum), parseFloat(secondNum));
				break;
		}

		isOperator = false;
		currentOperator = null;
		firstNum = numResult;
		input.value = numResult;
		console.log(numResult);
	}
}