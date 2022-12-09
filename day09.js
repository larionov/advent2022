console.log('###########');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

let input = await Deno.readTextFile('./resources/input09.txt');
//input = await Deno.readTextFile('./resources/input09_demo.txt');

const moves = input
  .trim()
  .split('\n')
  .map((s) => s.trim().split(' '))
  .map(([a, b]) => [a, parseInt(b, 10)]);

const dist = (a, b) => {};
let T = [0, 0],
  H = [0, 0];
let map = {};
for (let [d, v] of moves) {
  console.log({ d, v });
  for (let i = 0; i < v; i++) {
    if (d === 'U') {
      H[1]++;
      if (H[1] - T[1] > 1) {
        T[1] = H[1] - 1;
        T[0] = H[0];
      }
    }
    if (d === 'D') {
      H[1]--;
      if (T[1] - H[1] > 1) {
        T[1] = H[1] + 1;
        T[0] = H[0];
      } // T[1]--;
    }
    if (d === 'L') {
      H[0]--;
      if (T[0] - H[0] > 1) {
        T[0] = H[0] + 1;
        T[1] = H[1];
      } //T[0]--;
    }
    if (d === 'R') {
      H[0]++;
      if (H[0] - T[0] > 1) {
        T[0] = H[0] - 1;
        T[1] = H[1];
      } //T[0]++;
    }
    console.log({ H, T });
    map[`${T[0]}-${T[1]}`] = 1;
  }
}

console.log({ map }, Object.keys(map).length);
