import pkg from "enquirer";
const { prompt } = pkg;
import { MemoTitle } from "./memo-title.js";

export class SelectableList {
  constructor(memos) {
    this.titles = memos.map((memo) => {
      return new MemoTitle(memo);
    });
  }

  async chooseMemo() {
    const question = {
      type: "select",
      name: "id",
      message: "Choose a memo you want to see:",
      choices: this.titles,
      result() {
        return this.focused.value;
      },
    };
    const chosenMemo = await prompt(question);
    return chosenMemo.id;
  }
}
