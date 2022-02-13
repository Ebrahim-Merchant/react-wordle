import React, { useEffect, useState } from "react";
import { Evaluation, KeyPress } from "../../app.constants";
import { IGameCell } from "../../utils/GameGrid";

type Props = {
  onButtonClicked: Function;
  lastSubmittedRow: IGameCell[];
  evaluation?: Evaluation[];
};

interface IKey {
  key: string;
  evaluate: Evaluation | undefined;
}

const initKeyBoard = [
  {
    key: "Q",
    evaluate: undefined,
  },
  {
    key: "W",
    evaluate: undefined,
  },
  {
    key: "E",
    evaluate: undefined,
  },
  {
    key: "R",
    evaluate: undefined,
  },
  {
    key: "T",
    evaluate: undefined,
  },
  {
    key: "Y",
    evaluate: undefined,
  },
  {
    key: "U",
    evaluate: undefined,
  },
  {
    key: "I",
    evaluate: undefined,
  },
  {
    key: "O",
    evaluate: undefined,
  },
  {
    key: "P",
    evaluate: undefined,
  },
  {
    key: "space",
    evaluate: undefined,
  },
  {
    key: "A",
    evaluate: undefined,
  },
  {
    key: "S",
    evaluate: undefined,
  },
  {
    key: "D",
    evaluate: undefined,
  },
  {
    key: "F",
    evaluate: undefined,
  },
  {
    key: "G",
    evaluate: undefined,
  },
  {
    key: "H",
    evaluate: undefined,
  },
  {
    key: "J",
    evaluate: undefined,
  },
  {
    key: "K",
    evaluate: undefined,
  },
  {
    key: "L",
    evaluate: undefined,
  },
  {
    key: "space",
    evaluate: undefined,
  },
  {
    key: "ENTER",
    evaluate: undefined,
  },
  {
    key: "Z",
    evaluate: undefined,
  },
  {
    key: "X",
    evaluate: undefined,
  },
  {
    key: "C",
    evaluate: undefined,
  },
  {
    key: "V",
    evaluate: undefined,
  },
  {
    key: "B",
    evaluate: undefined,
  },
  {
    key: "N",
    evaluate: undefined,
  },
  {
    key: "M",
    evaluate: undefined,
  },
  {
    key: "BACKSPACE",
    evaluate: undefined,
  },
];

export const GameKeyboard = ({ onButtonClicked, lastSubmittedRow }: Props) => {
  const [keyboardState, setKeyboardState] = useState<Array<IKey>>(initKeyBoard);

  useEffect(() => {
    const newKeyboardState = Array.from(keyboardState);

    lastSubmittedRow.forEach((gameCell) => {
      const keyIndex = keyboardState.findIndex(
        ({ key }) => gameCell.content === key.toLowerCase()
      );
      
      if (keyIndex === -1) return;

      newKeyboardState[keyIndex] = {
        ...newKeyboardState[keyIndex],
        evaluate:
          newKeyboardState[keyIndex].evaluate === Evaluation.CORRECT
            ? Evaluation.CORRECT
            : gameCell.evaluate,
      };
    });
    setKeyboardState(newKeyboardState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastSubmittedRow]);

  function getKey(key: string, evaluate?: Evaluation) {
    if (key === "ENTER") {
      return (
        <button
          key={key}
          className="key large"
          data-key={key}
          onClick={() => onButtonClicked(KeyPress.ENTER)}
        >
          Enter
        </button>
      );
    }

    if (key === "BACKSPACE") {
      return (
        <button
          key={key}
          className="key large"
          data-key={key}
          onClick={() => onButtonClicked(KeyPress.BACKSPACE)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              fill="var(--color-tone-1)"
              d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
            ></path>
          </svg>
        </button>
      );
    }

    return (
      <button
        key={key}
        className={`key ${evaluate?.toLocaleLowerCase() ?? ""}`}
        data-key={key}
        onClick={() => onButtonClicked(key.toLocaleLowerCase())}
      >
        {key}
      </button>
    );
  }
  return (
    <div data-keyboard className="keyboard">
      {keyboardState.map((keyboardItem, index) =>
        keyboardItem.key === "space" ? (
          <div key={`space-${index}`} className="space"></div>
        ) : (
          getKey(keyboardItem.key, keyboardItem.evaluate)
        )
      )}
    </div>
  );
};
