# How to build a Calculator using HTML, CSS, and Javascript?

## Table of Contents

- [How to build a Calculator using HTML, CSS, and Javascript?](#how-to-build-a-calculator-using-html-css-and-javascript)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Final Result](#final-result)
  - [Let's start building Calculator](#lets-start-building-calculator)
    - [Creating an HTML document](#creating-an-html-document)
    - [Adding CSS](#adding-css)
    - [Now we will add Javascript](#now-we-will-add-javascript)
      - [Now, we have to deal with calculations](#now-we-have-to-deal-with-calculations)
      - [Thing to keep in mind while using eval](#thing-to-keep-in-mind-while-using-eval)
      - [Improving User Interface](#improving-user-interface)
  - [Conclusion](#conclusion)

## Introduction

In this article, we will learn about building a Calculator using HTML, CSS, and Javascript. By building the calculator we will learn to use CSS grid and javascript function `eval()`. We will build Simple Calculator with some simple operators like +, -, *, and /.

## Final Result

[Live Site](https://keshavkumarhembram.github.io/3-calculator/)

[Github Repo](https://github.com/keshavkumarhembram/3-calculator)


![Final Result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5pz0i1cq5zah6ai8vzr1.png)

## Let's start building Calculator

### Creating an HTML document

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style/style.css" />
    <title>Calculator using HTML, CSS and Javascript</title>
</head>
<body>
    <h1>Calculator</h1>
    <div class="calc-container">
      <div class="screen"><p></p></div>
      <input type="button" value="+" class="keys operators" />
      <input type="button" value="-" class="keys operators" />
      <input type="button" value="x" class="keys operators" />
      <input type="button" value="/" class="keys operators" />
      <input type="button" value="7" class="keys" />
      <input type="button" value="8" class="keys" />
      <input type="button" value="9" class="keys" />
      <input type="button" value="=" class="keys equal" />
      <input type="button" value="4" class="keys" />
      <input type="button" value="5" class="keys" />
      <input type="button" value="6" class="keys" />
      <input type="button" value="1" class="keys" />
      <input type="button" value="2" class="keys" />
      <input type="button" value="3" class="keys" />
      <input type="button" value="0" class="keys" />
      <input type="button" value="." class="keys" />
      <input type="button" value="C" class="keys clear" />
    </div>
    <script src="./script/index.js"></script>
</body>
</html>
```

- I have added style and script in HTML but both files are empty so the current result looks like this.


![Result without adding any CSS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/40r0uq3r6mk6ki8q6njf.png)

### Adding CSS
- **We will be adding CSS first so that we can work with a more convenient calculator layout**

```css
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 700;
    background-color: rgb(116, 230, 230);
}

h1 {
  color: white;
}


.calc-container {
  width: 400px;
    display: grid;
    grid-template-columns: 100px 100px 100px 100px;
    grid-template-rows: 100px 70px 70px 70px 70px 70px;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 700;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 2px 12px 0px rgb(122, 122, 122);
    background-color: black;
  }
  
  input {
    background-color: white;
    border: 1px solid rgb(185, 185, 185);
    font-size: inherit;
  }

  input:hover {
    background-color: rgb(237, 237, 238);
  }

  .operators {
    background-color: rgb(223, 222, 222);
  }
  
  .screen {
    display: flex;
    align-items: center;
    justify-content: end;
  
    grid-column: 1/5;
    height: 100px;
    font-size: 35px;
    padding: 0px 20px;
  
    color: white;
    background-color: rgb(0, 31, 39);
  }
  
  .equal {
    grid-column: 4/5;
    grid-row: 3/7;
    background: rgb(226, 110, 74);
  }

  .equal:hover {
    background-color: rgb(224, 90, 49);
  }

  .clear {
    font-weight: 700;
    color:rgb(226, 110, 74);
  }

  .clear:hover {
    background-color: rgb(231, 229, 229);
    color: black;
  }
```

![Result after adding CSS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7lczvmsp7k3ebj436plu.png)

### Now we will add Javascript

- **First let's get elements from DOM which will change or from where we get input.**

```js
// SELECTING ELEMENTS FROM DOM
const keys = document.querySelectorAll(`.keys`);
let output = document.querySelector(".screen").children[0];
```

- **Now we have to listen to all keys for all click events for input.**

- currently `keys` is an object with a list of nodes having class `.keys`

- we will change that to Array using `Array.from(keys)`. This will return an Array of this `keys` object.

- Then we will run `forEach()` loop for this array and for each key we listen to the key and log in to the console to see the output.

```js
Array.from(keys).forEach((keys) => {
  keys.addEventListener("click", (event) => {
    console.log(event.target.value);
  });
});
```

![Confirming events](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/b5mgrihvqz232029jnsv.png)

- We are getting all the events

#### Now, we have to deal with calculations
- I have used `eval` in-built function. Which will evaluate the string
- There are a few cases which we have to handle with if-else statements.
  1. `C` - for clearing the screen.
  2. `x` - that needs to be converted to `*` first
  3. `=` - for evaluating
  4. else we have to add input to the expression string

```js
// VARIABLE FOR CALCULATOR
let expString = "";
let outputStr = "";

// SELECTING ELEMENTS FROM DOM
const keys = document.querySelectorAll(`.keys`);
let output = document.querySelector(".screen").children[0];

// HANDLING KEYS CLICK EVENT USING ARRAY METHOD
Array.from(keys).forEach((key) => {
  key.addEventListener("click", (event) => {
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
        expString = eval(expString);
      } catch (err) {
        // handling errors
        expString = "invalid input";
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
```
- After adding this calculator should work fine.

#### Thing to keep in mind while using eval
- **We need to validate the string before evaluation.**

- **Why we should validate?**
  - It is always a good practice to add validation before using `eval()` function. If we don't add validation it can result in security issues.
  - Reason for security issues is that evaluate not only evaluates mathematical expressions but it can also run code or commands.

  - For more details use this reference: [JavaScript eval security best practices](https://www.codiga.io/blog/javascript-eval-best-practices/)

- **Let's add validation**
  - For that, we will use regular expression and `test()` function 
- Since this is just a front-end project and we restrict input using predefined values. So, it can't cause any issues but still, we should use that.

```js
const validInputStr = /^[0-9+\-*/. ]*$/;
if(!validInputStr.test(expString)) {
  throw new Error("invalid input");
}
```
#### Improving User Interface
- **If we click equal without any string, it will give `undefined` output, which must be handled.**
- For handling that we will throw an error in the try block so that the catch block will catch error that error.

- We will throw that error if we get undefined after evaluation.

```js
// handling undefined case
if (expString === undefined) {
throw new Error("invalid input");
}
```

- **If we click equal with an invalid string like `+`.It will give output as `invalid input`.Then click new input it will be added to that `invalid input`.**

![Invalid input error](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7sxbz5z08359e8bkacrf.png)

- This is not good for our users we have to handle this. We will do that using a flag. We will clear the string before adding a new character to the string if that flag is `false`.
- I have the variable `validInput` for that.

###Final JS Code
```js
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
```
## Conclusion

It's a great project to learn javascript, eval() function, and handling error. It is also good for learning grid.

There are some suggestions that I want to recommend for your project that you can do in your project. You can also change that in my repository. I will be happy to merge those changes.
- adding the `backspace` key
- instead of creating your own error message use the error provided by try block.

**If you enjoyed it reading. If any changes you want. Please comment on this blog.**