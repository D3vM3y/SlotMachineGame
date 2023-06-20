// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

// implementing the prompt-sync package
const prompt = require("prompt-sync")();

// es6 style function
const makeDeposit = () => {
    const depositAmount = prompt("Enter a deposit amount: ");

    const depositAmountToNumber = parseFloat(depositAmount);

    if(isNaN(depositAmountToNumber) || depositAmountToNumber <= 0){
        console.log("Invalid deposit amount, try again.");
    }
}

makeDeposit();