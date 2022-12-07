console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";

const all = (await Deno.readTextFile("./resources/input05.txt"))
  .trimEnd()
  .split("\n\n");

const crates = all[0].split("\n");

const cratesNum = Math.floor((crates[crates.length - 1].length + 2) / 4);
console.log({ crates });

const stacks = [];
//  console.log({ floor });
for (let col = 0; col < cratesNum; col++) {
  stacks[col] = [];

  for (let floor = crates.length - 2; floor >= 0; floor--) {
    //    console.log({ floor, col });
    const val = (crates[floor][col * 4 + 1] || "").trim();
    if (val) stacks[col].push(val);
  }
}
console.log({ stacks });
const moves = all[1].split("\n").map((s) => s.split(" "));
for (let [_, scnt, _2, sfrom, _3, sto] of moves) {
  const [cnt, from, to] = [parseInt(scnt), parseInt(sfrom), parseInt(sto)];
  console.log({ cnt, from, to });
  const pick = stacks[from - 1].slice(-cnt);
  stacks[from - 1].splice(-cnt);
  stacks[to - 1].push(...pick);
  console.log({ pick });
  // for (let i = 0; i < cnt; i++) {
  //   console.log({ from, to }, stacks[from - 1], stacks[to - 1]);
  //   stacks[to - 1].push(stacks[from - 1].pop());
  // }
}

console.log({ stacks });
console.log(stacks.map((s) => s[s.length - 1]).join(""));
