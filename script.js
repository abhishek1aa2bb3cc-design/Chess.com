var board = null;
var game = new Chess();

function onDragStart(source, piece) {
  if (game.game_over()) return false;

  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    return false;
  }
}

function onDrop(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  updateStatus();
}

function onSnapEnd() {
  board.position(game.fen());
}

function updateStatus() {
  var status = '';
  var moveColor = game.turn() === 'b' ? 'Black' : 'White';

  if (game.in_checkmate()) {
    status = 'Game Over, ' + moveColor + ' is in checkmate.';
  } else if (game.in_draw()) {
    status = 'Game Over, Draw.';
  } else {
    status = moveColor + ' to move';

    if (game.in_check()) {
      status += ' (Check!)';
    }
  }

  document.getElementById('status').innerHTML = status;
}

function restartGame() {
  game.reset();
  board.start();
  updateStatus();
}

board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

updateStatus();