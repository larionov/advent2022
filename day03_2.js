console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";
import { Arrays } from "https://deno.land/x/arrays@v1.0.21/mod.ts";
const { chunk } = Arrays;
import {
  intersection,
  union,
  difference,
} from "https://deno.land/x/set_operations/mod.ts";

const a = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const all = (await Deno.readTextFile("./resources/input03.txt"))
  .trim()
  .split("\n");
const toC = (c) => {
  const n = a.indexOf(c);
  return n;
};
const res = [];
for (let g of all.chunk(3)) {
  console.log({ g });
  const a1 = new Set(g[0]);
  const a2 = new Set(g[1]);
  const a3 = new Set(g[2]);
  const i = [...intersection(a3, intersection(a1, a2))].map(toC);
  res.push(...i);
}
console.log(res.reduce((acc, i) => i + acc, 0));
