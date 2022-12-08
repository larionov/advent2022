console.log('###########');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

const input = await Deno.readTextFile('./resources/input08.txt');
// const input = `30373
// 25512
// 65332
// 33549
// 35390`;
const map = input
  .trim()
  .split('\n')
  .map((s) =>
    s
      .trim()
      .split('')
      .map((i) => parseInt(i, 10)),
  );

console.log({ map });

const visible = {};
let maxScore = 1;
for (let r = 0; r < map.length; r++) {
  for (let c = 0; c < map.length; c++) {
    console.log({ r, c }, map[r][c]);
    const scores = [0, 0, 0, 0];
    let isV = true;
    for (let x = r - 1, y = c; x >= 0; x--) {
      scores[0]++;
      if (map[x][y] >= map[r][c]) {
        isV = false;
        break;
      }
    }
    console.log('1', isV);
    if (isV) visible[`${r}-${c}`] = true;

    isV = true;
    for (let x = r, y = c - 1; y >= 0; y--) {
      scores[1]++;
      if (map[x][y] >= map[r][c]) {
        isV = false;
        break;
      }
    }
    console.log('3', isV);
    if (isV) visible[`${r}-${c}`] = true;

    isV = true;
    for (let x = r, y = c + 1; y < map[0].length; y++) {
      //      console.log({ x, y, r, c }, map[x][y], map[r][c]);
      scores[2]++;
      if (map[x][y] >= map[r][c]) {
        isV = false;
        break;
      }
    }
    console.log('4', isV);

    isV = true;
    for (let x = r + 1, y = c; x < map.length; x++) {
      scores[3]++;
      if (map[x][y] >= map[r][c]) {
        isV = false;
        break;
      }
    }
    console.log('2', isV);
    if (isV) visible[`${r}-${c}`] = true;

    const score = scores.reduce((acc, c) => acc * c, 1);
    console.log({ scores }, score);
    if (score > maxScore) maxScore = score;
    if (isV) visible[`${r}-${c}`] = true;
  }
}

console.log({ visible }, Object.keys(visible).length, maxScore);
