// ================
// Global variables
// ================
var input = document.getElementById( 'input' );
input.value = ""; // The initial state if the input field
var buttons = document.getElementsByClassName( 'btn' );
var numResult, isOperator, currentOperator, currentButton, firstNum, secondNum;
var buttonStyle = document.querySelector('.btn').style;

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

document.querySelector('#input').onkeydown = function (e) { return false; } // no keyboard input allowed

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

		if ( currentButton ) {
			currentButton.style.borderColor = "";
			currentButton.style.color = "";
		}

	} else if ( (/^\+\/-$/).test(currentEl) ) {

		if (input.value[0] != '-')
			input.value = "-" + input.value;

	} else if ( (/√/).test(currentEl) ) {

		if ( input.value[0] != '-' )
			input.value = Math.sqrt(parseFloat(input.value));

	} else if ( (/[\+\-\*\/%\^]/).test(currentEl) ) {

		if ( (input.value || "").length <= 0 ) { 
			clear();
			return false;
		} else {

			this.style.borderColor = "#1abc9c";
			this.style.color = "#1abc84"
			currentButton = this;

			firstNum = (input.value || []).length > 0 ? input.value : firstNum;
			input.value = "";
			currentOperator = currentEl;
			isOperator = true;
		}

	} else if ( (/=/).test(currentEl) ) {

		if ( currentButton ) {
			currentButton.style.borderColor = "";
			currentButton.style.color = "";
		}
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
	}
}