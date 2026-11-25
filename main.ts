// The Best Advice I Ever Got: a one-line piece of grandmotherly wisdom.
//
// This program is deterministic and offline. It writes exactly one line of
// text, followed by a trailing newline, to entry.txt inside the output
// directory. The output directory defaults to /output and can be overridden
// with the MAKEFUN_OUTPUT_DIR or OUTPUT_DIR environment variables.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY_TEXT: string =
  "Best advice I ever got: \"Nobody at the beach is thinking about your stomach.\" Grandma, serving confidence since 1962.";

function resolveOutputDir(): string {
  const fromMakefunEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromMakefunEnv !== undefined && fromMakefunEnv.trim() !== "") {
    return fromMakefunEnv;
  }
  const fromEnv = process.env.OUTPUT_DIR;
  if (fromEnv !== undefined && fromEnv.trim() !== "") {
    return fromEnv;
  }
  return "/output";
}

function main(): void {
  const outputDir = resolveOutputDir();
  mkdirSync(outputDir, { recursive: true });

  const entryPath = join(outputDir, "entry.txt");
  writeFileSync(entryPath, ENTRY_TEXT + "\n", { encoding: "utf8" });

  console.log(`entry written to ${entryPath}`);
}

main();
