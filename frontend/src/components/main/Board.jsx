import React, { useState, useEffect } from "react";
import BlackKing from "../../assets/pieces/b-king.png";
import BlackQueen from "../../assets/pieces/b-queen.png";
import BlackBishop from "../../assets/pieces/b-bishop.png";
import BlackKnight from "../../assets/pieces/b-knight.png";
import BlackRook from "../../assets/pieces/b-rook.png";
import BlackPawn from "../../assets/pieces/b-pawn.png";

import WhiteKing from "../../assets/pieces/w-king.png";
import WhiteQueen from "../../assets/pieces/w-queen.png";
import WhiteBishop from "../../assets/pieces/w-bishop.png";
import WhiteKnight from "../../assets/pieces/w-knight.png";
import WhiteRook from "../../assets/pieces/w-rook.png";
import WhitePawn from "../../assets/pieces/w-pawn.png";

import {
  validPawnMove,
  validBishopMove,
  validKnightMove,
  validRookMove,
  validQueenMove,
  validKingMove
} from "./Rules";

const isEven = (i, j) => (i + j) % 2 === 0;

const pieceMap = {
  K: WhiteKing,
  Q: WhiteQueen,
  B: WhiteBishop,
  N: WhiteKnight,
  R: WhiteRook,
  P: WhitePawn,
  k: BlackKing,
  q: BlackQueen,
  b: BlackBishop,
  n: BlackKnight,
  r: BlackRook,
  p: BlackPawn
};

const Board = () => {
  const [player, setPlayer] = useState("white");
  const [board, setBoard] = useState([
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
  ]);

  const [selectedPiece, setSelectedPiece] = useState(null);

  const handleDragStart = (e) => {
    const id = e.target.id;

    const [x, y] = id.split("-").map((val) => parseInt(val));
    const pieceColor =
      board[x][y].toLowerCase() === board[x][y] ? "black" : "white";

    if (pieceColor === player) {
      setSelectedPiece({ piece: board[x][y], x, y });

      e.dataTransfer.setData("text/plain", id);
    } else {
      e.preventDefault();
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const [newX, newY] = id.split("-").map((val) => parseInt(val));

    const newBoard = [...board];
    const piece = newBoard[selectedPiece.x][selectedPiece.y];

    if (selectedPiece.x === newX && selectedPiece.y === newY) {
      return;
    }

    const isPieceAtDestinationSquare = newBoard[newX][newY] !== "";
    const isTakingOwnPiece =
      isPieceAtDestinationSquare &&
      newBoard[newX][newY].toLowerCase() === piece.toLowerCase();

    const isTakingSameColorPiece =
      isPieceAtDestinationSquare &&
      newBoard[newX][newY].toLowerCase() !== piece.toLowerCase() &&
      ((player !== "white" &&
        newBoard[newX][newY].toLowerCase() ===
          newBoard[newX][newY].toLowerCase()) ||
        (player !== "black" &&
          newBoard[newX][newY].toUpperCase() ===
            newBoard[newX][newY].toUpperCase()));

    if (isTakingOwnPiece || isTakingSameColorPiece) {
      return;
    }

    const movingPiece = board[selectedPiece.x][selectedPiece.y];

    if (movingPiece.toLowerCase() === "n") {
      if (
        !validKnightMove(newBoard, selectedPiece.x, selectedPiece.y, newX, newY)
      ) {
        return;
      }
    }
    if (movingPiece.toLowerCase() === "b") {
      if (
        !validBishopMove(newBoard, selectedPiece.x, selectedPiece.y, newX, newY)
      ) {
        return;
      }
    }
    if (movingPiece.toLowerCase() === "r") {
      if (
        !validRookMove(newBoard, selectedPiece.x, selectedPiece.y, newX, newY)
      ) {
        return;
      }
    }
    if (movingPiece.toLowerCase() === "q") {
      if (
        !validQueenMove(newBoard, selectedPiece.x, selectedPiece.y, newX, newY)
      ) {
        return;
      }
    }
    if (movingPiece.toLowerCase() === "k") {
      if (
        !validKingMove(newBoard, selectedPiece.x, selectedPiece.y, newX, newY)
      ) {
        return;
      }
    }
    if (movingPiece.toLowerCase() === "p") {
      if (
        !validPawnMove(
          newBoard,
          selectedPiece.x,
          selectedPiece.y,
          newX,
          newY,
          player
        )
      ) {
        return;
      }
    }

    newBoard[selectedPiece.x][selectedPiece.y] = "";
    newBoard[newX][newY] = piece;

    setBoard(newBoard);
    setSelectedPiece(null);
    setPlayer(player === "white" ? "black" : "white");
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((piece, j) => (
            <div
              className={`square ${isEven(i, j) ? "white" : "black"}`}
              key={j}
              id={`${i}-${j}`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {piece && (
                <img
                  src={pieceMap[piece]}
                  alt={piece}
                  id={`${i}-${j}`}
                  draggable
                  onDragStart={handleDragStart}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default Board;
