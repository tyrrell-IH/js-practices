import pkg from "enquirer";
const { prompt } = pkg;

export class Menu {
  #titles;
  #instruction;
  constructor(memos, instruction) {
    this.#titles = memos.map((memo) => ({
      value: memo,
      name: memo.body.split(`\n`)[0],
    }));
    this.#instruction = instruction;
  }

  async fetchId() {
    const question = {
      type: "select",
      name: "memo",
      message: `Select a memo you want to ${this.#instruction}:`,
      choices: this.#titles,
      result() {
        return this.focused.value;
      },
    };
    const fetchedValue = await prompt(question);
    return fetchedValue.memo.id;
  }
}
