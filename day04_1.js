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

const all = (await Deno.readTextFile("./resources/input04.txt"))
  .trim()
  .split("\n")
  .map((s) =>
    s.split(",").map((s) => s.split("-").map((i) => parseInt(i, 10)))
  );

const contains = ([[a, b], [x, y]]) => (x >= a && y <= b) || (a >= x && b <= y);
const contains2 = ([[a, b], [x, y]]) => (a < x && b < x) || (a > y && b > y);
for (let p of all) {
  console.log({ p });
}
console.log(
  { all },
  all.filter(contains2),
  all.length - all.filter(contains2).length
);
