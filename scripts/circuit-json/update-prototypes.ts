/** Snapshot tested upstream prototypes; runtime needs no adjacent checkout. */
import { parseArgs } from "node:util"
import { resolve, join } from "node:path"
import { fileURLToPath } from "node:url"
import { mkdir, readdir, copyFile, writeFile, readFile } from "node:fs/promises"
const { values } = parseArgs({
  options: {
    "simulator-dir": { type: "string" },
    "renderer-dir": { type: "string" },
  },
})
if (!values["simulator-dir"] && !values["renderer-dir"])
  throw Error("Pass --simulator-dir and/or --renderer-dir")
const root = fileURLToPath(new URL("../../", import.meta.url))
async function git(directory: string, ...args: string[]) {
  const result = Bun.spawnSync(["git", "-C", directory, ...args])
  if (result.exitCode) throw Error(result.stderr.toString())
  return result.stdout.toString().trim()
}
const entries = []
if (values["simulator-dir"])
  entries.push({
    repo: "tscircuit/simulate-return-current",
    dir: resolve(values["simulator-dir"]),
    name: "simulate-return-current",
  })
if (values["renderer-dir"])
  entries.push({
    repo: "tscircuit/circuit-to-svg",
    dir: resolve(values["renderer-dir"]),
    name: "circuit-to-svg",
  })
let manifests = JSON.parse(
  await readFile(join(root, "prototype", "sources.json"), "utf8").catch(
    () => "[]",
  ),
)
manifests = manifests.filter(
  (source: { repository: string }) =>
    !entries.some((entry) => entry.repo === source.repository),
)
for (const entry of entries) {
  if (await git(entry.dir, "status", "--porcelain"))
    throw Error(`Commit the tested ${entry.repo} changes first`)
  const out = join(root, "prototype", entry.name)
  await mkdir(out, { recursive: true })
  const files =
    entry.name === "simulate-return-current"
      ? [
          "lib/index.ts",
          "lib/palace.ts",
          "lib/circuit-json-simulation.ts",
          "cli/index.ts",
        ]
      : [
          "lib/pcb/convert-circuit-json-to-pcb-svg.ts",
          "lib/pcb/return-current/convert-circuit-json-to-pcb-simulation-svg.ts",
        ]
  if (entry.name === "simulate-return-current") {
    for (const [index, name] of [
      "index.js",
      "palace.js",
      "circuit-json.js",
      "cli.js",
    ].entries()) {
      const result = await Bun.build({
        entrypoints: [join(entry.dir, files[index]!)],
        outdir: out,
        naming: name,
        target: "node",
        format: "esm",
        external: ["@resvg/resvg-js"],
      })
      if (!result.success) throw Error(result.logs.join("\n"))
    }
    await mkdir(join(out, "python"), { recursive: true })
    for (const name of await readdir(join(entry.dir, "lib/palace/python")))
      if (/\.(py|txt)$/.test(name))
        await copyFile(
          join(entry.dir, "lib/palace/python", name),
          join(out, "python", name),
        )
  } else {
    // A small entry keeps schematic/assembly code out of the prototype snapshot.
    const scratch = join(root, "work", "renderer-prototype-entry.ts")
    await mkdir(join(root, "work"), { recursive: true })
    await writeFile(
      scratch,
      files
        .map(
          (file) => `export * from ${JSON.stringify(join(entry.dir, file))};`,
        )
        .join("\n"),
    )
    const result = await Bun.build({
      entrypoints: [scratch],
      outdir: out,
      naming: "index.js",
      target: "node",
      format: "esm",
    })
    if (!result.success) throw Error(result.logs.join("\n"))
  }
  const license = (await readdir(entry.dir)).find((name) =>
    /^LICENSE(?:\.md|\.txt)?$/.test(name),
  )
  if (license) await copyFile(join(entry.dir, license), join(out, "LICENSE"))
  const sourcePackage = JSON.parse(
    await readFile(join(entry.dir, "package.json"), "utf8"),
  )
  const manifest = {
    repository: entry.repo,
    source_commit: await git(entry.dir, "rev-parse", "HEAD"),
    source_branch: await git(entry.dir, "branch", "--show-current"),
    package_version: sourcePackage.version,
    license: sourcePackage.license,
  }
  manifests.push(manifest)
  await writeFile(
    join(out, "source.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  )
}
await writeFile(
  join(root, "prototype", "sources.json"),
  JSON.stringify(manifests, null, 2) + "\n",
)
console.log("Saved tested upstream CLI/renderer snapshots and source commits")
