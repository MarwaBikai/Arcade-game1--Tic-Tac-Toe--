const state = {
  gameElement: document.querySelector(".game"),

  cells: Array(9).fill(null),
  symbols: ["O", "X"],
  winningCombinations: [
    [0, 1, 2], //first row
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], //second  and third row
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], //winning coulmnds combinations
    [2, 4, 6] // diagonals combonations of winning
  ],
  gameFinished: false
};
function drawBoard() {
  state.gameElement.innerHTML = " ";
  for (let i = 0; i < 9; i++) {
    //a for loop to add the cells ( 9 cells )

    const cell = document.createElement("div"); //creating a div
    cell.classList.add("cell"); // the class of the div is 'cell'

    if (state.cells[i]) {
      //does the ceel have an x or an O // if yes the code runs

      const cellSymbol = document.createElement("p"); // <p clss="symbol"></p>//create a paragraph element
      cellSymbol.innerText = state.cells[i];
      cellSymbol.classList.add("symbol");
      cell.append(cellSymbol);
    } else {
      // if it's empty run this section
      cell.addEventListener("click", function () {
        if (state.gameFinished) {
          // if the game is finished the below code , no longer runs
          return;
        }
        state.symbols.reverse();
        const currentPlayerSymbol = state.symbols[0];
        //state.cells[i] = currentPlayerSymbol
        state.cells[i] = currentPlayerSymbol;

        drawBoard();

        if (checkForWinner()) {
          //winner code
          state.gameFinished = true;
          drawMessage(`Congratulations , ${state.symbols[0]} WON!`);
          //return
        }
        if (checkForDraw()) {
          drawMessage("It's a draw!");
        }
      });
    }

    // 2 parameters first is the string ( name ) of the action that the functions is waiting for
    state.gameElement.append(cell); // add to my 'game' class , the cells ( 9 of them )
  }
}
function drawMessage(message) {
  const banner = document.createElement("div");
  banner.classList.add("banner");

  const h1 = document.createElement("h1");
  h1.innerText = message;

  banner.append(h1);

  state.gameElement.append(banner);
}

function checkForDraw() {
  return state.cells.every(function (cell) {
    return cell != null;
  });
}

function checkForWinner() {
  return state.winningCombinations.some(function (combo) {
    const cells = combo.map(function (index) {
      return state.cells[index];
    });

    return !cells.includes(null) && new Set(cells).size === 1; // set  works : if get rid of duplicates , so if it it given 3 same elements (unique) elements , so if it's given [x,o,x] it gives [x,0] (with size of 2 )if it's given [x,x] it gives [x] (with size 1) SO to check if the combo has only x or o ( winning condition) so the sizde of the list is definitely 1 !
    // ! means the cells doesn't include null values , similiar to .notInclude() function :)
  });
}

drawBoard();
