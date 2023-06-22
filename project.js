// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again

// implementing the prompt-sync package
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;
const SYMBOL_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}
const SYMBOL_VALUES = {
    A: 2,
    B: 4,
    C: 6,
    D: 8,
}



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

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet per line: ");
        const numberOfBet = parseFloat(bet);

        if(isNaN(numberOfBet) || numberOfBet <= 0 || numberOfBet > balance / lines){
            console.log("Invalid bet, try again");
        }else {
            return numberOfBet;
        }
    }
}

// review function later on >> see minute 44 >> https://www.youtube.com/watch?v=E3XxeE7NF30
const spin = () => {
    const symbols = [];

    for(const [symbol, count] of Object.entries(SYMBOL_COUNT)){
        // generating an array from all the symbols that can be chose.
        for (let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = []; //temporary array that has all the different reels
    for(let i = 0; i < COLS; i++){ //This loops through all available reels represented by COLS
        reels.push([]); //adding a reel for every COLS that is available for example 1 col = one reel array
        const reelSymbols = [...symbols]; //...symbols copies all the available symbols from the beforehand created symbols array
        for(let j = 0; j < ROWS; j++){ //looping through all the rows in the reel
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); //generate randomIndex by multiplying the length of the reelSymbols array with a random number between 0 and 1. This number is rounded down to the nearest integer by math.floor 
            const selectedSymbol = reelSymbols[randomIndex]; //Adding symbol at randomIndex
            reels[i].push(selectedSymbol); // adding the symbol to the current reel represented by the i
            reelSymbols.splice(randomIndex, 1); // removing symbol from reelsSymbols at randomIndex

        }
    }

    return reels;
}

const transpose = (reels) => {
    const rows = [];

    for(let i=0 ; i < ROWS; i++){
        rows.push([]);
        for(let j=0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

// explain and understand the function >> minute 54:38
const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const[i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length - 1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let equalSymbols = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                equalSymbols = false;
                break;
            }
        }

        if(equalSymbols){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    let balance = makeDeposit();

    while(true) {
        console.log(`You have a balance of $${balance}`);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines);
        balance += winnings;
        console.log(`You won, $${winnings.toString()}`);

        if(balance <= 0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");
        if(playAgain != "y") break; // one line body or one line if statement, I don't have to use brackets
    }
}

game();
