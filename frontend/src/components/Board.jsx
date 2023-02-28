import React, { useState } from "react";

// make 6 square board with h1 titled pawn that can be dragged and dropped to other squares

const isEven = (i, j) => (i + j) % 2 === 0;

const Board = () => {
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""]
  ]);

  const [pawn, setPawn] = useState({
    x: 0,
    y: 0
  });

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const squareId = e.target.id;
    const [x, y] = squareId.split("-").map((val) => parseInt(val));
    setPawn({ x, y });
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div className="row" key={i}>
          {row.map((square, j) => {
            const backgroundColor = isEven(i, j) ? "white" : "black";
            return (
              <div
                className="square"
                id={`${i}-${j}`}
                key={j}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                draggable={i === pawn.x && j === pawn.y}
                style={{ width: 50, height: 50, backgroundColor }}
              >
                {i === pawn.x && j === pawn.y && (
                  <h5
                    className="pawn"
                    id={`${i}-${j}`}
                    draggable
                    onDragStart={handleDragStart}
                  >
                    pawn
                  </h5>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
