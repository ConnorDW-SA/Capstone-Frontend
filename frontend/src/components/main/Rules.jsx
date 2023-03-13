export const validPawnMove = (board, x, y, newX, newY, player) => {
  const forward = player === "white" ? -1 : 1;
  const startRow = player === "white" ? 6 : 1;
  const endRow = player === "white" ? 0 : 7;
  const maxMove = startRow + forward * 2;

  if (newX === x + forward && newY === y && board[newX][newY] === "") {
    return true;
  } else if (
    newX === x + forward &&
    Math.abs(newY - y) === 1 &&
    board[newX][newY] !== "" &&
    board[newX][newY].toLowerCase() !== player
  ) {
    return true;
  } else if (
    newX === x + forward * 2 &&
    newY === y &&
    x === startRow &&
    board[newX][newY] === "" &&
    board[x + forward][newY] === ""
  ) {
    return true;
  }

  return false;
};

// ---------------------------------------------- PAWN MOVE LOGIC ----------------------------------------------

export const validBishopMove = (board, x, y, newX, newY) => {
  const deltaX = Math.abs(newX - x);
  const deltaY = Math.abs(newY - y);
  if (deltaX !== deltaY) {
    return false;
  }

  const xDir = (newX - x) / deltaX;
  const yDir = (newY - y) / deltaY;
  for (let i = 1; i < deltaX; i++) {
    if (board[x + i * xDir][y + i * yDir] !== "") {
      return false;
    }
  }

  if (
    board[newX][newY] !== "" &&
    board[newX][newY].toLowerCase() === board[x][y].toLowerCase()
  ) {
    return false;
  }

  return true;
};

// ---------------------------------------------- BISHOP MOVE LOGIC ----------------------------------------------
export const validKnightMove = (board, x, y, newX, newY) => {
  const deltaX = Math.abs(newX - x);
  const deltaY = Math.abs(newY - y);
  if (deltaX + deltaY !== 3 || deltaX === 0 || deltaY === 0) {
    return false;
  }

  if (
    board[newX][newY] !== "" &&
    board[newX][newY].toLowerCase() === board[x][y].toLowerCase()
  ) {
    return false;
  }

  return true;
};

// ---------------------------------------------- KNIGHT MOVE LOGIC ----------------------------------------------
export const validRookMove = (board, x, y, newX, newY) => {
  const deltaX = Math.abs(newX - x);
  const deltaY = Math.abs(newY - y);

  if (deltaX > 0 && deltaY > 0) {
    return false;
  }

  if (deltaX === 0) {
    const yDir = newY > y ? 1 : -1;
    for (let i = y + yDir; i !== newY; i += yDir) {
      if (board[x][i]) {
        return false;
      }
    }
  } else {
    const xDir = newX > x ? 1 : -1;
    for (let i = x + xDir; i !== newX; i += xDir) {
      if (board[i][y]) {
        return false;
      }
    }
  }

  if (
    board[newX][newY] !== "" &&
    board[newX][newY].toLowerCase() === board[x][y].toLowerCase()
  ) {
    return false;
  }

  return true;
};

// ---------------------------------------------- ROOK MOVE LOGIC ----------------------------------------------

export const validQueenMove = (board, x, y, newX, newY) => {
  return (
    validBishopMove(board, x, y, newX, newY) ||
    validRookMove(board, x, y, newX, newY)
  );
};

// ---------------------------------------------- QUEEN MOVE LOGIC ----------------------------------------------
export const validKingMove = (board, x, y, newX, newY) => {
  const deltaX = Math.abs(newX - x);
  const deltaY = Math.abs(newY - y);
  if (deltaX > 1 || deltaY > 1) {
    return false;
  }

  if (
    board[newX][newY] !== "" &&
    board[newX][newY].toLowerCase() === board[x][y].toLowerCase()
  ) {
    return false;
  }

  return true;
};

// ---------------------------------------------- KING MOVE LOGIC ----------------------------------------------

// ---------------------------------------------- CHECK LOGIC ----------------------------------------------

// ---------------------------------------------- CHECKMATE LOGIC ----------------------------------------------

// ---------------------------------------------- STALEMATE LOGIC ----------------------------------------------

// ---------------------------------------------- CASTLING LOGIC ----------------------------------------------

// ---------------------------------------------- EN PASSANT LOGIC ----------------------------------------------

// ---------------------------------------------- PROMOTION LOGIC ----------------------------------------------

// ---------------------------------------------- DRAW LOGIC ----------------------------------------------

// ---------------------------------------------- GAME OVER LOGIC ----------------------------------------------
