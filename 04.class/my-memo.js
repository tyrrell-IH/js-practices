import readline from "readline";
import minimist from "minimist";
import { DBOperation } from "./db-operation.js";
import { SelectableList } from "./selectable-list.js";

const addMemo = () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");

  const rl = readline.createInterface({
    input: process.stdin,
  });

  const lines = [];
  rl.on("line", (line) => {
    lines.push(line);
  });

  rl.on("close", async () => {
    const memoDB = new DBOperation();
    await memoDB.insert(lines);
    await memoDB.disconnect();
  });
};

const showTitles = async () => {
  const memoDB = new DBOperation();
  const memos = await memoDB.selectAll();
  memos.forEach((memo) => {
    const title = memo.body.split("\n")[0];
    console.log(title);
  });
};

const showFullMemo = async () => {
  const memoDB = new DBOperation();
  const memos = await memoDB.selectAll();
  const list = await new SelectableList(memos);
  const memoID = await list.chooseMemo();
  const selectedMemo = await memoDB.selectByID(memoID);
  console.log(selectedMemo.body);
};

const deleteMemo = async () => {
  const memoDB = new DBOperation();
  const memos = await memoDB.selectAll();
  const list = await new SelectableList(memos);
  const memoID = await list.chooseMemo();
  await memoDB.delete(memoID);
};

const main = () => {
  const argv = minimist(process.argv.slice(2));
  if (argv.l) {
    showTitles();
  } else if (argv.r) {
    showFullMemo();
  } else if (argv.d) {
    deleteMemo();
  } else {
    addMemo();
  }
};

main();
