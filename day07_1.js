console.log("###########");
import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";
import { range } from "https://deno.land/x/it_range@v1.0.3/range.mjs";
import { slidingWindows } from "https://deno.land/std@0.116.0/collections/mod.ts";
import count from "https://deno.land/x/denodash@0.1.3/src/collection/count.ts";

const input = await Deno.readTextFile("./resources/input07.txt");
const cmds = input
  .trim()
  .split("$")
  .map((s) => s.trim().split("\n").filter(Boolean))
  .filter((a) => a.length > 0);
//console.log({ cmds });
const root = {
  dirs: {},
  files: [],
  path: [],
  totalSize: 0,
};
let pwd = root;

const cd = (pwd, dir) => {
  if (dir === "..") {
    return pwd.parent;
  }
  if (!pwd.dirs[dir])
    pwd.dirs[dir] = {
      dirs: {},
      files: [],
      name: dir,
      parent: pwd,
      totalSize: 0,
      path: [...pwd.path, pwd],
    };
  return pwd.dirs[dir];
};

for (let l of cmds) {
  if (l.length === 1) {
    let [cm, val] = l[0].split(" ");
    if (cm === "cd") pwd = cd(pwd, val);
  } else {
    if (l[0] === "ls") {
      const list = l.slice(1);
      for (let e of list) {
        let [size, name] = e.split(" ");
        if (size === "dir") {
          console.log("--", pwd);
          pwd.dirs[name] = {
            name,
            dirs: {},
            files: [],
            parent: pwd,
            totalSize: 0,
            path: [...pwd.path, pwd],
          };
        } else {
          const s = parseInt(size, 10);
          pwd.files.push({ name, size: s });
          pwd.totalSize += s;
          pwd.path.forEach((p) => (p.totalSize += s));
        }
      }
    }
  }
  console.log({ l });
}

let res = 0;
let arr = [];
const scanSizes = (r) => {
  arr.push(r.totalSize);
  if (r.totalSize < 100000) res += r.totalSize;
  for (let c of Object.values(r.dirs)) {
    scanSizes(c);
  }
};
scanSizes(root);
console.log(res);
console.log(root.dirs["/"]);

const toFree = 30000000 - (70000000 - root.totalSize);
arr.sort((a, b) => a - b);
arr = arr.filter((a) => a > toFree);
console.log({ toFree, arr }, arr[0]);
