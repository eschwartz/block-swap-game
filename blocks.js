const starting = [
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

let winningGrid = [
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1]
];

let turns, lastGrid;
let attemptedTurns = 0;
reset();

function reset() {
    lastGrid = starting;
    turns = [
        // [row, column, grid]
        [null, null, starting]      // first turn
    ]
}




let targetCount = 6;

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
        
        if (isWinner(nextGrid)) {
            logTurns(turns);
            console.log(`
Solved in ${turns.length} turns 🎉
${attemptCount} game attempts
${attemptedTurns} total turns taken
            `)
            return;
        }
    }
}


function logTurns(turns) {
    //log(starting);
    for (let [row, col, grid] of turns) {
        if (row !== null && col !== null) {
            console.log(`\nClick on row ${row}, col ${col}`);
        }
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
    attemptedTurns++;

    // copy grid
    grid = [
        [...grid[0]],
        [...grid[1]],
        [...grid[2]]
    ];
    
    // swap that cell
    swapCell(grid, row, col);   // the cell
    swapCell(grid, row - 1, col); // above
    swapCell(grid, row + 1, col); // below
    swapCell(grid, row, col - 1); // left
    swapCell(grid, row, col + 1); // right
    
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