function players(name, symbol, number) {
    let isWinner = false;
return {name, symbol, isWinner, number};
}
// add a function in order to create private functions and variables
let game = (() => {
    // the scores for all games
    let scores = [0, 0];
    // who won the last game
    let result = "none";

    let currentPlayerTurn;
    // count round for game
    let roundCount = 0;
    // a winner for current game, it's being updated in gameResult
    let isGameOver = false;
    // the board the will be updated in almost all functions
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
    // declaring players here so they become global to the function
    let player1;
    let player2;

    // use the player object passed as parameter and play the round for him
    // return the next player's turn
    const playTurn = (player) => {
        let validAnswer = false;
        // a variable that has the current position to mark in the round
        let playSpot;
        // keep prompting the player while answer is not valid
        // valid i mean valid position index and the space indexed is free
        // for validation i use a helper function
        while (!validAnswer) {
            const answer = prompt(`Player${player.number} where to play ? ([row] [column])`);
            // turn prompt into an array of two indexes (hopefully!), they are string (remember!)
            playSpot = answer.split(" ");
            // call the helper function for validation
            validAnswer = validatePrompt(Number(playSpot[0]), Number(playSpot[1]));
        }
        function validatePrompt(rowIndex, columnIndex) {
            // if it's not a whole number;
            // make sure to not index out of array;
            // make sure space is free
            if (!Number.isInteger(rowIndex) || !Number.isInteger(columnIndex)) {
                return false;
            } else if (rowIndex > 3 || rowIndex < 1 ||columnIndex > 3 || columnIndex < 1) {
                return false;
                } else if (board[rowIndex - 1][columnIndex - 1] === "X" || board[rowIndex - 1][columnIndex - 1] === "O") {
                    return false;
                }
                // every thing else being false it return true
                return true;
            }
        // after validation i mark the position with player symbol
        board[playSpot[0] - 1][playSpot[1] - 1] = player.symbol;
        roundCount++;

        // returns the oppositive player as the next player turn
        if (player.number === 1) {
            return player2;
        } else {
            return player1;
        }
    };

    // pretty straight forward i think
    const displayBoard = () => {
        for (const row of board) {
            console.log(`|${row.join("|")}|`);
        }
    }

    const forgetPlayers = () => {
        player1 = null;
        player2 = null;
    }

    const displayScores = () => {
        console.log(`(scores) player 1: ${scores[0]} player 2: ${scores[1]}`);
    }
    // must return true for indicating that has a winner
    // also set the current player winner property .isWinner as true
    const gameResult = () => {
        if (checkRows(player1, board) || checkRows(player2, board)) {
            isGameOver = true;
            return true;
        } else if (checkColumns(player1) || checkColumns(player2)) {
            isGameOver = true;
            return true;
        } else if (checkDiagonals(player1) || checkDiagonals(player2)) {
            isGameOver = true;
            return true;
        }

        function checkRows(player, gameBoard) {
            for (const row of gameBoard) {
                if (row.every(position => position === player.symbol)){
                    player.isWinner = true;
                    return true;
                }
            }
        }
        function checkColumns(player) {
            // transpose an array for columns instead of rows
            // make the quantity of elements in gameboard the number of columns in board
            // because there's two MAPs differents working it does iterate multiple times through the same line
            // and get just the value of value of i
            const gameBoard = board[0].map((_, i) => board.map(element => element[i]));
            return checkRows(player, gameBoard);
        }
        function checkDiagonals(player) {
            const diagonalBoard = [];
            diagonalBoard.push(new Array());
            diagonalBoard.push(new Array());
            diagonalBoard[0].push(board[0][0], board[1][1], board[2][2]);
            diagonalBoard[1].push(board[0][2], board[1][1], board[2][0]);
            return checkRows(player, diagonalBoard);
        }
    };

    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let y = 0; y < board[i].length; y++) {
                board[i][y] = " ";
            }
        }
    };

    const clearWinner = () => {
        player1.isWinner = false;
        player2.isWinner = false;
    }

    const getBoard = () => {
        return board.map(row => row.slice());
    }

    // does return result as "tie" or player object of the winner
    // clean all the game info for a next game
    // allow user to quit game
    const finishGame = (tie) => {
        if (tie) {
            result = "tie";
        }
        else if (player1.isWinner) {
            scores[0]++;
            result = player1;
        } else {
            scores[1]++;
            result = player2;
        }
        if (confirm("Do you want to continue to play ?")) {
            isGameOver = false;
            clearBoard()
            clearWinner();
            roundCount = 0;
            return;
        }
        displayScores();
        clearBoard();
        clearWinner();
        currentPlayerTurn = player1;
        roundCount = 0;
    };

    const playGame = () => {
        if (player1 === undefined || player1 === null) {
            player1 = players(prompt("Player 1 Name:"), "X", 1);
            player2 = players(prompt("Player 2 Name:"), "O", 2);
        }
        currentPlayerTurn = player1;


        while (!isGameOver) {
            currentPlayerTurn = playTurn(currentPlayerTurn);
            displayBoard();

            if (roundCount >= 3) {

                if (gameResult()) {
                    finishGame();
                    continue;
                } else if (roundCount === 9) {
                    finishGame(true);
                    continue;
                }

            }
        }
    }
    const getScores = () => {
        return scores.slice();
    }
    const getResult = () => {
        return result;
    }
    return {playGame, displayBoard, getScores, displayScores, getResult, clearBoard, forgetPlayers, getBoard};
})();
