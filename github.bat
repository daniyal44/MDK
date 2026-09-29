@echo off
setlocal enabledelayedexpansion
title MDK Works - Git Commit and Push

echo ========================================================
echo           MDK WORKS - PROFESSIONAL GIT SYNC
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/4] Verifying production build...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo.
    echo ========================================================
    echo  [BUILD ERROR] Production build failed. Push aborted.
    echo ========================================================
    echo.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/4] Checking repository status...
git add -A

set "has_changes=0"
for /f "delims=" %%i in ('git status --porcelain') do (
    set "has_changes=1"
)

if "%has_changes%"=="0" (
    echo Working tree clean - no new uncommitted file changes.
    goto push_check
)

echo Staged changes to be committed:
git status -s
echo.
echo ========================================================
echo [3/4] Commit Details (Conventional Commits Standard)
echo Examples:
echo   - feat(portfolio): add new project showcase
echo   - fix(ui): fix mobile navigation layout
echo   - docs(readme): update repository documentation
echo   - refactor(core): optimize code structure
echo ========================================================
set "commit_msg="
set /p commit_msg="Enter commit message (Press Enter for default): "

if "!commit_msg!"=="" (
    set "commit_msg=refactor(core): optimize components, styles, and configurations"
)

echo.
echo Committing changes...
git commit -m "!commit_msg!"
if %errorlevel% neq 0 (
    echo.
    echo [WARNING] Git commit returned an issue or nothing to commit.
)

:push_check
echo.
echo [4/4] Pushing to GitHub (origin main)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  SUCCESS: All changes are live on GitHub!
    echo  Repository: https://github.com/daniyal44/MDK
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo  [PUSH FAILED] Could not push to GitHub.
    echo  Please check your internet connection or git credentials.
    echo ========================================================
)

echo.
pause
