let cookieDiv = document.querySelector(".cookie-policy");

// Event listener for cookie policy button
document.querySelector(".btn").addEventListener("click", () => {
    cookieDiv.remove();
});

// Toggle temperature function with explicit return
const toggleTemperature = (temp, unit) => 
    unit === 'f' ? Math.round(9 / 5 * temp + 32) : Math.round(5 / 9 * (temp - 32));

// Convert temperatures based on unit selected
const convert = (element) => {
    const unit = element.value;
    for (let i = 1; i < 9; i++) {
        const tempSpan = document.querySelector(`#temp${i}`);
        if (tempSpan) {
            const tempVal = parseInt(tempSpan.innerText);
            tempSpan.innerText = toggleTemperature(tempVal, unit); 
        }
    }
};

// Event listener for temperature scale change
document.querySelector("select[name='temperature-scale']").addEventListener("change", function() {
    convert(this);
});
