import './style.css'

//PASSWORD SPECIFICS
const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?",
"/"];
const noDigits = characters.filter((ele, index, array)=>{
    let regex = /\d/g
    if(!regex.test(ele)){
        return ele
    }
})
const noSymbols = characters.filter((ele, index, array)=>{
    let regex = /\w/g
    if(regex.test(ele)){
        return ele
    }
})

const alphabetOnly = characters.filter((ele, index, array)=>{
    let regex = /[A-Za-z]/g
    if(regex.test(ele)){
        return ele
    }
})

let passwordOne;
let passwordTwo;
let passwordSize = null;
let useNumbers = false;
let useSymbols = false;

//SLIDER SPECFICS
let sliderCheckEl = document.getElementById('--app-mode-checkbox');
let sliderTextEl = document.getElementById('slider-text')
let sliderText = {
    darkMode:false
}

//INPUT SPECIFICS
let generateBtn = document.getElementById('--content-btn');
let passwordEl1 = document.getElementById('passwordGen1');
let passwordEl2 = document.getElementById('passwordGen2');
let passwordLengthEl = document.getElementById('--form-quantity');
let numbersCheckboxEl = document.getElementById('--form-numbers');
let symbolsCheckboxEl = document.getElementById('--form-symbols');

function  cssToggle(mode){
    console.log('entered cssToggle')
    let contentContainerEl = document.getElementById('--app-content-container');
    let titleEl = document.getElementById('--content-title-first');
    let taglineEl = document.getElementById('--content-tagline-text');
    let passwordGen1El = document.getElementById('passwordGen1');
    let passwordGen2El = document.getElementById('passwordGen2');

    if(mode === 'light'){
        contentContainerEl.classList.remove('content-background-dark');
        contentContainerEl.classList.add('content-background-light');
        titleEl.classList.remove('title-text-dark');
        titleEl.classList.add('title-text-light');
        taglineEl.classList.remove('tagline-text-dark');
        taglineEl.classList.add('tagline-text-light');
        passwordGen1El.classList.remove('input-dark')
        passwordGen1El.classList.add('input-light')
        passwordGen2El.classList.remove('input-dark')
        passwordGen2El.classList.add('input-light')
        
    } else {
        contentContainerEl.classList.remove('content-background-light');
        contentContainerEl.classList.add('content-background-dark');
        titleEl.classList.remove('title-text-light');
        titleEl.classList.add('title-text-dark');
        taglineEl.classList.remove('tagline-text-light');
        taglineEl.classList.add('tagline-text-dark');
        passwordGen1El.classList.remove('input-light')
        passwordGen1El.classList.add('input-dark')
        passwordGen2El.classList.remove('input-light')
        passwordGen2El.classList.add('input-dark')
    }
}

function generatePasswords(){
    passwordOne = pullChars()
    passwordTwo = pullChars()

    updateDOM()
}

function updateDOM(){
    passwordEl1.setAttribute('value', passwordOne);
    passwordEl2.setAttribute('value', passwordTwo);
}

function pullChars(){
    console.log(`N: ${useNumbers} S: ${useSymbols}`)
    if(useNumbers && useSymbols){
        return loopThroughArr(characters)
    } else if (useNumbers && !useSymbols){
        return loopThroughArr(noSymbols);
    } else if (!useNumbers && useSymbols){
       return  loopThroughArr(noDigits)
    } else {
        return loopThroughArr(alphabetOnly)
    }
    
}

function loopThroughArr(arr){
    let currLength = passwordSize === null ? 16 : passwordSize;
    let tempPass = ''
    for(let i = 0; i<currLength; i++){
        // console.log(arr)
        let nextChar = getRandomChar(arr, getRandomNum(arr))
        tempPass += nextChar;
    }
    return tempPass;
}

function getRandomChar(arr, num){
    // console.log(arr)
    // console.log(`N: ${num}`)
    return arr[num]
}

function getRandomNum(arr){
    let rand = Math.floor(Math.random() * arr.length)
    return rand;
}

function handleToggle(){
    if(sliderText.darkMode){
        sliderText.darkMode = !sliderText.darkMode;
        sliderTextEl.textContent = 'Light'
        cssToggle('light')
    } else {
        sliderText.darkMode = !sliderText.darkMode;
        sliderTextEl.textContent = 'Dark'
        cssToggle("dark")
    }
}

function setPasswordLength(ev){
    passwordSize = ev.target.value;
}

function setNumbers(ev){
    useNumbers = ev.target.checked;
}

function setSymbols(ev){
    useSymbols = ev.target.checked;
}

function copyToClipboard(ev){
    console.log(ev.target.id)
    let clipping = document.getElementById(ev.target.id)

    clipping.select()
    clipping.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(clipping.value);

    alert("Copied the text: " + clipping.value);
}

sliderCheckEl.addEventListener('click', handleToggle);
generateBtn.addEventListener('click', generatePasswords);
passwordLengthEl.addEventListener('change', setPasswordLength);
numbersCheckboxEl.addEventListener('click', setNumbers);
symbolsCheckboxEl.addEventListener('click', setSymbols);
passwordEl1.addEventListener('click', copyToClipboard);
passwordEl2.addEventListener('click', copyToClipboard);