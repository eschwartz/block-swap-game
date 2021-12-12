const starting = [
    [0, 0, 1],
    [1, 0, 0],
    [1, 0, 1],
];

let winningGrid = [
    [1, 0, 1],
    [1, 1, 1],
    [0, 0, 1]
];

let turns, lastGrid;
reset();

function reset() {
    lastGrid = starting;
    turns = [
        [null, null, starting]
    ]
}


function gridString(grid) {
    return JSON.stringify(grid);
}


let bestCount = Infinity;
let bestTurns;

let targetCount = 7;

attempt();

function attempt() {
    
    while(true) {
        // take a random turn
        let [nextGrid, row, col] = randomTurn(lastGrid);
        //log(nextGrid);
        
        turns.push([row, col, nextGrid]);
        lastGrid = nextGrid;
        
        if (isWinner(nextGrid)) {
            let turnCount = turns.length;

            if (turnCount < bestCount) {
                bestCount = turnCount;
                bestTurns = turns;
                console.log('best:', turnCount)
            }
            if (bestCount <= targetCount) {
                console.log(`Less than ${targetCount}!`)
                logTurns(turns);
                return;
            }
            else {
                reset();
                attempt();
            }
            break;
        }
        
        if (Object.keys(turns).length >= 10000) {
            break;
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
    swapCell(grid, row - 1, col); // above
    swapCell(grid, row + 1, col); // below
    swapCell(grid, row, col - 1); // left
    swapCell(grid, row, col + 1); // right
    
    return grid;
}

// Swap the cell, if it exists
// mutates grid
function swapCell(grid, row, col) {
    if (row >= 0 && col >= 0 && row <= 2 && col <= 2) {
        grid[row][col] = swap(grid[row][col]);
    }
}


function swap(n) {
    return n === 0 ? 1 : 0;
}