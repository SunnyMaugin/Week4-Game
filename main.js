window.addEventListener('DOMContentLoaded', () => { // We need this as our js script is before our HTML so usin this will ensure the js works with the HTML properly
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player'); // Setting up our global vairables and notice tiles is using 'Array.from' because queryselctor will convert the data into a nodelist and by using array.from it will allow us to use Array properties on the .tile element
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    
    let board = ['', '', '', '', '', '', '', '', '']; // Creating our tic tac toe board using an array
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerX_WON = 'playerX_WON';
    const playerO_WON = 'playerO_WON';
    const TIE = 'TIE';

    /* 
    Visualizing the board with indexes:
            [0] [1] [2]
            [3] [4] [5]
            [6] [7] [8]
    */

// Setting up all our pssible ways/combinations of winning so we know when a player has won
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

/* checks if all the tiles have been used, checks if they have a winning sequence and also then checks if they won te round
   if so display players name and if board does not contain any empty spaces it means its a tie */
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
        announce(currentPlayer === 'X' ? playerX_WON : playerO_WON);
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        announce(TIE);
    }

    }

// this function will check for the state of the game and once a state is reached it will display it on screen
    const announce = (type) => {
        switch(type){
            case playerX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> WON!';
                break;
            case playerO_WON:
                announcer.innerHTML = 'Player <span class="playerX">O</span> WON!';
            case TIE:
                announcer.innerHTML = 'TIE'
        }
        announcer.classList.remove('hide');
    };

// this function checks if the player is trying to play an empty ile or a used tile so that players cant select the same tile twice
    const isValidAction = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    }

// keeps track of players moves on who's turn it is
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

// to change player we first remove the the currentPlayer from the classList and then change to X if it was O vice versa and then we update the playerDisplay to show who's turn it is
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

// Here first we check if the action is a valid action from the user and if it is end game or a tie if not then it will put the players letter inside the tile and update the board then check if its a winner or tie etc if not then it will switch to the other person turn 
    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive == true) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`)
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

// this function is to reset the board back to its original state and let players play the game again
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        })
    }

// attaching an event listener to every tile/index in our array and use the function 'userAction' to get which tile the user clicked and execute an appropriate response
    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});




// Implement a win tracker for X wins and O wins