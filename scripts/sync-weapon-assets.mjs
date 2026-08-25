import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const catalogPath = path.join(root, "scripts", "weapon-catalog.json");
const outputDir = path.join(root, "public", "weapon-assets");
const manifestPath = path.join(outputDir, "manifest.json");
const appManifestPath = path.join(root, "app", "generated-weapon-assets.json");
const force = process.argv.includes("--force");
const requested = process.argv.slice(2).filter((arg) => !arg.startsWith("--"));

const slugify = (value) => value
  .normalize("NFKD")
  .replace(/[’‘]/g, "'")
  .replace(/[^a-zA-Z0-9]+/g, "-")
  .replace(/^-|-$/g, "")
  .toLowerCase();

const normalize = (value) => value.trim().replace(/[’‘]/g, "'").replace(/\s+/g, " ");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const entries = requested.length
  ? requested.map((name) => catalog.find((entry) => normalize(entry.name) === normalize(name)) || ({ name: normalize(name), aliases: [] }))
  : catalog;

await mkdir(outputDir, { recursive: true });
let oldManifest = { weapons: {}, aliases: {} };
if (existsSync(manifestPath)) {
  try {
    oldManifest = JSON.parse(await readFile(manifestPath, "utf8"));
  } catch (error) {
    console.warn(`Ignoring unreadable weapon manifest: ${error.message}`);
  }
}

const manifest = oldManifest;
manifest.version = 1;
manifest.weapons ||= {};
manifest.aliases ||= {};
if (!requested.length) manifest.aliases = {};

function imageType(bytes, contentType) {
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "jpg";
  if (contentType.includes("image/png")) return "png";
  if (contentType.includes("image/jpeg")) return "jpg";
  return null;
}

async function resolveWeapon(name, assetFile, assetUrl) {
  if (assetUrl) {
    const response = await fetch(assetUrl, {
      redirect: "follow",
      headers: { "User-Agent": "Soutenroku-GBF-Asset-Sync/1.0 (personal planner)" },
    });
    if (!response.ok) throw new Error(`Asset request failed for “${name}” (${response.status}).`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const type = imageType(bytes, response.headers.get("content-type") || "");
    if (!type || bytes.length < 1024) throw new Error(`Invalid weapon image for “${name}”.`);
    return { bytes, type, source: assetUrl, resolvedUrl: response.url };
  }
  const cleaned = normalize(name);
  const candidates = assetFile
    ? [assetFile.replace(/\.(?:png|jpg)$/i, "")]
    : [cleaned, cleaned.replace(/\s*\([^)]*\)$/, "")];
  for (const title of [...new Set(candidates)]) {
    for (const extension of ["png", "jpg"]) {
      const fileName = assetFile || `${title}.${extension}`;
      const source = `https://gbf.wiki/Special:Redirect/file/${encodeURIComponent(fileName)}`;
      const response = await fetch(source, {
        redirect: "follow",
        headers: { "User-Agent": "Soutenroku-GBF-Asset-Sync/1.0 (personal planner)" },
      });
      if (!response.ok) continue;
      const bytes = new Uint8Array(await response.arrayBuffer());
      const type = imageType(bytes, response.headers.get("content-type") || "");
      if (!type || bytes.length < 1024) continue;
      return { bytes, type, source, resolvedUrl: response.url };
    }
  }
  throw new Error(`No GBF Wiki weapon image redirect found for “${name}”. Use the exact wiki page title or add an alias in weapon-catalog.json.`);
}

let failures = 0;
for (const entry of entries) {
  const name = normalize(entry.name);
  const existing = manifest.weapons?.[name];
  if (!force && existing && existsSync(path.join(root, "public", existing.path))) {
    process.stdout.write(`cached  ${name}\n`);
  } else {
    try {
      const asset = await resolveWeapon(name, entry.assetFile, entry.assetUrl);
      const file = `${slugify(name)}.${asset.type}`;
      await writeFile(path.join(outputDir, file), asset.bytes);
      manifest.weapons[name] = {
        name,
        path: `/weapon-assets/${file}`,
        source: asset.source,
        resolvedUrl: asset.resolvedUrl,
      };
      process.stdout.write(`fetched ${name} -> ${file}\n`);
    } catch (error) {
      failures += 1;
      process.stderr.write(`failed  ${error.message}\n`);
      continue;
    }
  }
  manifest.aliases[name] = name;
  for (const alias of entry.aliases || []) manifest.aliases[normalize(alias)] = name;
}

manifest.generatedAt = new Date().toISOString();
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(appManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
process.stdout.write(`manifest ${path.relative(root, manifestPath)}\n`);
if (failures) process.exitCode = 1;
