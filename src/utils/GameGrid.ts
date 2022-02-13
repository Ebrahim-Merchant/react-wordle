import { Evaluation } from "../app.constants";
import { DailyWord } from "./dailyWord";

export const NUM_OF_ROWS = 6;
export const NUM_OF_COLs = 5;

export interface IGameCell {
  content: string;
  evaluate?: Evaluation;
}

export interface IGameState {
  grid: GameGrid;
  isInvalidRow: boolean;
  gameStatus: "WON" | "IN_PROGRESS";
}

export function evaluateRow(
  grid: GameGrid,
  dailyWord: DailyWord,
  isWord?: boolean
) {
  const newGrid: GameGrid = Object.assign(grid);
  const evaluatedRow = grid
    .getLastRow()
    .map((gameCell: IGameCell, index: number) => {
      return {
        content: gameCell.content,
        evaluate: isWord
          ? Evaluation.CORRECT
          : getEvalState(dailyWord, gameCell.content, index),
      };
    });
  newGrid.updateLastRow(evaluatedRow);
  return newGrid;
}

function getEvalState(dailyWord: DailyWord, letter: string, index: number) {
  if (dailyWord.hasLetter(letter)) {
    if (dailyWord.hasLetterAt(letter, index)) {
      return Evaluation.CORRECT;
    }
    return Evaluation.PRESENT;
  }
  return Evaluation.ABSENT;
}

export class GameGrid {
  private _grid: IGameCell[][];
  private _rowIndex: number;
  private _columnIndex: number;
  private LAST_CELL = 4;

  public get columnIndex(): number {
    return this._columnIndex;
  }
  public set columnIndex(value: number) {
    this._columnIndex = value;
  }

  public get rowIndex(): number {
    return this._rowIndex;
  }
  public set rowIndex(value: number) {
    this._rowIndex = value;
  }

  public get grid(): IGameCell[][] {
    return this._grid;
  }
  public set grid(value: IGameCell[][]) {
    this._grid = value;
  }

  constructor() {
    this._grid = this.initGrid();
    this._rowIndex = 0;
    this._columnIndex = -1;
  }

  public initGrid() {
    return Array(NUM_OF_ROWS)
      .fill(undefined)
      .map(() =>
        Array(NUM_OF_COLs).fill({
          content: "",
          evaluate: "",
        })
      );
  }

  public getLastRow(): IGameCell[] {
    return this.grid[this.rowIndex];
  }

  public updateRow(row: number, value: IGameCell[]): void {
    this.grid[row] = value;
  }

  public updateLastRow(value: IGameCell[]): void {
    this.updateRow(this.rowIndex, value);
  }

  public updateNextCell(value: IGameCell): void {
    if(this.columnIndex === this.LAST_CELL) {
      return;
    }
    this.incrementColumn();
    this.grid[this.rowIndex][this.columnIndex] = value;

  }

  public deleteLastCell(): void {
    this.grid[this.rowIndex][this.columnIndex] = {
      content: "",
      evaluate: undefined,
    };
    this.decrementColumn();

  }

  public incrementRow() {
    if (this.rowIndex < NUM_OF_ROWS - 1) {
      this.rowIndex++;
      this.resetColumn();
    }
  }

  public incrementColumn() {
    if (this.columnIndex < NUM_OF_COLs - 1) {
      this.columnIndex++;
    }
  }

  public decrementColumn() {
    if (this.columnIndex >= 0) {
      this.columnIndex--;
    }
  }

  public resetColumn() {
    this.columnIndex = -1;
  }

  public getLastWord(): string {
    return this.getLastRow().map(({ content }) => content).join("");
  }
}
