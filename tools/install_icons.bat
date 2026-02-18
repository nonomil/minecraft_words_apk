@echo off
echo ========================================
echo   Minecraft Words Icon Installer
echo ========================================
echo.
echo Please follow these steps:
echo.
echo 1. Open generate_icon.html in your browser
echo 2. Click "下载所有图标" button
echo 3. Save the downloaded files to Downloads folder
echo 4. Press any key to continue...
pause >nul

echo.
echo Copying icons to project...
echo.

set "DOWNLOADS=%USERPROFILE%\Downloads"
set "RES_DIR=android-app\android\app\src\main\res"

for %%d in (mdpi hdpi xhdpi xxhdpi xxxhdpi) do (
    if exist "%DOWNLOADS%\ic_launcher_%%d.png" (
        copy /Y "%DOWNLOADS%\ic_launcher_%%d.png" "%RES_DIR%\mipmap-%%d\ic_launcher.png"
        copy /Y "%DOWNLOADS%\ic_launcher_%%d.png" "%RES_DIR%\mipmap-%%d\ic_launcher_round.png"
        echo Copied %%d icons
    ) else (
        echo Warning: ic_launcher_%%d.png not found in Downloads
    )
)

echo.
echo ========================================
echo   Done!
echo ========================================
echo.
echo Next steps:
echo 1. Run: git add android-app/android/app/src/main/res/mipmap-*
echo 2. Run: git commit -m "feat: update Minecraft-style icons with textures"
echo 3. Run: git push origin main
echo.
pause
