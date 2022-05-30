import { Injectable } from '@angular/core';

export interface Vec2 {
  x: number;
  y: number;
}

export enum ShipState {
  FLOATING,
  SUNK
}

export enum Orientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal'
}

export interface Ship {
  startPosition: Vec2;
  orientation: Orientation;
  span: number;
  hits: number;
  state: ShipState; 
}

@Injectable({
  providedIn: 'root'
})
export class BoardUtilsService {

  checkOffBounds(cell: Vec2): boolean {
    return !(
      cell.x >= 0 && cell.x <= 10 &&
      cell.y >= 0 && cell.y <= 10
    ); // condition means InBounds - !condition means OffBounds
  }

  checkCellBussy(cell: Vec2, board: Array<Ship>) {
    // console.log(board);
    // Check if the cell is occupied by a piece of a ship
    let filteredBoard: Array<{index: number, ship: Ship}> = [];
    board.map((ship, index) => {
      // Filter complete set of ships by selecting just possible canddidates
      // in case of vertical, those that match the x position against the cell
      // in case of horizontal, those that match the y position
      if (
        (ship.orientation === Orientation.HORIZONTAL &&
        ship.startPosition.y === cell.y) ||
        (ship.orientation === Orientation.VERTICAL &&
        ship.startPosition.x === cell.x)
      ) {
        filteredBoard.push({
          index: index,
          ship: ship
        }); 
      }
    });
    if (filteredBoard.length) {
      // if no items on filteredBoard, cell is clear
      for (let i = 0; i < filteredBoard.length; i++) {
        let shipIndex = filteredBoard[i].index; 
        let ship = filteredBoard[i].ship;
        if (ship.orientation === Orientation.HORIZONTAL) {
          if (ship.startPosition.y === cell.y) {
            // check if vertical positions align: else, there is no match
            if (
              // check cell.x against [start U end] - U = union
              // start is declared
              // end is start + span - 1
              cell.x >= ship.startPosition.x &&
              cell.x <= ship.startPosition.x + ship.span - 1
            ) {
              return shipIndex + 1; // dirty fix to avoid 0 = falsy
            }
          }
        } else if (ship.orientation === Orientation.VERTICAL) { // (NOTE): 'else if' is not needed (can use 'else'), i'm just using it to clearly visualize the orientation on code
          if (ship.startPosition.x === cell.x) {
            // check if horizontal positions align: else, there is no match
            if (
              // check cell.y against [start U end] - U = union
              // start is declared
              // end is start + span - 1
              cell.y >= ship.startPosition.y &&
              cell.y <= ship.startPosition.y + ship.span - 1
            ) {
              return shipIndex + 1; // dirty fix to avoid 0 = falsy
            }
          }
        }
      }
    } else {
      return null;
    }
    return null;
  }

  checkAvailableCell(cell: Vec2, board: Array<Ship>): boolean {
    if (!this.checkOffBounds(cell)) {
      if (board.length === 0) {
        // Board has no items, can push without checking
        return true;
      }

      // Already exist a function to check if cell is occupied (bussy), 
      // opposite is empty 
      let result = !this.checkCellBussy(cell, board); 
      return result;

    } else {
      // Out of bounds
      return false;
    }
  }

  checkAvailableShipSpace(ship: Ship, board: Array<Ship>): boolean {
    if (ship.span === 1) {
      return this.checkAvailableCell(ship.startPosition, board);
    }
    // Define direction of ship intended to be placed on board
    if (ship.orientation === Orientation.HORIZONTAL) {
      // Traverse ship cells and check against other ships in the board
      for (let i = ship.startPosition.x; i <= ship.startPosition.x + ship.span; i++) {
        // checkAvailableCell checks OffBounds too
        if (!this.checkAvailableCell({x: i, y: ship.startPosition.y}, board)) {
          return false;
        }
      }
    } else if (ship.orientation === Orientation.VERTICAL) { //  (NOTE): 'else if' is not needed (can use 'else'), i'm just using it to clearly visualize the orientation on code
      // Traverse ship cells and check against other ships in the board
      for (let i = ship.startPosition.y; i <= ship.startPosition.y + ship.span; i++) {
        // checkAvailableCell checks OffBounds too
        if (!this.checkAvailableCell({x: ship.startPosition.x, y: i}, board)) {
          return false;
        }
      }
    }
    return true;
  }

  constructor() { }
}
