console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";

const sMap = {
  A: 1,
  B: 2,
  C: 3,
};
const mMap = {
  X: "A",
  Y: "B",
  Z: "C",
};
const wMap = {
  A: "C",
  B: "A",
  C: "B",
};
const lMap = {
  A: "B",
  B: "C",
  C: "A",
};

function play(line) {
  const [pl1, _pl2] = line.split(" ");
  //  const pl2 = mMap[_pl2];
  let pl2;
  if (_pl2 === "X") pl2 = wMap[pl1];
  if (_pl2 === "Y") pl2 = pl1;
  if (_pl2 === "Z") pl2 = lMap[pl1];

  let res = 0;
  if (pl1 === pl2) res = 3 + sMap[pl2];
  else if (wMap[pl2] === pl1) res = 6 + sMap[pl2];
  else res = sMap[pl2];

  console.log({ line, pl1, pl2, res });
  return res;
}
const all = (await Deno.readTextFile("./resources/input02.txt"))
  .trim()
  .split("\n");

const res = all.map((l) => play(l));
console.log(res);
console.log(
  { res },
  res.reduce((acc, i) => acc + i, 0)
);
