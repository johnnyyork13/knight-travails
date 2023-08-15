const root = document.getElementById('root');

class Tile {
    constructor(x, y) {
        this.id = [x, y];
        this.distance = null;
        this.predecessor = null;
    }
}

class Chessboard {
    constructor(start) {
        this.tile = {
            predecessor: null,
            distance: null
        }
        this.board = [];
        this.start = start;
        this.end = [2, 4];
    }

    updateTileColor() {
        const rows = document.getElementsByClassName('row');
        for (let y = 0; y < rows.length; y++) {
            for (let x = 0; x < rows[y].children.length; x++) {
                const tile = rows[y].children[x];
                if (this.board[y][x].distance === 0) {
                    tile.style.backgroundColor = "rgb(251,129,129)";
                } else if (this.board[y][x].distance !== null) {
                    tile.style.backgroundColor = 'rgb(143,128,238)';
                } else if (x === this.end[0] && y === this.end[1]) {
                    tile.style.backgroundColor = "rgb(138,238,190)"
                } else if ((x % 2 !== 0 && y % 2 === 0) || (x % 2 === 0 && y % 2 !== 0)) {
                    tile.style.backgroundColor = "rgb(95,95,95)";
                } 
            }
        }
        
    }

    buildBoard() {
        let rows = 8;
        let columns = 8;
        for (let y = 0; y < rows; y++) {
            let row = [];
            for (let x = 0; x < columns; x++) {
                const tile = new Tile(x, y);
                if (this.start[0] === x && this.start[1] === y) {
                    tile.distance = 0;
                }
                row.push(tile);
            }
            this.board.push(row);
        }

    }

    drawBoard() {
        for (let y = 0; y < this.board.length; y++) {
            const row = document.createElement('row');
            row.className = 'row';
            for (let x = 0; x < this.board[y].length; x++) {
                const tile = document.createElement('tile');
                tile.className = 'tile';
                row.appendChild(tile);
                //add listeners
                tile.addEventListener('click', () => {
                    //this.clickEventsForTile(tile, x, y);
                    console.log([x, y]);
                })
            }
            root.appendChild(row);
        }
        this.updateTileColor();
    }

    clickEventsForTile(tile, x, y) {
        this.breadthFirst(x, y)
    }

    breadthFirst() {
        
        this.updateTileColor()
    }
}

const board = new Chessboard([0,0]);
board.buildBoard();
board.drawBoard();
board.breadthFirst();
//console.log(board.board);