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
    // you must pass the position to play in its arguments
    const playTurn = (player, answerArray) => {

        board[answerArray[0] - 1][answerArray[1] - 1] = player.symbol;
        roundCount++;

        // returns the oppositive player as the next player turn
        if (player.number === 1) {
            currentPlayerTurn = player2;
        } else {
            currentPlayerTurn =  player1;
        }
    };

    function validateInput(rowIndex, columnIndex) {
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
    const finishGame = (tie, isRestart) => {
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
        if (!isRestart) {
            graphicUserInterface.callWinnerModal();
        }
        displayScores();
        clearBoard();
        clearWinner();
        currentPlayerTurn = player1;
        roundCount = 0;
    };

    const initiatePlayers = (input1, input2) => {
        if (player1 === undefined || player1 === null) {
            player1 = players(input1.value, "X", 1);
            player2 = players(input2.value, "O", 2);
        }
        currentPlayerTurn = player1;
    }

    const restartScores = () => {
        scores = [0, 0];
    }

    const getRoundCount = () => {
        return roundCount;
    }
    const getScores = () => {
        return scores.slice();
    }
    const getResult = () => {
        return result;
    }
    const getCurrentTurn = () => {
        return currentPlayerTurn;
    }
    return {gameResult, restartScores,getRoundCount,finishGame, clearBoard, initiatePlayers, getCurrentTurn, displayBoard, getScores, displayScores, getResult, clearBoard, forgetPlayers, getBoard, playTurn, validateInput};
})();

let graphicUserInterface = (() => {
    const boarderInterface = document.querySelector(".game-boarder");
    const winnerDialog = document.querySelector("#winner-result");
    const winnerDialogShowWinner = document.querySelector(".player-winner");
    const winnerDialogContinueButton = document.querySelector("#dialog-continue-button");
    const dialog = document.querySelector("#players-set");
    const confirmStartButton = document.querySelector(".confirm-players-set");
    const restartButton = document.querySelector(".restart-button");
    const winnerDialogRestart = document.querySelector("#dialog-restart-button");
    const inputPlayer1 = document.querySelector("#name-1");
    const inputPlayer2 = document.querySelector("#name-2");
    const showPlayer1Name = document.querySelector("#player-name-1");
    const showPlayer2Name = document.querySelector("#player-name-2");
    const showPlayer1Score = document.querySelector("#player-score-1");
    const showPlayer2Score = document.querySelector("#player-score-2");
    const showTurn = document.querySelector("#show-turn");

    confirmStartButton.addEventListener("click", (e) => {
        e.preventDefault();
        dialog.close();
        if (inputPlayer1.value === "") {
            inputPlayer1.value = "player 1";
        }
        if (inputPlayer2.value === "") {
            inputPlayer2.value = "player 2";
        }
        game.initiatePlayers(inputPlayer1, inputPlayer2);
        refreashPlayer();
        showTurn.textContent = game.getCurrentTurn().name + " " + game.getCurrentTurn().symbol;
        refreshScore();

        boarderInterface.addEventListener("click", (e) => {
            if (e.target.matches("button")) {
                const placeToPlay = e.target.value.split(" ");
                const numberIndexes = placeToPlay.map((item) => {
                    return Number(item);
                })
                if (game.validateInput(numberIndexes[0], numberIndexes[1]))
                game.playTurn(game.getCurrentTurn(), numberIndexes);
                refreshBoarder();
                showTurn.textContent = game.getCurrentTurn().name + " " + game.getCurrentTurn().symbol;

                if (game.getRoundCount() >= 3) {
                    if (game.gameResult()) {
                        game.finishGame();
                        refreshScore();
                        refreshBoarder();
                    } else if (game.getRoundCount() === 9) {
                        game.finishGame(true);
                        refreshBoarder();
                    }
                }
            }
        });

        restartButton.addEventListener("click", restartGame());
        winnerDialogRestart.addEventListener("click", () => {
            restartGame();
            winnerDialog.close();
        });
        winnerDialogContinueButton.addEventListener("click", () => {
            winnerDialog.close();
        })

        function restartGame() {
            game.finishGame(true, true);
            refreshBoarder();
            game.restartScores();
            refreshScore();
        }
    });

    const callWinnerModal = () => {
        winnerDialog.showModal();
        const result = game.getResult();
        if (typeof result === "object") {
            winnerDialogShowWinner.textContent = game.getResult().name;
        } else {
            winnerDialogShowWinner.textContent = game.getResult();
        }

    };

    const refreshBoarder = () => {
        const boarder = game.getBoard();
        const positions = document.querySelectorAll(".position");
        for (const position of positions) {
            position.textContent = " ";
            position.classList.remove("x-player", "o-player");
            const positionIndex = position.value.split(" ");
            if (boarder[positionIndex[0] - 1][positionIndex[1] - 1] === "X") {
                position.classList.add("x-player");
                position.textContent = "X";
            } else if (boarder[positionIndex[0] - 1][positionIndex[1] - 1] === "O") {
                position.classList.add("o-player");
                position.textContent = "O";
            }
        }
    };
    const refreshScore = () => {
        [showPlayer1Score.textContent, showPlayer2Score.textContent] = game.getScores();
    };

    function refreashPlayer() {
        showPlayer1Name.textContent = inputPlayer1.value;
        showPlayer2Name.textContent = inputPlayer2.value;
    }

    return {callWinnerModal};
})();
