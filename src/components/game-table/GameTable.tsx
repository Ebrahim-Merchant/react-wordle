import React from "react";
import GameCell from "../game-cell/GameCell";
import { IGameCell } from "../../utils/GameGrid";

export const GameTable = ({
  grid,
  rowIndex,
  isInvalidRow,
  gameStatus
}: {
  grid: IGameCell[][];
  rowIndex: number;
  isInvalidRow: boolean;
  gameStatus: string;
}) => {

  function getAnimation(currentRow: number) {
    if (currentRow !== rowIndex) {
      return undefined;
    }

    if (isInvalidRow) {
      return "shake";
    }

    if (gameStatus === "WON") {
      return "dance";
    }
  }

  return (
    <div className="guess-grid">
      {grid.map((item, gRowIndex) =>
        item.map((gridCell, index) => (
          <GameCell
            key={index}
            animation={getAnimation(gRowIndex)}
            content={gridCell.content}
            evaluate={gridCell.evaluate}
          />
        ))
      )}
    </div>
  );
};
