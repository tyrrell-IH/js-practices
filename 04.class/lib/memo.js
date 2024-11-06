export class Memo {
  #memoParam;

  constructor(memoParam) {
    this.#memoParam = memoParam;
  }

  async save(memoRepository) {
    await memoRepository.create(this.#memoParam);
  }
}
