const starting = [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
];

let winningGrid = [
    [1, 1, 0],
    [0, 1, 0],
    [1, 1, 1]
];

let turns, lastGrid;
reset();

let winningGames = []

function reset() {
    lastGrid = starting;
    turns = [
        // [row, column, grid]
        [null, null, starting]      // first turn
    ]
}


/*
start .... end
a, b, c, d, e, f

winningGames = {
    e: [e, f],
    d: [d, e, f],
    
}

a, b, e, f  // grab e, f from above
*/




let targetCount = 10;

let attemptCount = 0;

attempt();

function attempt() {
    attemptCount++;
    if (attemptCount % 10 === 0) {
        console.log(`attempt ${attemptCount}`);
    }
    if (attemptCount > 5000) {
        console.log('I give up 😢');
        return;
    }
    
    while(true) {
        // take a random turn
        let [nextGrid, row, col] = randomTurn(lastGrid);
        
        // Save the turn
        turns.push([row, col, nextGrid]);
        lastGrid = nextGrid;


        
        // We didn't do it in few enough turns, try again
        if (turns.length > targetCount) {
            reset();
            attempt();
            break;
        }

        // See if this grid has a matching
        // winning sequence, that would
        // get us a best attempt
        const matchingSequence = winningGames[nextGrid];
        if (matchingSequence) {
            // see if this match would hit our target
            let borrowedSequence = [...turns, ...matchingSequence.slice(1)];
            if (borrowedSequence.length)
        }

        
        if (isWinner(nextGrid)) {

            // save all the winning sequences
            // so we can maybe shortcut
            // another attempt
            for (let i in turns) {
                let [r, c, g] = turns[i];
                winningGames[g] = turns.slice(i);
            }


            logTurns(turns);
            console.log(`Complete in ${turns.length} turns! (${attemptCount} attempts)`)
            return;
        }
    }
}


function logTurns(turns) {
    //log(starting);
    for (let [row, col, grid] of turns) {
        console.log(row, col);
        log(grid);
    }
}

function isWinner(grid) {
    for (let rowI in grid) {
        for (let colI in grid[rowI]) {
            if (grid[rowI][colI] !== winningGrid[rowI][colI]) {
                return false;
            }
        }
    }
    
    return true;
}

function randomTurn(grid) {
    let row = randomIndex();
    let col = randomIndex();
    return [turn(grid, row, col), row, col];
}

function randomIndex() { // min and max included 
    let min = 0;
    let max = 2;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function logTurn(grid, row, col) {
    console.log(row, col);
    log(turn(grid, row, col));
}

function log(grid) {
    console.log(grid[0])
    console.log(grid[1])
    console.log(grid[2])
}

function turn(grid, row, col) {
    // copy grid
    grid = [
        [...grid[0]],
        [...grid[1]],
        [...grid[2]]
    ];
    
    // swap that cell
    swapCell(grid, row, col);   // the cell
    swapCell(grid, row - 1, col - 1); // above
    swapCell(grid, row - 1, col + 1); // below
    swapCell(grid, row + 1, col - 1); // left
    swapCell(grid, row + 1, col + 1); // right
    
    return grid;
}

// Swap the cell, if it exists
// mutates grid
function swapCell(grid, row, col) {
    // Make sure it's a valid cell number
    if (row >= 0 && col >= 0 && row <= 2 && col <= 2) {
        grid[row][col] = swap(grid[row][col]);
    }
}


function swap(n) {
    return n === 0 ? 1 : 0;
}