param(
  [switch]$SyncWeaponAssets
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$bundledNode = 'C:\Users\Ardha\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$nodeExe = if ($env:SKYLOG_NODE -and (Test-Path -LiteralPath $env:SKYLOG_NODE)) {
  $env:SKYLOG_NODE
} elseif (Test-Path -LiteralPath $bundledNode) {
  $bundledNode
} else {
  (Get-Command node -ErrorAction Stop).Source
}

$major = [int]((& $nodeExe --version).TrimStart('v').Split('.')[0])
if ($major -lt 22) {
  throw "Skylog requires Node.js 22 or newer. Found $(& $nodeExe --version). Install Node 22+, or set SKYLOG_NODE to its node.exe path."
}

if (-not (Test-Path -LiteralPath (Join-Path $projectRoot 'node_modules\vinext\dist\cli.js'))) {
  throw "Dependencies are missing. Open PowerShell in $projectRoot and run: npm install"
}

Push-Location $projectRoot
try {
  if ($SyncWeaponAssets) {
    & $nodeExe 'scripts\sync-weapon-assets.mjs'
    if ($LASTEXITCODE -ne 0) { throw "Weapon asset synchronization failed." }
  }
  Write-Host 'Skylog will open at http://localhost:3000/' -ForegroundColor Cyan
  Write-Host 'Press Ctrl+C to stop it.' -ForegroundColor DarkGray
  & $nodeExe 'node_modules\vinext\dist\cli.js' dev
} finally {
  Pop-Location
}
