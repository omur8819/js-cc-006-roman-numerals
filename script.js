const checkButton = document.querySelector("#checkButton");
checkButton.addEventListener("click", check);

const num = document.getElementById("numberPreCheck");

const result = document.getElementById("result");


function check() {
    decimalRoman(num.value)
}

 
// roman numeral
var romanNum = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];

// decimal number
var dNum = [1000,900,500,400,100,90,50,40,10,9,5,4,1];

function decimalRoman(value) {
    
    if (value <= 0 || value >= 3000)
        return alert("Please enter any number between 0-3000");
        var romanNumeral = "";

    for (var i = 0; i<romanNum.length; i++) {
        while (value >= dNum[i]) {
        value -= dNum[i];
        romanNumeral += romanNum[i];
       }
    }
    result.innerHTML = `${num.value} converted as ${romanNumeral}`;
    num.value = "";
    
}

numberPreCheck.addEventListener("keyup", enter);
function enter(event) {
    if (event.keyCode===13){
        check();
    }
};


function findBigger(value){
    
}

