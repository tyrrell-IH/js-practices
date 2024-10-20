import pkg from "enquirer";
const { prompt } = pkg;

export class SelectableList {
  #titles;
  #instruction;
  constructor(memos, instruction) {
    this.#titles = memos.map((memo) => ({
      value: memo.id,
      name: memo.body.split(`\n`)[0],
    }));
    this.#instruction = instruction;
  }

  async selectMemo() {
    const question = {
      type: "select",
      name: "id",
      message: `Select a memo you want to ${this.#instruction}:`,
      choices: this.#titles,
      result() {
        return this.focused.value;
      },
    };
    const selectedMemo = await prompt(question);
    return selectedMemo.id;
  }
}
