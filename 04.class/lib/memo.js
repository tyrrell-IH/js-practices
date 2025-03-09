export class Memo {
  #memoParams;

  constructor(memoParams) {
    this.#memoParams = memoParams;
  }

  async save(memoRepository) {
    await memoRepository.create(this.#memoParams);
  }
}
