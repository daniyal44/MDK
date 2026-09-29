@echo off
setlocal enabledelayedexpansion
title GitHub Auto Push - MDK Works
echo ========================================================
echo               MDK WORKS - GITHUB AUTO PUSH
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking project & running build...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo.
    echo ========================================================
    echo [ERROR] Build failed! Aborting push to prevent issues.
    echo ========================================================
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Staging changes...
git add -A
git status -s

echo.
echo [3/4] Commit message:
set /p commit_msg="Enter commit message (Press Enter for default): "
if "%commit_msg%"=="" (
    set commit_msg=Update website and configurations - %date% %time%
)

git commit -m "%commit_msg%"

echo.
echo [4/4] Pushing to GitHub (origin main)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS: Code successfully pushed to GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  [ERROR] Push failed. Check your internet connection or GitHub credentials.
    echo ========================================================
)

echo.
pause
