console.log('\n\n\n\n###################################3');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

let input = await Deno.readTextFile('./resources/input10_demo.txt');
input = await Deno.readTextFile('./resources/input10.txt');
// input = `noop
// addx 3
// addx -5`;

const prg = input
  .trim()
  .split('\n')
  .map((s) => s.trim().split(' '));
let ops = [];
for (let [i, v] of prg) {
  if (i === 'addx') {
    ops.push(['noop']);
    ops.push(['addx', parseInt(v, 10)]);
  }
  if (i === 'noop') ops.push(['noop']);
}

let s = [[], [], [], [], [], []];

const reg = { X: 1 };
let res = 0;
let cycle = 0;
for (let [i, v] of ops) {
  const x = cycle % 40,
    y = Math.floor(cycle / 40);
  cycle++;

  if (reg.X === x || reg.X === x - 1 || reg.X === x + 1) {
    s[y].push('#');
  } else {
    s[y].push('.');
  }
  if (i === 'addx') reg.X += v;
}
console.log(
  { reg },
  s.map((l) => l.join('')),
);
