@echo off
setlocal enabledelayedexpansion
title MDK Works - Professional Git Commit & Push
echo ===================================================================
echo           MDK WORKS - INTERNATIONAL CONVENTIONAL GIT PUSH
echo ===================================================================
echo.

cd /d "%~dp0"

echo [1/5] Verifying production build integrity...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo.
    echo ===================================================================
    echo  [BUILD ERROR] Production build failed. Push aborted.
    echo ===================================================================
    pause
    exit /b %errorlevel%
)

echo.
echo [2/5] Staging changes...
git add -A

git diff --cached --quiet
if %errorlevel% equ 0 (
    echo No changes staged to commit. Working tree is clean.
    echo.
    pause
    exit /b 0
)

echo.
echo Staged changes:
git status -s

echo.
echo ===================================================================
echo [3/5] Conventional Commit Selection (Code-Base Standard):
echo   1) feat:     New user feature or application capability
echo   2) fix:      Bug fix or issue resolution
echo   3) docs:     Documentation, README, or schema update
echo   4) style:    UI/UX design, CSS styling, or layout update
echo   5) refactor: Code refactoring or architecture cleanup
echo   6) perf:     Performance optimization
echo   7) chore:    Build configuration, dependencies, or workflows
echo   8) custom:   Enter full conventional commit manually
echo ===================================================================
set /p commit_type_choice="Select commit type [1-8] or type custom message directly: "

set "commit_prefix="
if "%commit_type_choice%"=="1" set "commit_prefix=feat"
if "%commit_type_choice%"=="2" set "commit_prefix=fix"
if "%commit_type_choice%"=="3" set "commit_prefix=docs"
if "%commit_type_choice%"=="4" set "commit_prefix=style"
if "%commit_type_choice%"=="5" set "commit_prefix=refactor"
if "%commit_type_choice%"=="6" set "commit_prefix=perf"
if "%commit_type_choice%"=="7" set "commit_prefix=chore"

if not "%commit_prefix%"=="" (
    echo.
    set /p commit_scope="Enter scope [e.g. portfolio, ui, home, seo, ci] (optional): "
    set /p commit_desc="Enter short imperative description: "
    if "!commit_scope!"=="" (
        set "commit_msg=!commit_prefix!: !commit_desc!"
    ) else (
        set "commit_msg=!commit_prefix!(!commit_scope!): !commit_desc!"
    )
) else (
    if "%commit_type_choice%"=="8" (
        set /p commit_msg="Enter full conventional commit: "
    ) else (
        set "commit_msg=%commit_type_choice%"
    )
)

if "%commit_msg%"=="" (
    rem Intelligent fallback based on staged changes
    set "commit_msg=refactor(core): optimize codebase, components, and project structure"
)

echo.
echo [4/5] Committing with Conventional Commit:
echo       "%commit_msg%"
echo.
git commit -m "%commit_msg%"
if %errorlevel% neq 0 (
    echo.
    echo ===================================================================
    echo  [COMMIT ERROR] Commit failed.
    echo ===================================================================
    pause
    exit /b %errorlevel%
)

echo.
echo [5/5] Pushing to GitHub (origin main)...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ===================================================================
    echo  SUCCESS: Commit successfully pushed to origin/main!
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo  [PUSH ERROR] Push failed. Verify credentials and network connection.
    echo ===================================================================
)

echo.
pause
