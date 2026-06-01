const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const resultText = document.getElementById("resultText");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swapBtn");

const API_URL = "https://open.er-api.com/v6/latest/USD";

async function loadCurrencies() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {

            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = currency;
            option2.textContent = currency;
            toCurrency.appendChild(option2);

        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";

    } catch (error) {
        resultText.textContent = "Failed to load currencies.";
    }
}

async function convertCurrency() {

    const amountValue = parseFloat(amount.value);

    if (amountValue <= 0 || isNaN(amountValue)) {
        resultText.textContent = "Please enter a valid amount.";
        return;
    }

    resultText.textContent = "Converting...";

    try {

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${fromCurrency.value}`
        );

        const data = await response.json();

        const rate = data.rates[toCurrency.value];

        const convertedAmount = (amountValue * rate).toFixed(2);

        resultText.innerHTML = `
            ${amountValue} ${fromCurrency.value}
            = <br>
            <strong>${convertedAmount} ${toCurrency.value}</strong>
        `;

    } catch (error) {

        resultText.textContent =
            "Error fetching exchange rates. Try again later.";

    }
}

swapBtn.addEventListener("click", () => {

    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();

});

convertBtn.addEventListener("click", convertCurrency);

loadCurrencies();
