const displayController = (() => {
    let userRegistrationButtons = document.querySelectorAll(".registration-button");
    userRegistrationButtons.forEach((button) => {
        button.addEventListener("click", addClickedEffect);
    })

    function addClickedEffect(e) {
        e.target.classList.toggle("clicked-registration-button");
    }

    let gameModeSelectionButtons = document.querySelectorAll(".mode-selector");
    gameModeSelectionButtons.forEach((button) => {
        button.addEventListener("click", addClickedEffectToGameModeButtons);
    })

    function addClickedEffectToGameModeButtons(e) {
        e.target.classList.toggle("clicked-mode-selector");
    }
})();

let gameBoard = (() => {
    let allGameGridItems = document.querySelectorAll(".game-grid-item");
    let grid = new Array();
    allGameGridItems.forEach((gridItem) => {
        grid.push(gridItem);
    })
    return {
        grid,
    };
})();

function createPlayerFactory(playerName, symbolChosen) {
    return {
        playerName,
        symbolChosen,
    }
}

let game = (() => {
    let isPlayerOneActive = true;
    let isPlayerRegistered = false;
    let playerOne;
    let playerTwo;
    let isGameOngoing = true;
    let noOfTurnsLeft = 9;


    let vsHuman = document.querySelector(".versus-human");
    vsHuman.addEventListener("click", enterPlayerDetails);

    function enterPlayerDetails() {
        document.querySelector(".modal-div").style.display = "grid";
    }

    let letsPlayTwoPlayerGame = document.querySelector("#submit-button");
    letsPlayTwoPlayerGame.addEventListener("click", startTwoPlayerGame);

    function startTwoPlayerGame() {
        playerOne = createPlayerFactory(document.querySelector("#player-1-name").value, "X");
        playerTwo = createPlayerFactory(document.querySelector("#player-2-name").value, "O");
        isPlayerRegistered = true;
        clearPlayerRegistrationWindow();
        document.querySelector("#new-game").style.display = "block";
        document.querySelector(".player-state").style.display = "grid";
        document.querySelector(".player-1-state").textContent = playerOne.playerName;
        document.querySelector(".player-2-state").textContent = playerTwo.playerName;
    }

    function clearPlayerRegistrationWindow() {
        document.querySelector(".modal-div").style.display = "none";
    }

    gameBoard.grid.forEach((gridItem) => {
        gridItem.addEventListener("click", markXorO);
    })

    function markXorO(e) {
        if (isGameOngoing) {
            if (isPlayerRegistered) {
                if (e.target.textContent === "") {
                    if (isPlayerOneActive) {
                        e.target.textContent = playerOne.symbolChosen;
                        console.log("win");
                        isPlayerOneActive = false;

                    }
                    else {
                        e.target.textContent = playerTwo.symbolChosen;
                        isPlayerOneActive = true;
                    }
                    noOfTurnsLeft -= 1;
                    changeTheActivePlayerRepresentation();
                }
                else {
                    alert("Select an empty position");
                }
                console.log("printed");
                findGameStatus();
            }
            else {
                alert("Enter Player Details First");
            }
        }
        else {
            alert("The Present Game is Terminated. Start a New Game");
        }
    }

    function changeTheActivePlayerRepresentation() {
        document.querySelector(".player-1-state").classList.toggle("active-player");
        document.querySelector(".player-2-state").classList.toggle("active-player");
    }

    function findGameStatus() {
        let winner = findWinner();
        if (winner !== undefined) {
            console.log(`winner is ${winner}`);
            alert(`winner is ${winner}`);
        }
        else if (isGameDraw()) {
            console.log("the game is draw");
            alert("the game is draw");
        }
    }

    function findWinner() {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < 8; i++) {
            let a = winningCombinations[i][0];
            let b = winningCombinations[i][1];
            let c = winningCombinations[i][2];
            if (gameBoard.grid[a].textContent === "") {
                continue;
            }
            else {
                if (gameBoard.grid[a].textContent === gameBoard.grid[b].textContent && gameBoard.grid[b].textContent === gameBoard.grid[c].textContent) {
                    isGameOngoing = false;
                    if (gameBoard.grid[a].textContent === playerOne.symbolChosen) {
                        console.log(playerOne.playerName);
                        return playerOne.playerName;
                    }
                    else {
                        return playerTwo.playerName;
                    }
                }
            }
        }
    }
    function isGameDraw() {
        if (noOfTurnsLeft === 0) {
            isGameOngoing = false;
            return true;
        }
        return false;
    }

    let newGameButton = document.querySelector("#new-game");
    newGameButton.addEventListener("click", clearAllInputs);

    function clearAllInputs() {
        isPlayerOneActive = true;
        isPlayerRegistered = false;
        isGameOngoing = true;
        noOfTurnsLeft = 9;

        gameBoard.grid.forEach((gridItem) => {
            gridItem.textContent = "";
        })
        document.querySelector(".player-state").style.display = "none";
        document.querySelector(".player-1-state").textContent = "";
        document.querySelector(".player-2-state").textContent = "";
        document.querySelector("#player-1-name").value = "";
        document.querySelector("#player-2-name").value = "";
        document.querySelector("#play-vs-human").classList.remove("clicked-mode-selector");
        document.querySelector("#new-game").style.display = "none";
    }
})();