@echo off
title MDK Portfolio - Local Development Server
echo ========================================================
echo          Starting MDK Portfolio Local Website...
echo ========================================================
echo.
cd /d "%~dp0"

echo [1/2] Checking node_modules...
if not exist "node_modules\" (
    echo Installing dependencies, please wait...
    call npm.cmd install
)

echo.
echo [2/2] Starting server at http://localhost:3000 ...
echo The browser will open automatically!
echo.
echo (Keep this window open while using the website. Close it to stop.)
echo ========================================================
echo.

call npm.cmd run dev
pause
