// VARIABLE FOR CALCULATOR
let expString = "";
let outputStr = "";
let validInput = true;

// SELECTING ELEMENTS FROM DOM
const keys = document.querySelectorAll(`.keys`);
let output = document.querySelector(".screen").children[0];

// HANDLING KEYS CLICK EVENT USING ARRAY METHOD
Array.from(keys).forEach((key) => {
  key.addEventListener("click", (event) => {
    // HANDLING INVALID INPUT
    if (validInput === false) {
      expString = "";
      outputStr = "";
      validInput = true;
    }

    if (event.target.value == "C") {
      // CLEAR STRING AND SCREEN
      expString = "";
      outputStr = "";
    } else if (event.target.value == "x") {
      // HANDLING x CASE
      expString = expString + "*";
      outputStr = outputStr + "x";
    } else if (event.target.value == "=") {
      // EVALUATION OF EXPRESSION STRING
      try {
        const validInputStr = /^[0-9+\-*/. ]*$/;
        if (!validInputStr.test(expString)) {
          throw new Error("invalid input");
        }
        expString = eval(expString);

        // handling undefined case
        if (expString === undefined) {
          throw new Error("invalid input");
        }
      } catch (err) {
        // handling errors
        expString = "invalid input";
        validInput = false;
      }
      outputStr = expString;
    } else {
      // GENERATING EXPRESSION STRING AND SCREEN OUTPUT
      expString = expString + event.target.value;
      outputStr = outputStr + event.target.value;
    }

    // OUTPUT TO THE SCREEN
    output.innerHTML = outputStr;
  });
});

