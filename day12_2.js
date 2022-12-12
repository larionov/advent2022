console.log('\n\n\n\n###################################');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

let input = await Deno.readTextFile('./resources/input12.txt');
//input = await Deno.readTextFile('./resources/input12_demo.txt');

const el = (c) => c.charCodeAt(0);
const dist = (a, b) => a.charCodeAt(0) - b.charCodeAt(0);

const nei = (i, j, w, h) =>
  [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ]
    .map(([dy, dx]) => [i + dy, j + dx])
    .filter(([i, j]) => {
      if (i < 0 || j < 0) return false;
      if (i > h - 1 || j > w - 1) return false;
      return true;
    });
const get = (prg, [i, j]) => prg[i][j];
const mem = {};
let d = 1;
const prg = input
  .trim()
  .split('\n')
  .map((s) => s.split(''));

let start = []; //[0, 0];
let end = [0, 0];
let h = prg.length,
  w = prg[0].length;
for (let r = 0; r < prg.length; r++) {
  for (let c = 0; c < prg[0].length; c++) {
    if (prg[r][c] === 'S' || prg[r][c] === 'a') {
      start.push([r, c]);
    }
    if (prg[r][c] === 'E') {
      end = [r, c];
    }
  }
}

const q = start.map((s) => [s, 0]);
const cache = {};
const res = [];

while (q.length) {
  q.sort((a, b) => cache[b[0].join('-')] - cache[a[0].join('-')]);
  const top = q.pop();

  const [el, len] = top;

  const neis = nei(...el, w, h);

  for (let ch of neis) {
    let dst = dist(get(prg, ch), get(prg, el));
    if (get(prg, ch) === 'E') {
      dst = dist('z', get(prg, el));
    }
    if (get(prg, el) === get(prg, ch) || get(prg, el) === 'S' || dst <= 1) {
      if (!cache[ch.join('-')] || cache[ch.join('-')] > len + 1) {
        cache[ch.join('-')] = len + 1;
        q.push([ch, len + 1]);
      }
    }
  }
}

console.log(cache[end.join('-')]);
