@echo off
title Push Birthday Website to GitHub
color 0D
echo ============================================================
echo   PUSHING BIRTHDAY SURPRISE WEBSITE TO GITHUB
echo   Repository: https://github.com/RajKamal78/oye
echo ============================================================
echo.
cd /d "D:\N"

echo Checking remote configuration...
git remote -v
echo.

echo Pushing main branch to GitHub...
echo (If a GitHub sign-in window pops up, please sign in as RajKamal78)
echo.
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ============================================================
    echo   [SUCCESS] Code successfully pushed to GitHub!
    echo.
    echo   Now enable GitHub Pages:
    echo   1. Visit: https://github.com/RajKamal78/oye/settings/pages
    echo   2. Set 'Source' to 'GitHub Actions'
    echo.
    echo   Your live website will be accessible at:
    echo   https://rajkamal78.github.io/oye/
    echo ============================================================
) else (
    echo ============================================================
    echo   [ERROR] Push did not complete.
    echo   Make sure you are signed in to the RajKamal78 account!
    echo ============================================================
)
echo.
pause
