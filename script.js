var board = null;
var game = new Chess();

var statusEl = document.getElementById('status');
var movesEl = document.getElementById('moves');

function updateStatus() {
    var status = '';

    var moveColor = game.turn() === 'w' ? 'White' : 'Black';

    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.';
    } else if (game.in_draw()) {
        status = 'Game over, drawn position';
    } else {
        status = moveColor + ' to move';

        if (game.in_check()) {
            status += ' (in check)';
        }
    }

    statusEl.innerHTML = status;
    movesEl.innerHTML = game.history().join(' ');
}

function onDragStart(source, piece) {
    if (game.game_over()) return false;

    if (
        (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)
    ) {
        return false;
    }
}

function onDrop(source, target) {
    removeHighlights();

    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    });

    if (move === null) return 'snapback';

    updateStatus();
}

function onMouseoverSquare(square) {
    var moves = game.moves({
        square: square,
        verbose: true
    });

    if (moves.length === 0) return;

    highlightSquare(square);

    for (var i = 0; i < moves.length; i++) {
        highlightSquare(moves[i].to);
    }
}

function onMouseoutSquare(square) {
    removeHighlights();
}

function highlightSquare(square) {
    var squareEl = document.querySelector('.square-' + square);
    if (squareEl) {
        squareEl.classList.add('square-highlight');
    }
}

function removeHighlights() {
    document.querySelectorAll('.square-highlight')
        .forEach(el => el.classList.remove('square-highlight'));
}

function onSnapEnd() {
    board.position(game.fen());
}

board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
    onMouseoverSquare: onMouseoverSquare,
    onMouseoutSquare: onMouseoutSquare
});

updateStatus();