import { Injectable } from '@angular/core';
import { BoardUtilsService, Orientation, Ship, ShipState, Vec2 } from './board-utils.service';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

  private board: Array<Ship> = [];
  private maxSpanOfShip = 4;

  constructor(
    protected boardUtils: BoardUtilsService 
  ) { }

  generateBoard() {
    // generate ships
    for (let i = 0; i < this.maxSpanOfShip; i++) {
      for (let j = 0; j < this.maxSpanOfShip - i; j++) {
        this.generateShip(i + 1);
      }
    }
    // return board object;
  }

  // (NOTE): This is mostly a brute force algorithm
  // There are papers on the web that utilizes better ways of generating the ships using
  // Binary trees and other smarter structures, but I wanted to try it out on my own
  // to see what i can come up with
  generateShip(span: number) {
    // generate random start position
    let startPosition: Vec2 = {
      x: Math.floor(Math.random() * 10),
      y: Math.floor(Math.random() * 10)
    };
    // give random orientation
    let orientation = (Math.random() <= 0.5 ? Orientation.HORIZONTAL : Orientation.VERTICAL);
    // initialize ship
    let ship = {
      startPosition: startPosition,
      orientation: orientation,
      span: span,
      hits: 0,
      state: ShipState.FLOATING
    };
    if (this.boardUtils.checkAvailableShipSpace(ship, this.board)) {
      // if ship can be placed, push to board
      this.board.push(ship);
    } else {
      // if ship can't be placed, roll dice again
      this.generateShip(span);

      // (NOTE): This section can be optimized further if instead of rolling the dice again, 
      // it searches for available neightbours and flip orientation
    }
  }

  getBoard() {
    return this.board;
  }
}
