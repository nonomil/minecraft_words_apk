@echo off
setlocal EnableExtensions
chcp 65001 >nul 2>&1

set "REMOTE=origin"
set "BRANCH=main"

cd /d "%~dp0"

echo.
echo ========================================
echo   Push Code To GitHub
echo ========================================
echo.

for /f "delims=" %%A in ('git rev-parse --show-toplevel 2^>nul') do set "REPO_ROOT=%%A"
if not defined REPO_ROOT (
    echo [ERROR] Current folder is not a git repository.
    echo.
    pause
    exit /b 1
)

for /f "delims=" %%A in ('git remote get-url %REMOTE% 2^>nul') do set "ORIGIN_URL_RAW=%%A"
if not defined ORIGIN_URL_RAW (
    echo [FIX] Missing %REMOTE% remote. Adding default repository URL...
    git remote add %REMOTE% https://github.com/nonomil/minecraft_words_apk.git
    if errorlevel 1 (
        echo [ERROR] Failed to add remote.
        echo.
        pause
        exit /b 1
    )
    set "ORIGIN_URL_RAW=https://github.com/nonomil/minecraft_words_apk.git"
)

set "ORIGIN_URL=%ORIGIN_URL_RAW%"
set "ORIGIN_URL=%ORIGIN_URL:`=%"

if not "%ORIGIN_URL%"=="%ORIGIN_URL_RAW%" (
    echo [FIX] Sanitizing remote URL...
    echo   Raw:   %ORIGIN_URL_RAW%
    echo   Fixed: %ORIGIN_URL%
    git remote set-url %REMOTE% "%ORIGIN_URL%"
    if errorlevel 1 (
        echo [ERROR] Failed to update remote URL.
        echo.
        pause
        exit /b 1
    )
)

echo [INFO] %REMOTE%: %ORIGIN_URL%
echo.

echo [CHECK] Current version info:
if exist version.json (
    type version.json
) else (
    echo [WARN] version.json not found
)
echo.

echo [CHECK] Commits waiting to push:
git log %REMOTE%/%BRANCH%..HEAD --oneline 2>nul
if errorlevel 1 (
    echo [INFO] Unable to diff against %REMOTE%/%BRANCH%.
    echo [INFO] This can happen on first push or when network is unavailable.
)
echo.

echo [PUSH] Pushing to GitHub...
git -c http.version=HTTP/1.1 push %REMOTE% %BRANCH%
if not errorlevel 1 goto :push_success

echo.
echo [RETRY] First push failed. Retrying with schannel backend...
git -c http.version=HTTP/1.1 -c http.sslBackend=schannel push %REMOTE% %BRANCH%
if not errorlevel 1 goto :push_success

echo.
echo ========================================
echo   Push Failed
echo ========================================
echo.
echo Possible causes:
echo 1. Terminal network path cannot reach github.com:443
echo 2. Proxy/VPN not applied to cmd/powershell
echo 3. Authentication issue
echo.
echo Quick checks:
echo - Test browser and terminal separately
echo - Run: Test-NetConnection github.com -Port 443
echo - Run: git remote -v
echo.
pause
exit /b 1

:push_success
echo.
echo ========================================
echo   Push Succeeded
echo ========================================
echo.
echo GitHub Actions will automatically:
echo 1. Auto-increment version number (patch)
echo 2. Update build.gradle with new version
echo 3. Build Android Debug APK
echo 4. Upload APK as artifact
echo.
echo Actions URL: https://github.com/nonomil/minecraft_words_apk/actions
echo.
echo Note: Version will be auto-incremented during CI build.
echo Current version.json will be updated by GitHub Actions.
echo.
pause
exit /b 0
