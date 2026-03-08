@echo off
chcp 65001 >nul
title Mario Minecraft Debug Server
color 0A

echo ========================================
echo   Mario Minecraft 调试服务器
echo ========================================
echo.

cd /d "%~dp0..\.."

echo [1/3] 检查环境...
where python >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 找到 Python
    set USE_PYTHON=1
) else (
    echo ✗ 未找到 Python
    set USE_PYTHON=0
)

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 找到 Node.js
    set USE_NODE=1
) else (
    echo ✗ 未找到 Node.js
    set USE_NODE=0
)

echo.

if %USE_NODE% equ 1 (
    if exist "tools\serve-apk.mjs" (
        echo [2/3] 使用 Node.js 服务器 (tools/serve-apk.mjs)
        echo [3/3] 启动服务器: http://localhost:4173
        echo.
        echo 按 Ctrl+C 停止服务器
        echo ========================================
        echo.
        timeout /t 2 /nobreak >nul
        start http://localhost:4173/tests/debug-pages/GameDebug.html
        node tools\serve-apk.mjs --port 4173
        goto :end
    )
)

if %USE_PYTHON% equ 1 (
    echo [2/3] 使用 Python 简易服务器
    echo [3/3] 启动服务器: http://localhost:4173
    echo.
    echo 按 Ctrl+C 停止服务器
    echo ========================================
    echo.
    timeout /t 2 /nobreak >nul
    start http://localhost:4173/tests/debug-pages/GameDebug.html
    python -m http.server 4173
    goto :end
)

echo [错误] 未找到 Python 或 Node.js
echo.
echo 请安装以下任一工具:
echo   - Python 3.x: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause
goto :end

:end
