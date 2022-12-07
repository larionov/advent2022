console.log("---");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";

const input = await Deno.readTextFile("./resources/input06.txt");

//const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";
//const input = "bvwbjplbgvbhsrlpgdmjqwftvncz";
//const input = "nppdvjthqldpwncqszvftbrmjlhg";
const buf = [...input.slice(0, 14)];
for (let i = 14; i < input.length; i++) {
  const b = new Set(buf);
  console.log({ buf, b, i });
  if (b.size === 14) {
    console.log({ i });
    break;
  }
  buf.push(input[i]);
  buf.shift();
}
