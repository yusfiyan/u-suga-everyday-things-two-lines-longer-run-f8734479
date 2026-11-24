// Everyday Things, Two Lines — entry for
// u-suga-everyday-things-two-lines-longer-run-f8734479
// Line 1 explains one everyday thing (a queue) to a 10-year-old in a
// single vivid sentence built on one analogy. Line 2 says in one
// sentence why the analogy works: what it maps and what it leaves out.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "A queue is a human train: each person is a carriage, and the whole line only moves when the engine at the front rolls forward.\n" +
  "It maps how everyone moves together in order and waits their turn, but it leaves out that people can step out, chat, or cut in, which carriages never do.\n";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Gate guard: the sealed scorer only accepts UTF-8 text of 1-400
// characters, so refuse to write anything that is not exactly two
// non-empty lines, each a single sentence ending in a full stop.
const text = ENTRY.replace(/\n$/, "");
const lines = text.split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${text.length}`);
}
for (const line of lines) {
  if (!line.trim() || !line.trim().endsWith(".")) {
    throw new Error("each line must be a single sentence ending in '.'");
  }
  if (line.trim().split(".").length - 1 !== 1) {
    throw new Error("each line must contain exactly one sentence");
  }
}

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
