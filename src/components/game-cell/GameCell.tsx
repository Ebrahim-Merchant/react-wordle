import React from "react";
import { Evaluation } from "../../app.constants";

type Props = {
  content: string;
  evaluate?: Evaluation;
  animation?: "shake" | "dance";
};

export default function GameCell({ content, evaluate, animation }: Props) {
  return (
    <div
      className="tile"
      data-state={evaluate ? evaluate.toLowerCase() : ""}
      data-animation={animation ?? null}
    >
      {content}
    </div>
  );
}
