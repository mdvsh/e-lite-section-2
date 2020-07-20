// Made with p5js. Initial video by Daniel Shiffman.
// ToDo: make responsive canvas, color neighbors and parents based on history, 
// change speed of simulation with buttons, use mouse to put cells on canvas

// Global Variables. Change size of the cell by changing res.

let nc
let nr
let grid
let res = 10
let rkeyp, ckeyp, foo
foo = false

// function to count the neighbors of a cell
function ncount(grid, xc, yc) {
    let c = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (xc + i + nc) % nc;
            let row = (yc + j + nr) % nr;
            c += grid[col][row];
        }
    }
    c -= grid[xc][yc];
    return c;
}

function create_grid() {
    background("#f1f1f1")
    for (let i = 0; i < nc; i++) {
        for (let j = 0; j < nr; j++) {
            let xc = i * res;
            let yc = j * res;
            if (grid[i][j] == 1) {
                fill("#333333")
                stroke("alicewhite")
            } else {
                fill("#f1f1f1")
            }
            rect(xc, yc, res - 1, res - 1);
        }
    }
}

function setup() {
    var canvas = createCanvas(1400, 600);
    canvas.parent('sketch')
    rkeyp = false
    ckeyp = false
    pkeyp = false
    nc = width / res
    nr = height / res

    grid = new Array(nc)
    // create grid
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(nr)
    }
    // put cells in the grid
    for (let i = 0; i < nc; i++) {
        for (let j = 0; j < nr; j++) {
            grid[i][j] = 0
        }
    }
}

function draw() {
    if (ckeyp == true && pkeyp == false) {
        console.log(ckeyp)
        create_grid()
        ckeyp = false
        console.log(ckeyp)
    } else if (rkeyp == true && pkeyp == false) {
        console.log(grid[0][0])
        for (let i = 0; i < nc; i++) {
            for (let j = 0; j < nr; j++) {
                grid[i][j] = floor(random(2))
            }
        }
        create_grid()
        rkeyp = false
    } else if (pkeyp) {
        create_grid()
        // Create a new state dict
        let next_gen = new Array(nc)
        for (let i = 0; i < next_gen.length; i++) {
            next_gen[i] = new Array(nr)
        }
        // Compute next_gen based on grid
        for (let i = 0; i < nc; i++) {
            for (let j = 0; j < nr; j++) {
                let alive = grid[i][j]
                // Count live neighbors!
                let neighbors = ncount(grid, i, j)

                // Condition to reproduce | 1 is alive, 0 is dead.
                if (alive == 0 && neighbors == 3) {
                    next_gen[i][j] = 1
                }
                // die from under/overpopulation
                else if (alive == 1 && (neighbors > 3 || neighbors < 2)) {
                    next_gen[i][j] = 0
                } else {
                    next_gen[i][j] = alive;
                }
            }
        }
        // Change current state
        grid = next_gen
    }
}

function keyTyped() {
    // Clear Board
    if (key === 'c') {
        for (let i = 0; i < nc; i++) {
            for (let j = 0; j < nr; j++) {
                grid[i][j] = 0
            }
        }
        ckeyp = true
    }
    // Randomise Cell States
    if (key === 'r' && !ckeyp) {

        rkeyp = true
    }
    // Play/Pause
    if (key === 'p') {
        if (foo === false) {
            pkeyp = true
            foo = true
        } else {
            pkeyp = false
            foo = false
        }
    }
}