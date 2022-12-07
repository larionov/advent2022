console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";
const sumR = (acc, i) => i + acc;
import {
  intersection,
  union,
  difference,
} from "https://deno.land/x/set_operations/mod.ts";

const a = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const all = (await Deno.readTextFile("./resources/input03.txt"))
  .trim()
  .split("\n");
console.log({ all });
const toC = (c) => {
  const n = a.indexOf(c);
  return n;
};
const res = [];
for (let line of all) {
  console.log({ line });
  const p1 = new Set(
    line
      .slice(0, line.length / 2)
      .split("")
      .map(toC)
  );
  const p2 = new Set(
    line
      .slice(line.length / 2)
      .split("")
      .map(toC)
  );
  res.push(...intersection(p1, p2));
}
console.log(res.reduce(sumR, 0));
