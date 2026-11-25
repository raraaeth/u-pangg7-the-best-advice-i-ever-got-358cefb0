// The Best Advice I Ever Got: a one-line piece of grandmotherly wisdom.
//
// This program is deterministic and offline. It writes exactly one line of
// text, followed by a trailing newline, to entry.txt inside the output
// directory. The output directory defaults to /output and can be overridden
// with the MAKEFUN_OUTPUT_DIR or OUTPUT_DIR environment variables.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
  const expectedContent = ENTRY_TEXT + "\n";
  writeFileSync(entryPath, expectedContent, { encoding: "utf8" });

  // Verify after writing: read the file back and fail loudly if its
  // content is not exactly what was intended.
  const writtenContent = readFileSync(entryPath, { encoding: "utf8" });
  if (writtenContent !== expectedContent) {
    console.error(`verification failed for ${entryPath}`);
    process.exit(1);
  }

  console.log(`entry written to ${entryPath}`);
}

main();
