param([switch]$NoBrowser)
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$logDirectory = Join-Path $projectRoot 'logs'
New-Item -ItemType Directory -Force -Path $logDirectory | Out-Null

function Test-Listening($Port) {
    foreach ($address in @('127.0.0.1', '::1')) {
        $family = if ($address -eq '::1') { [System.Net.Sockets.AddressFamily]::InterNetworkV6 } else { [System.Net.Sockets.AddressFamily]::InterNetwork }
        $connection = New-Object System.Net.Sockets.TcpClient($family)
        try {
            $pending = $connection.ConnectAsync($address, $Port)
            if ($pending.Wait(500) -and $connection.Connected) { return $true }
        } catch { } finally { $connection.Dispose() }
    }
    return $false
}

if (Test-Listening 8100) {
    try {
        $health = Invoke-RestMethod 'http://127.0.0.1:8100/api/health' -TimeoutSec 3
        if ($health.status -ne 'ok') { throw 'Unexpected health response' }
        Write-Host 'Backend already running on port 8100.'
    } catch { throw 'Port 8100 is occupied but CTA health check failed. Check the existing process.' }
} else {
    $pythonCommand = (Get-Command python).Source
    $localPython = Join-Path $projectRoot '.venv\Scripts\python.exe'
    if (Test-Path -LiteralPath $localPython) { $pythonCommand = $localPython }
    $backendArguments = @('-m', 'uvicorn', 'backend.main:app', '--host', '127.0.0.1', '--port', '8100')
    if (Test-Path -LiteralPath (Join-Path $projectRoot '.env')) { $backendArguments += @('--env-file', '.env') }
    Start-Process -FilePath $pythonCommand -ArgumentList $backendArguments -WorkingDirectory $projectRoot -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDirectory 'backend.log') -RedirectStandardError (Join-Path $logDirectory 'backend-error.log') | Out-Null
}

if (Test-Listening 5180) {
    Write-Host 'Port 5180 is already in use; reusing the existing frontend. Verify it is CTA Studio.'
} else {
    Start-Process -FilePath (Get-Command node).Source -ArgumentList 'node_modules/vite/bin/vite.js' -WorkingDirectory (Join-Path $projectRoot 'frontend') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $logDirectory 'frontend.log') -RedirectStandardError (Join-Path $logDirectory 'frontend-error.log') | Out-Null
}

$ready = $false
for ($attempt = 0; $attempt -lt 30; $attempt++) {
    try {
        $health = Invoke-RestMethod 'http://127.0.0.1:8100/api/health' -TimeoutSec 1
        $frontend = Invoke-WebRequest 'http://localhost:5180' -UseBasicParsing -TimeoutSec 1
        if ($health.status -eq 'ok' -and $frontend.StatusCode -eq 200) { $ready = $true; break }
    } catch { Start-Sleep -Milliseconds 500 }
}
if (-not $ready) { throw "Servers are not ready. See logs in $logDirectory" }
Write-Host 'Backend: http://127.0.0.1:8100 | Frontend: http://localhost:5180'
if (-not $NoBrowser) { Start-Process 'http://localhost:5180' }
