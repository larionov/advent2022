console.log('\n\n\n\n###################################3');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

let input = await Deno.readTextFile('./resources/input09.txt');
// input = await Deno.readTextFile('./resources/input09_demo.txt');
// input = `R 5
// U 8
// L 8
// D 3
// R 17
// D 10
// L 25
// U 20`;
const moves = input
  .trim()
  .split('\n')
  .map((s) => s.trim().split(' '))
  .map(([a, b]) => [a, parseInt(b, 10)]);

const print = (m, T) => {
  for (let x = -5; x < 5; x++) {
    for (let y = -5; y < 5; y++) {
      let c = '.';
      for (let i = 9; i >= 0; i--)
        if (T[i][0] == y && T[i][1] === x) c = `${i}`;
      if (m[`${y}-${x}`]) c = 'T';
      writeAllSync(Deno.stdout, new TextEncoder().encode(c));
    }
    writeAllSync(Deno.stdout, new TextEncoder().encode('\n'));
  }
  console.log(m);
};
const dist = (a, b) => {};
let H = [0, 0],
  T =
    //[0, 0];
    [
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ];
let map = {};
const proc = (head, tail) => {
  tail[0] = [...head];
  for (let i = 0; i < 10; i++) {
    let H = tail[i];
    let T = tail[i + 1];
    if (H[1] - T[1] > 1) {
      T[1]++;
      if (H[0] > T[0]) T[0]++;
      else if (H[0] < T[0]) T[0]--;
    }
    if (T[1] - H[1] > 1) {
      T[1]--;
      if (H[0] > T[0]) T[0]++;
      else if (H[0] < T[0]) T[0]--;
    } // T[1]--;
    if (T[0] - H[0] > 1) {
      T[0]--;
      if (H[1] > T[1]) T[1]++;
      else if (H[1] < T[1]) T[1]--;
    } //T[0]--;
    if (H[0] - T[0] > 1) {
      T[0]++;
      if (H[1] > T[1]) T[1]++;
      else if (H[1] < T[1]) T[1]--;
    } //T[0]++;
  }
};
for (let [d, v] of moves) {
  console.log({ d, v });
  for (let i = 0; i < v; i++) {
    if (d === 'U') {
      H[1]++;
    }
    if (d === 'D') {
      H[1]--;
    }
    if (d === 'L') {
      H[0]--;
    }
    if (d === 'R') {
      H[0]++;
    }
    proc(H, T);
    //    console.log({ H, T });
    map[`${T[9][0]}-${T[9][1]}`] = 1;
    //    print(map, T);
  }
}

console.log({ map }, Object.keys(map).length);
