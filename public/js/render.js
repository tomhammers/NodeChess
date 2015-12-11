"use strict";
// what I will call everytime I want to draw something
var Render = function Render(boardLayoutObject) {

	this.selectedPiece;

	// method just to call another method?
	Render.prototype.drawBoard = function (chessBoardObject) {
		chessBoardObject.drawBoard();
	}

	// Draw everything in the global boardLayout array
	Render.prototype.drawPieces = function (chessBoardObject) {
		// pass the chessboard object so we know where to place the pieces
		for (var row = 0; row < 8; row++) {
			for (var column = 0; column < 8; column++) {
				this.drawPiece(chessBoardObject, row, column);
			}
		}
	}
	
	// this code used to be part of drawPieces method
	// but now this code can be reused on click events (used in drawSquare)
	Render.prototype.drawPiece = function (chessBoardObject, row, column) {
		// take advantage of the "fallthrough" feature in js switch case to draw the piece
		switch (boardLayoutObject.pieceLayout[row][column]) {
			//case boardLayoutObject.object.pieceType === "rook":
			//case this.rookB1: 
			case boardLayoutObject.rookB1:  	// black rook1
			case boardLayoutObject.rookB2:  	// black rook2
				var rookB = new ChessPieceImage('img/Black R.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.knightB1:  	// black knight1
			case boardLayoutObject.knightB2:  	// black knight2
				var knightB = new ChessPieceImage('img/Black N.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.bishopB1:  	// black bishop1
			case boardLayoutObject.bishopB2:  	// black bishop2
				var bishopB = new ChessPieceImage('img/Black B.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.queenB1:  	// black queen
				var queenB = new ChessPieceImage('img/Black Q.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.kingB1:  	// black king
				var kingB = new ChessPieceImage('img/Black K.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.pawnB1:  	// black pawn1
			case boardLayoutObject.pawnB2:  	// black pawn2
			case boardLayoutObject.pawnB3:  	// black pawn3
			case boardLayoutObject.pawnB4:  	// black pawn4
			case boardLayoutObject.pawnB5:  	// black pawn5
			case boardLayoutObject.pawnB6:  	// black pawn6
			case boardLayoutObject.pawnB7:  	// black pawn7
			case boardLayoutObject.pawnB8:  	// black pawn8
				var pawnB = new ChessPieceImage('img/Black P.png', chessBoardObject, column, row);
				break;
			case null:  // do nothing
				break; // do nothing
			case boardLayoutObject.pawnW1:  	// white pawn1
			case boardLayoutObject.pawnW2:  	// white pawn2
			case boardLayoutObject.pawnW3:  	// white pawn3
			case boardLayoutObject.pawnW4:  	// white pawn4
			case boardLayoutObject.pawnW5:  	// white pawn5
			case boardLayoutObject.pawnW6:  	// white pawn6
			case boardLayoutObject.pawnW7:  	// white pawn7
			case boardLayoutObject.pawnW8:  	// white pawn8
				var pawnW = new ChessPieceImage('img/White P.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.rookW1:  	// white rook1
			case boardLayoutObject.rookW2:  	// white rook2
				var rookW = new ChessPieceImage('img/White R.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.knightW1:  	// white knight1
			case boardLayoutObject.knightW2:  	// white knight2
				var knightW = new ChessPieceImage('img/White N.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.bishopW1:  	// white bishop1
			case boardLayoutObject.bishopW2:	// white bishop2
				var bishopW = new ChessPieceImage('img/White B.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.queenW1:  	// white queen
				var queenW = new ChessPieceImage('img/White Q.png', chessBoardObject, column, row);
				break;
			case boardLayoutObject.kingW1:  	// white king
				var kingW = new ChessPieceImage('img/White K.png', chessBoardObject, column, row);
				break;
			default:
				// I hope this never happens
				console.log('something went wrong drawing chess pieces');
		}
	}

	Render.prototype.drawSquare = function (chessBoardObject, isPlayerTurn) {
		// firstly highlight the square the user clicked on
		// future me - update so only highlights on users pieces
		// only highlight if move has not ended
		if (isPlayerTurn) {
			chessBoardObject.drawSquare(chessBoardObject.squareClickedX, chessBoardObject.squareClickedY);
		}

		// now just redraw the selected piece
		this.drawPiece(chessBoardObject, chessBoardObject.squareClickedY, chessBoardObject.squareClickedX);
	}

	Render.prototype.drawPreviousSquare = function (chessBoardObject) {
		// When user clicks
		// future me - update so only highlights on users pieces
		// on first click of move there will be no value for prevSquareClicked, check for it:
		//if (typeof chessBoardObject.prevSquareClickedX !== "undefined" && typeof chessBoardObject.prevSquareClickedY !== "undefined") {
			// redraw previous square otherwise it will stay yellow!
			chessBoardObject.drawSquare(chessBoardObject.prevSquareClickedX, chessBoardObject.prevSquareClickedY);
			// now redraw piece on previously selected square
			this.drawPiece(chessBoardObject, chessBoardObject.prevSquareClickedY, chessBoardObject.prevSquareClickedX);
		//}
	}

	Render.prototype.getPieceClicked = function (boardLayoutObject, chessBoardObject) {
		this.selectedPiece = boardLayoutObject.pieceLayout[chessBoardObject.prevSquareClickedY][chessBoardObject.prevSquareClickedX];	
	};

	Render.prototype.movePiece = function (boardLayoutObject, chessBoardObject) {
		// only can move to an empty square
		// major rework here later!!
		if (boardLayoutObject.pieceLayout[chessBoardObject.squareClickedY][chessBoardObject.squareClickedX] === null) {
			// I had to temp store the piece obj to move in a variable, didn't need to do this for local moves
			// but do need to do it for websocket moves (oppenent moves), one fustrating/ time consuming bug!
			var tempObjPlaceHolder = boardLayoutObject.pieceLayout[chessBoardObject.prevSquareClickedY][chessBoardObject.prevSquareClickedX];
			// set previous square clicked to null as square will now be empty
			boardLayoutObject.pieceLayout[chessBoardObject.prevSquareClickedY][chessBoardObject.prevSquareClickedX] = null;
			// set current square clicked with piece from last square
			boardLayoutObject.pieceLayout[chessBoardObject.squareClickedY][chessBoardObject.squareClickedX] = tempObjPlaceHolder;
		} 
		// clear out selected piece ready for next move
		this.selectedPiece = "";
	};
	
	
	Render.prototype.endMove = function (chessBoardObject) {
		chessBoardObject.prevSquareClickedX = -1;
		chessBoardObject.prevSquareClickedY = -1;
		chessBoardObject.squareClickedX = -1;
		chessBoardObject.squareClickedY = -1;
		chessBoardObject.validFirstClick = false;
	}
}