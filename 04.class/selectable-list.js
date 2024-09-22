import pkg from "enquirer";
const { prompt } = pkg;
import { Title } from "./title.js";

export class SelectableList {
  constructor(memos) {
    this.titles = memos.map((memo) => {
      return new Title(memo);
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
