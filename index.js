const root = document.getElementById('root');

class Tile {
    constructor(x, y) {
        this.id = [x, y];
        this.distance = null;
        this.predecessor = null;
        this.shortestPath = false;
    }
}

class Chessboard {
    constructor(start) {
        this.board = [];
        this.start = start;
        this.end = [2, 4];
    }

    reset(start) {
        for (let i = root.children.length - 1; i >= 0; i--) {
            const e = root.children[i];
            if (e.className === 'row') {
                root.removeChild(e);
            }
        }
        this.board = [];
        this.start = start;
        this.buildBoard();
        this.drawBoard();
        this.breadthFirst();
    }

    updateTileColor() {
        const rows = document.getElementsByClassName('row');
        for (let y = 0; y < rows.length; y++) {
            for (let x = 0; x < rows[y].children.length; x++) {
                const tile = rows[y].children[x];
                if (this.board[y][x].distance === 0) {
                    tile.style.backgroundColor = "rgb(251,129,129)";
                    if (tile.children.length === 0) {
                        const img = document.createElement('img');
                        img.className = 'knight-img';
                        img.src = './knight.png';
                        tile.appendChild(img);
                    }

                } else if (this.board[y][x].shortestPath === true) {
                    //console.log(this.board[y][x]);
                    tile.style.backgroundColor = 'rgba(143,128,238,0.5)';
                } else if ((x % 2 !== 0 && y % 2 === 0) || (x % 2 === 0 && y % 2 !== 0)) {
                    tile.style.backgroundColor = "rgb(95,95,95)";
                } 
                if (this.board[y][x].shortestPath) {
                    tile.textContent = this.board[y][x].distance;
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
                    this.start = tile;
                } else if (this.end[0] === x && this.end[1] === y) {
                    this.end = tile;
                }
                row.push(tile);
            }
            this.board.push(row);
        }
        //console.log('board', this.board);

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
                    const coords = [x, y];
                    this.reset(coords);
                })
                if (x === this.end.id[0] && y === this.end.id[1]) {
                    tile.classList.add('end-tile');
                }
            }
            root.appendChild(row);
        }
        this.updateTileColor();
    }

    breadthFirst() {
        this.assignDistanceValues();
        this.updateTileColor()
    }

    checkNextTile(x, y) {
        if (y >= 0 && y <= 7 && x >= 0 && x <= 7 && this.board[y][x].distance === null) {
            return true;
        }
    }

    assignDistanceValues() {
        let queue = [this.start];
        let movesList = [];
        while (queue.length > 0) {
            const tile = queue.shift();
            let x = tile.id[0];
            let y = tile.id[1];
            //y + 2
            if (this.checkNextTile(x - 1, y + 2)){
                const nextTile = this.board[y + 2][x - 1];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            if (this.checkNextTile(x + 1, y + 2)){
                const nextTile = this.board[y + 2][x + 1];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            //x + 2
            if (this.checkNextTile(x + 2, y - 1)){
                const nextTile = this.board[y - 1][x + 2];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            if (this.checkNextTile(x + 2, y + 1)){
                const nextTile = this.board[y + 1][x + 2];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            //y - 2
            if (this.checkNextTile(x - 1, y - 2)){
                const nextTile = this.board[y - 2][x - 1];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            if (this.checkNextTile(x + 1, y - 2)){
                const nextTile = this.board[y - 2][x + 1];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            //x - 2
            if (this.checkNextTile(x - 2, y + 1)){
                const nextTile = this.board[y + 1][x - 2];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
            if (this.checkNextTile(x - 2, y - 1)){
                const nextTile = this.board[y - 1][x - 2];
                nextTile.distance = tile.distance + 1;
                nextTile.predecessor = tile;
                queue.push(nextTile);
                movesList.push(nextTile);
            }
        }   
        //console.log('moveslist', movesList);
        for (let i = 0; i < movesList.length; i++) {
            let tile = movesList[i];
            if (tile.id[0] === this.end.id[0] && tile.id[1] === this.end.id[1]) {
                while (tile.predecessor !== null) {
                    tile.shortestPath = true;
                    tile = tile.predecessor;
                }
            }
        }
    }
}

const board = new Chessboard([7,2]);
board.buildBoard();
board.drawBoard();
board.breadthFirst();
