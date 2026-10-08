#!/usr/bin/env bun
/** Local prototype launcher; all simulation/serialization code lives upstream. */
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"
const cli = fileURLToPath(
  new URL("../../prototype/simulate-return-current/cli.js", import.meta.url),
)
const child = spawn(process.execPath, [cli, ...process.argv.slice(2)], {
  stdio: "inherit",
})
child.on("error", (error) => {
  console.error(error.message)
  process.exitCode = 1
})
child.on("exit", (code, signal) => {
  if (signal) {
    console.error(`Simulator exited with ${signal}`)
    process.exitCode = 1
  } else process.exitCode = code ?? 1
})
