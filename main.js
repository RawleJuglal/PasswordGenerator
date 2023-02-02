import './style.css'

let sliderCheckEl = document.getElementById('--app-mode-checkbox');
let sliderTextEl = document.getElementById('slider-text')
let sliderText = {
    darkMode:false
}
function handleToggle(){
    if(sliderText.darkMode){
        sliderText.darkMode = !sliderText.darkMode;
        sliderTextEl.textContent = 'Light'
    } else {
        sliderText.darkMode = !sliderText.darkMode;
        sliderTextEl.textContent = 'Dark'
    }
}

sliderCheckEl.addEventListener('click', handleToggle)