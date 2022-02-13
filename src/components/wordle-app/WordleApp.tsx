import React, { useContext, useState } from "react";
import { GameTable } from "@components/game-table/GameTable";
import { evaluateRow, GameGrid, IGameCell, IGameState } from "@utils/GameGrid";
import { useAcceptedKeyPress } from "@hooks/keyPressHook";
import { ModalContext } from "../../App";
import { Evaluation, KeyPress } from "../../app.constants";
import { DailyWord } from "@utils/dailyWord";
import { isValidGuess } from "@utils/validation";
import { GameKeyboard } from "@components/game-keyboard/GameKeyboard";

export const WordleAppContext = React.createContext<any>(undefined);
const dailyWord = new DailyWord();


export const WordleAppContainer = () => {
  const [lastSubmittedRow, setLastSubmittedRow] = useState<IGameCell[]>([]);
  const [gameState, setGameState] = useState<IGameState>({
    grid: new GameGrid(),
    isInvalidRow: false,
    gameStatus: 'IN_PROGRESS'

  });

  const { grid, isInvalidRow, gameStatus } = gameState;
  const { setShowOverlay, setMessage } = useContext(ModalContext);
  const handleKey = (key: string) => {
    if (key === KeyPress.ENTER) {
      submitRow();
      return;
    }

    if (key === KeyPress.BACKSPACE) {
      if (grid.columnIndex >= 0) {
        const newGrid = Object.assign(grid);
        newGrid.deleteLastCell();
        setGameState({...gameState, grid: newGrid})
      }
      return;
    }

    if (grid.columnIndex < 5) {
      const newGrid = Object.assign(grid);
      newGrid.updateNextCell({
        content: key,
        evaluate: Evaluation.ACTIVE,
      })
      setGameState({...gameState, grid: newGrid})
    }
  };

  useAcceptedKeyPress(handleKey,[grid.columnIndex]);

  function submitRow() {
    const guessedWord = grid.getLastWord();

    //Not 5 letters
    if (guessedWord.length !== 5) {
      return;
    }

    //isNotValid so return
    if (!isValidGuess(guessedWord)) {
      message("Not a valid word");
      setGameState({
        ...gameState,
        isInvalidRow: true
      });
      return;
    }

    if (dailyWord.isEqual(guessedWord)) {
      message("Congrats 🎉🎉");
      const evaluatedGrid = evaluateRow(grid, dailyWord, true);
      setGameState({
        ...gameState,
        grid: evaluatedGrid,
        isInvalidRow: false,
        gameStatus: 'WON'
      });
      setLastSubmittedRow(evaluatedGrid.getLastRow());

      return;
    }

    if (grid.rowIndex === 5) {
      message(`The word is ${dailyWord.todaysWord.toUpperCase()}`);
    }
    const evaluatedGrid = evaluateRow(grid, dailyWord);
    const lastRow = evaluatedGrid.getLastRow();
    evaluatedGrid.incrementRow();
    setGameState({
      ...gameState,
      grid: evaluatedGrid,
      isInvalidRow: false
    });
    setLastSubmittedRow(lastRow);
  }
  
  function message(message: string) {
    setMessage(message);
    setShowOverlay(true);
  }

  return (
    <>
      <GameTable grid={grid.grid} rowIndex={grid.rowIndex} isInvalidRow={isInvalidRow} gameStatus={gameStatus}/>
      <GameKeyboard onButtonClicked={handleKey} lastSubmittedRow={lastSubmittedRow} />
    </>
  );
};
