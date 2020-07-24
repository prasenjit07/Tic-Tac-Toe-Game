let playerMark = 'X';
//let opponentMark = 'O';
let board = ['', '', '', '', '', '', '', '', ''];


$(".btn-reset").click(() => {
  newGame();
});

function newGame() {
  enableCells();

  playerMark = 'X';
  $("#grid td").html('');
  board = ['', '', '', '', '', '', '', '', ''];
  $("#winning-line").remove();
  $("#win").html("");
}
function enableCells() {
  for (let i = 0; i < board.length; i++) {
    let cell_ID = "#cell" + (i + 1);
    $(cell_ID).click({param1: cell_ID, param2: i}, clickAction);
  }
}
function disableCells() {
  for (let i = 1; i <= board.length; i++) {
    $("#cell" + i).unbind("click");
  }
}
function clickAction(event) {
  let cell_ID = event.data.param1;
  let board_Index = event.data.param2;

  if($(cell_ID).text() === '' ) {
    $(cell_ID).html(playerMark);
    board[board_Index] = playerMark;
    let humanwinner = checkForWinner(playerMark, board, false);
    if (humanwinner) {
      if(playerMark=='X')
      {$("#win").html("Player 1 won");}
      else
      $("#win").html("Player 2 won");
      disableCells();
    }
    if (checkForDraw()) {
      disableCells();
    }
    if(playerMark=='X')
    $("#turn").html("Player 2 turn");
    else
    $("#turn").html("Player 1 turn");

    if(playerMark==='X')
    playerMark ='O';
    else
    playerMark ='X';
    if (checkForDraw()) {
      disableCells();
    }
  }
}
function checkForWinner(player, board, is_Simulation) {

  /* If players have not been selected, there can't be a winner. */
  if (player === '') { return false; }

  if (board[0] === player && board[0] === board[1] && board[0] === board[2]) {
    if (!is_Simulation) { drawWinSlash(0,2); }
    return true;
  }
  else if (board[0] === player && board[0] === board[4] && board[0] === board[8]) {
    if (!is_Simulation) { drawWinSlash(0,8); }
    return true;
  }
  else if (board[0] === player && board[0] === board[3] && board[0] === board[6]) {
    if (!is_Simulation) { drawWinSlash(0,6); }
    return true;
  }
  else if (board[1] === player && board[1] === board[4] && board[1] === board[7]) {
    if (!is_Simulation) { drawWinSlash(1,7); }
    return true;
  }
  else if (board[2] === player && board[2] === board[4] && board[2] === board[6]) {
    if (!is_Simulation) { drawWinSlash(2,6); }
    return true;
  }
  else if (board[2] === player && board[2] === board[5] && board[2] === board[8]) {
    if (!is_Simulation) { drawWinSlash(2,8); }
    return true;
  }
  else if (board[3] === player && board[3] === board[4] && board[3] === board[5]) {
    if (!is_Simulation) { drawWinSlash(3,5); }
    return true;
  }
  else if (board[6] === player && board[6] === board[7] && board[6] === board[8]) {
    if (!is_Simulation) { drawWinSlash(6,8); }
    return true;
  }
  return false;
}
function checkForDraw() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      return false;
    }
  }
  return true;
}

/* Called by drawWin to make a line to show 3 in a row. */
function buildLine(lx, ly, thickness, length, angle) {
  let winline = $("<div>");
  winline.attr('id', 'winning-line');
  winline.css('height', thickness + 'px');
  winline.css('left', lx + 'px');
  winline.css('top', ly + 'px');
  winline.css('width', length + 'px');
  winline.css('-moz-transform', 'rotate(' + angle + 'deg)');
  winline.css('-webkit-transform', 'rotate(' + angle + 'deg)');
  winline.css('-moz-transform', 'rotate(' + angle + 'deg)');
  winline.css('-o-transform', 'rotate(' + angle + 'deg)');
  winline.css('-ms-transform', 'rotate(' + angle + 'deg)');
  winline.css('transform', 'rotate(' + angle + 'deg)');
  return winline;
}


function drawWinSlash(cellNum_A, cellNum_B) {
  const thickness = 5;
  const color = "red";
  const divA = $("#cell" + (cellNum_A+1));
  const divB = $("#cell" + (cellNum_B+1));
  let ax1, ax2, ay1, ay2;

  if (cellNum_A === 0 && cellNum_B === 2 || cellNum_A === 3 && cellNum_B === 5 || cellNum_A === 6 && cellNum_B === 8) {
    // Horizontal lines
    ax1 = divA.offset().left-50;
    ay1 = divA.offset().top + divA.height()/2;
    ax2 = divB.offset().left + divB.width()+50;
    ay2 = divB.offset().top + divB.height()/2;
  } else if (cellNum_A === 0 && cellNum_B === 6 || cellNum_A === 1 && cellNum_B === 7 || cellNum_A === 2 && cellNum_B === 8) {
    // Vertical lines
    ax1 = divA.offset().left + divA.width()/2;
    ay1 = divA.offset().top - 50;
    ax2 = divB.offset().left + divB.width()/2;
    ay2 = divB.offset().top + divB.height() + 50;

  } else if (cellNum_A === 0 && cellNum_B === 8) {
    //Diagonal top-left -> bottom-right
    ax1 = divA.offset().left - 20;
    ay1 = divA.offset().top - 20;
    ax2 = divB.offset().left + divB.width()+20;
    ay2 = divB.offset().top + divB.height() + 20;

  } else if (cellNum_A === 2 && cellNum_B === 6) {
    //Diagonal top-right to bottom-left
    ax1 = divA.offset().left + divA.width() + 20;
    ay1 = divA.offset().top - 20;
    ax2 = divB.offset().left - 20;
    ay2 = divB.offset().top + divB.height() + 20;
  }

  const angle = Math.atan2((ay1-ay2),(ax1-ax2))*(180/Math.PI);

  const length = Math.sqrt(((ax2-ax1) * (ax2-ax1)) + ((ay2-ay1) * (ay2-ay1)));
  //center coordinates.
  const cx = ((ax1 + ax2) / 2) - (length / 2);
  const cy = ((ay1 + ay2) / 2) - (thickness / 2);

  const winline = buildLine(cx, cy, thickness, length, angle);
  $("body").append(winline);
}


/* Redrawing the winner line if window resizes. */
$(window).resize(() => {
  $("#winning-line").remove();
  checkForWinner(playerMark, board, false);
});
