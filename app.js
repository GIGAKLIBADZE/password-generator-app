const rangeNumber = Array.from(document.getElementsByClassName("filter-length-number"));
const range = document.getElementById("slidering");
const strengthText = document.getElementById("strength");
const generate = document.getElementById("generate");
let generatedPassword = Array.from(document.getElementsByClassName("generated-password"));
const firstCol = Array.from(document.getElementsByClassName("first"));
const secondCol = Array.from(document.getElementsByClassName("second"));
const thirdCol = Array.from(document.getElementsByClassName("third"));
const fourthCol = Array.from(document.getElementsByClassName("fourth"));
const copyText = document.getElementById("copy-text");
const copy = document.getElementById("copy");
const after = Array.from(document.getElementsByClassName("after"));

let rangeValue = 10;
const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "01234567789";
const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
let password = "";
let characters = "";
let checker = false;
let counter = 0;

calc();


function calc() {
    let sliderValue = range.value;
    let percentage = ((sliderValue - range.min) / (range.max - range.min)) * 100;
    range.style.background = `linear-gradient(to right, #a4ffaf ${percentage}%, #18171f ${percentage}%)`;
}

range.addEventListener("input", (event) => {
    rangeValue = event.target.value;
    rangeNumber.forEach((number) => {
        number.innerHTML = rangeValue;
    })

    if (rangeValue === "0") {
        strengthText.textContent = "";
    } else {
        strengthText.textContent = "empty";
    }

    calc();
});

generate.addEventListener("click", (event) => {
    counter = 0
    password = "";
    characters = "";
    firstCol.forEach((c) => {
        c.style.backgroundColor = "#18171f";
        c.style.border = "solid 2px #e6e5ea";
    });
    secondCol.forEach((c) => {
        c.style.backgroundColor = "#18171f";
        c.style.border = "solid 2px #e6e5ea";
    });
    thirdCol.forEach((c) => {
        c.style.backgroundColor = "#18171f";
        c.style.border = "solid 2px #e6e5ea";
    });
    fourthCol.forEach((c) => {
        c.style.backgroundColor = "#18171f";
        c.style.border = "solid 2px #e6e5ea";
    });

    let includeUppercase = document.getElementById("uppercase-checker").checked;
    let includeLowerCase = document.getElementById("lowercase-checker").checked;
    let includeNumbers = document.getElementById("numbers-checker").checked;
    let includeSymbols = document.getElementById("symbols-checker").checked;

    if (includeUppercase) {
        characters += upperCaseLetters; 
        counter +=1;
    }
    if (includeLowerCase) {
        characters += lowerCaseLetters; 
        counter +=1;
    } 
    if (includeNumbers)  {
        characters += numbers; 
        counter +=1;
    }
    if (includeSymbols) {
        characters += symbols; 
        counter +=1;
    }

    for (let i = 0; i < rangeValue; i++) {
        let randomCharIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomCharIndex];
    }

    if (counter > 0) {
        generatedPassword.forEach ((p) => {
            p.innerHTML = `${password}`;
        });
    }

    const colors = ["#f64a4a", "#fb7c58", "#f8cd65", "#a4ffaf"];
    const columns = [firstCol, secondCol, thirdCol, fourthCol];
    const messages = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];

    columns.forEach((col, index) => {
        if (counter > index) {
            col.forEach((c) => {
                c.style.backgroundColor = colors[counter - 1];
                c.style.border = "none";
            });
        }

        strengthText.innerHTML = messages[counter - 1];
    });
});

copy.addEventListener("click", (event) => {
    const textCopy = generatedPassword[0]?.textContent || generatedPassword[0]?.value;

    if (textCopy) {
        navigator.clipboard.writeText(textCopy)
            .then(() => {
                copyText.style.display = "block";
                setTimeout(() => {
                    copyText.style.display = "none";
                }, 2000);
            })
            .catch(err => console.error("Failed to copy text:", err));
    }
});