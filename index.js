//Code for AI vs human game using  minimax algorithm and alpha beta pruning.Alpha beta pruning belongs to branch and bound category
  let playerMark = 'X';
  let opponentMark = 'O';
  let board = ['', '', '', '', '', '', '', '', '']; //Empty board for the game
  let max_depth=Number.POSITIVE_INFINITY; //Set maximum depth as infinity
  let runCountAB = 0; // Used to show how many moves run including Alpha-Beta Pruning

  //Minimax function with alpha beta pruning with arguments depth,board,maximizimg player,alfa ,beta
  //Using alpha beta pruning reduces time complexity
  //Recursive code given below
  function miniMaxWithABPruning(depth, board, isMaximizingPlayer, alfa, beta)
  {
    runCountAB++; //increment the variable

    let k=0;// k is the number of empty cells of the board
    for (let i = 0; i < board.length; i++)
    {
      if (board[i] === '')
      k++; // counts number of empty cells of the board
    }
    if(k==board.length) //if no of empty cells of board is equal to the board length
    {
      var center_and_corners = [0, 2, 4, 6, 8]; //center and corner of board stored
      var first_choice = center_and_corners[Math.floor(Math.random() * center_and_corners.length)];// choose the first choice randomly
      return first_choice; //return the first choice of cell
    }

    //Checking base conditions
    if (checkForWinner(opponentMark, board, true)||depth==max_depth)
    {
      return 10 - depth;//heuristic value of node
    }
    else if (checkForWinner(playerMark, board, true)||depth==max_depth)
    {
      return -10 + depth;//heurisitc value of node
    }

    let bestValue, bestMove, player;
    if (isMaximizingPlayer)
    {
      bestValue = Number.NEGATIVE_INFINITY;//set best value to negative infinity
      // Opponent only uses this algorithm, so the maximizing player is opponent mark.
      player = opponentMark;
    }
    else
    {
      bestValue = Number.POSITIVE_INFINITY;//set best value to positive infinity
      player = playerMark;
    }
    for (let i = 0; i < board.length; i++)
    {
      if (board[i] === '')
      {
        board[i] = player; //whoevers turn it is.

        if (isMaximizingPlayer)
        {
          alfa = miniMaxWithABPruning(depth+1, board, !isMaximizingPlayer, alfa, beta);//call the function for next depth and next player
          board[i] = ''; // remove test move from actual board.

          if (bestValue < alfa)
          {
            bestValue = alfa;//update best value
            bestMove = i;//update best move
          }

          //This condition ignores subtrees which don't need to be explored
          if (alfa >= beta)
          {
            break; // Prune condition
          }

        }
        else
        {
          beta = miniMaxWithABPruning(depth+1, board, !isMaximizingPlayer, alfa, beta);//calls the function for next depth and next player
          board[i] = ''; // remove test move from actual board.
          if (bestValue > beta)
          {
            bestValue = beta;//update best value
            bestMove = i;//update best move
          }

          //This condition ignores subtrees which dont need to be explored
          if (alfa >= beta)
          {
            break; // Prune condition
          }
        }
      }
    }

    if (depth === 0)
    {
      if (isMaximizingPlayer && bestValue === Number.NEGATIVE_INFINITY || !isMaximizingPlayer && bestValue === Number.POSITIVE_INFINITY)
      {
          return board.indexOf('');
           // no good or bad moves, just choose first blank spot available.
      }
      return bestMove;
    }

    if (isMaximizingPlayer && bestValue === Number.NEGATIVE_INFINITY || !isMaximizingPlayer && bestValue === Number.POSITIVE_INFINITY)
    { //but not depth === 0
        return 0;
    }


    return bestValue;
  }

  $(".human").click(() => {
    playerMark = 'X';
    opponentMark = 'O';
    newGame();
    $("#whostartsfirst").html("You start first");
  });
  $(".ai").click(() => {
    playerMark = 'O';
    opponentMark = 'X';
    newGame();
    opponentTurn();
    $("#whostartsfirst").html("AI starts first");
  });



  //choosing depths and setting maxdepth value
  $(".depth1").click(() => {
    max_depth=3;
    $("#depthoutput").html("level 1");
  });
  $(".depth2").click(() => {
    max_depth=4;
    $("#depthoutput").html("level 2");
  });
  $(".depth3").click(() => {
    max_depth=5;
    $("#depthoutput").html("level 3");
  });
  $(".depth4").click(() => {
    max_depth=7;
    $("#depthoutput").html("level 4");
  });
  $(".depth5").click(() => {
    max_depth=Number.POSITIVE_INFINITY;
    $("#depthoutput").html("level max");
  });

  $(".new-game").click(() => {
    newGame();
    if (playerMark === 'O') {
      opponentTurn();
    }

    $('#gif-lose').css('display', 'none'); // should be better way than this.
    $('#gif-draw').css('display', 'none'); // should be better way than this.
    $('#gif-win').css('display', 'none');
  });

  function newGame() {
    enableCells();
    $("#grid td").html('');
    board = ['', '', '', '', '', '', '', '', ''];
    $("#winning-line").remove();
  }


  function opponentTurn()
  {
    let move = miniMaxWithABPruning(0, board, true, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);  // opponent is set as the minimizing player
    runCount = 0;
    runCountAB = 0;
    let cellClass = "#cell" + (parseInt(move) + 1);
    board[move] = opponentMark;
    $(cellClass).html(opponentMark);
    let foundWinner = checkForWinner(opponentMark, board, false);
    let humanwinner = checkForWinner(playerMark, board, false);
    if(foundWinner) {
      disableCells();
      $('#gif-lose').css('display', 'block');
    }
    else if (humanwinner) {
      disableCells();
      $('#gif-win').css('display', 'block');
    }
    else if (checkForDraw()) {
      disableCells();
      $('#gif-draw').css('display', 'block');
    }
  }

  function clickAction(event) {
    let cell_ID = event.data.param1;
    let board_Index = event.data.param2;

    if($(cell_ID).text() === '' || $(cell_ID).html() === '<p class="hover-move">' + playerMark + "</p>") {
      $(cell_ID).html(playerMark);
      board[board_Index] = playerMark;
      if (checkForDraw()) {
        disableCells();
        $('#gif-draw').css('display', 'block');
      }
      opponentTurn();
    }
  }

  function mouseEnterCellAction(event) {
    let cell_ID = event.data.param1;
    if ($(cell_ID).text() === '') {
      $(cell_ID).html("<p class='hover-move'>" + playerMark + "</p>");
    }
  }

  function mouseLeaveCellAction(event) {
    let cell_ID = event.data.param1;
    if ($(cell_ID).html() === '<p class="hover-move">' + playerMark + "</p>") {
      $(cell_ID).html('');
    }
  }

  /* After a player wins, user is not allowed to input anymore. */
  function disableCells() {
    for (let i = 1; i <= board.length; i++) {
      $("#cell" + i).unbind("click");
      $("#cell" + i).unbind("mouseenter");
      $("#cell" + i).unbind("mouseleave");
    }
  }

  function enableCells() {
    for (let i = 0; i < board.length; i++) {
      let cell_ID = "#cell" + (i + 1);
      $(cell_ID).click({param1: cell_ID, param2: i}, clickAction);
      $(cell_ID).mouseenter({param1: cell_ID}, mouseEnterCellAction);
      $(cell_ID).mouseleave({param1: cell_ID}, mouseLeaveCellAction);
    }
  }


  /* Called after checkForWinner. */
  function checkForDraw() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        return false;
      }
    }
    return true;
  }


  /* Checks if there is a winning state. Returns 0 if no winning state, returns an integer that maps to the line that needs to be drawn if true. */
  function checkForWinner(player, board, is_Simulation) {

    /* If the board is empty, there can't be a winner. */
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

  $(window).resize(() => {
      $("#winning-line").remove();
      checkForWinner(opponentMark, board, false);
      checkForWinner(playerMark, board, false);
    });

	// When the user clicks the X button ,modal is closed
  $('.close').click(() => {
    $('#gif-lose').css('display', 'none');
    $('#gif-draw').css('display', 'none');
    $('#gif-win').css('display', 'none');
  });

  // When the user clicks anywhere outside of the modal, it closes

  $(window).click((event) => {
    if ($(event.target).is('#gif-lose')) {
      $('#gif-lose').css('display', 'none');
    } else if ($(event.target).is('#gif-draw'))  {
      $('#gif-draw').css('display', 'none');
    }else if ($(event.target).is('#gif-win') ) {
      $('#gif-win').css('display', 'none');
    }

  });
