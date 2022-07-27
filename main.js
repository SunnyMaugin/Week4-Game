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
    ]

    

    resetButton.addEventListener('click', resetBoard);
});