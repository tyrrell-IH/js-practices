export class MemoTitle {
  constructor(memo) {
    this.name = memo.body.split("\n")[0];
    this.value = memo.id;
  }
}
