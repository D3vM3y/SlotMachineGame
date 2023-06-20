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
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ");
        const depositAmountToNumber = parseFloat(depositAmount);

        if(isNaN(depositAmountToNumber) || depositAmountToNumber <= 0){
            console.log("Invalid deposit amount, try again.");
        }else {
            return depositAmountToNumber;
        }
    }
}

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again");
        }else {
            return numberOfLines;
        }
    }
}

const getBet = (balance) => {
    while(true){
        const bet = prompt("Enter the total bet: ");
        const numberOfBet = parseFloat(bet);

        if(isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance){
            console.log("Invalid bet, try again");
        }else {
            return numberOfBet;
        }
    }
}

let balance = makeDeposit();
const numberOfLines = getNumberOfLines();
const bet = getBet(balance);


