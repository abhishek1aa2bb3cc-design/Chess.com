const board = document.getElementById("board");

const pieces = [
["♜","♞","♝","♛","♚","♝","♞","♜"],
["♟","♟","♟","♟","♟","♟","♟","♟"],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["","","","","","","",""],
["♙","♙","♙","♙","♙","♙","♙","♙"],
["♖","♘","♗","♕","♔","♗","♘","♖"]
];

let selected = null;

function drawBoard(){
    board.innerHTML = "";

    for(let row=0; row<8; row++){
        for(let col=0; col<8; col++){

            const square = document.createElement("div");

            square.classList.add("square");

            if((row + col) % 2 == 0){
                square.classList.add("white");
            } else {
                square.classList.add("black");
            }

            square.textContent = pieces[row][col];

            square.addEventListener("click", () => movePiece(row,col,square));

            board.appendChild(square);
        }
    }
}

function movePiece(row,col,square){

    if(selected){

        pieces[row][col] = pieces[selected.row][selected.col];
        pieces[selected.row][selected.col] = "";

        selected = null;

        drawBoard();

    } else {

        if(pieces[row][col] !== ""){
            selected = {row,col};
            square.classList.add("selected");
        }
    }
}

drawBoard();