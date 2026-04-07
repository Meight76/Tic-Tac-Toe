function players(name, symbol, number) {
    let isWinner = false;
return {name, symbol, isWinner, number};
}
// add a function in order to create private functions and variables
let game = (() => {
    let result = null;
    let roundCount = 0;
    let isThereAWinner = false;
    let board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    let player1;
    let player2;

    // use the player object passed as parameter and play the round for him
    // return the next player's turn
    const playTurn = (player) => {
        const answer = prompt(`Player${player.number} where to play ? ([row] [column])`);
        const playSpot = answer.split(" ");
        board[playSpot[0] - 1][playSpot[1] - 1] = player.symbol;

        if (player.number === 1) {
            return player2;
        } else {
            return player1;
        }
    };

    const displayBoard = () => {
        for (const row of board) {
            console.log(`|${row.join("|")}|`);
        }
    }

    const gameResult = () => {

    };

    const finishGame = () => {

    };

    const playGame = () => {
        if (player1 === undefined || player1 === null) {
            player1 = players(prompt("Player 1 Name:"), "X", 1);
            player2 = players(prompt("Player 2 Name:"), "O", 2);
        }
        let currentPlayerTurn = player1;


        while (!isThereAWinner) {
            currentPlayerTurn = playTurn(currentPlayerTurn);

            if (roundCount >= 3) {

                if (gameResult()) {
                    finishGame();
                }
            }
        }
    }
    return {playGame, result, displayBoard};
})();
// first i'll get the user input from console
// in other words one player's turn at a time

// then i'll computate the gameboard into an array
// that where i'm saving and updating

// after the third round i must start checking for a winner
// i shall check all rows
