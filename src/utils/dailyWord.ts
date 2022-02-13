import { WORDS } from "../wordList";

export class DailyWord {
  private _todaysWord: string;

  constructor() {
    this._todaysWord = WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  public get todaysWord(): string {
    return this._todaysWord;
  }

  public set todaysWord(value: string) {
    this._todaysWord = value;
  }

  public hasLetter(letter: string) {
    const letterIndex = this.todaysWord.indexOf(letter);
    if (letterIndex > -1) {
      return true;
    }
    return false;
  }

  public hasLetterAt(letter: string, index: number): boolean {
    return this.todaysWord.charAt(index) === letter;
  }

  public isEqual(word: string) {
    return word === this.todaysWord;
  }
}
