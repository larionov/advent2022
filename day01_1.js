console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";

// dconst all = [];
// for await (let line of readLines(Deno.stdin)) {
//   console.log({ line });
//   all.push(line.split("").map((v) => parseInt(v, 10)));
// }

const all = (await Deno.readTextFile("./resources/input01.txt"))
  .trim()
  .split("\n\n");
const sums = all.map((e) => {
  const w = e.split("\n").map((i) => parseInt(i, 10));
  //  console.log(w);
  return w.reduce((acc, s) => acc + s, 0);
});
sums.sort((a, b) => b - a);
console.log(sums[0] + sums[1] + sums[2]);
//console.log({ sums, all });
