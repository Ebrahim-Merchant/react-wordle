import { VALID_GUESSES } from "../validGuesses";

export const isValidGuess = (word: string): boolean => {
  return VALID_GUESSES.includes(word);
};
