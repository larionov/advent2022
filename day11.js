console.log('\n\n\n\n###################################');
import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { writeAllSync } from 'https://deno.land/std/streams/conversion.ts';

let input = await Deno.readTextFile('./resources/input11_demo.txt');
//input = await Deno.readTextFile('./resources/input11.txt');
// input = `noop
// addx 3
// addx -5`;

const mem = {};

const prg = input
  .trim()
  .split('\n\n')
  .map((s) => s.split('\n'))
  .map((s) => {
    const m = {};
    m.id = parseInt(s[0].match(/\d+/)[0], 10);
    m.items = s[1]
      .split(':')[1]
      .trim()
      .split(', ')
      .map((i) => parseInt(i, 10));
    m.op = (old) => {
      const exp = s[2].split('= ')[1].replace('old', old);
      return eval(exp);
    };
    s[3] = parseInt(s[3].match(/\d+/), 10);
    s[4] = parseInt(s[4].match(/\d+/), 10);
    s[5] = parseInt(s[5].match(/\d+/), 10);
    m.cnt = 0;

    m.test = (v) => (v % s[3] ? s[5] : s[4]);
    return m;
  });

console.log({ prg });

for (let i = 0; i < 20; i++) {
  console.log('Round: ', i + 1);
  for (let m = 0; m < prg.length; m++) {
    const mn = prg[m];
    mn.cnt += mn.items.length;
    while (mn.items.length) {
      const it = mn.items.shift();
      let newIt = mn.op(it);
      newIt = Math.floor(newIt / 3);
      //console.log({ it, newIt }, mn.test(newIt));
      prg[mn.test(newIt)].items.push(newIt);
    }
  }
  //console.log({ prg });
}
const srt = prg.sort((a, b) => b.cnt - a.cnt);
console.log({ srt }, srt[0].cnt * srt[1].cnt);
