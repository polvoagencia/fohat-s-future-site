@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==========================================
echo  REPARO DO PREVIEW LOVABLE - FOHAT
echo ==========================================
echo.

if not exist ".git" (
  echo ERRO: Extraia este pacote dentro da pasta clonada do repositorio.
  pause
  exit /b 1
)

echo [1/6] Restaurando a estrutura TanStack original do Lovable...
git restore --source=2b0b89a3336c95d34a4212433f49d5a753bbe167 --staged --worktree .
if errorlevel 1 (
  echo ERRO ao restaurar o commit original.
  pause
  exit /b 1
)

echo [2/6] Removendo arquivos Vite estaticos que conflitam com TanStack...
if exist "index.html" del /f /q "index.html"
if exist "vite.config.js" del /f /q "vite.config.js"
if exist "catalogo-de-locacao" rmdir /s /q "catalogo-de-locacao"
if exist "COMO-SUBIR-NO-GITHUB.txt" del /f /q "COMO-SUBIR-NO-GITHUB.txt"

echo [3/6] Aplicando o site FOHAT dentro da estrutura TanStack...
xcopy /e /i /y "fohat-fix-files\public" "public" >nul
xcopy /e /i /y "fohat-fix-files\src" "src" >nul

echo [4/6] Limpando arquivos temporarios do reparo...
rmdir /s /q "fohat-fix-files"

echo [5/6] Criando o commit...
git add -A
git reset -- "CORRIGIR-LOVABLE.bat" >nul 2>&1
git commit -m "Restaura TanStack e integra site FOHAT"
if errorlevel 1 (
  echo.
  echo O Git informou que nao havia alteracoes ou encontrou um erro.
  echo Confira a mensagem acima.
  pause
  exit /b 1
)

echo [6/6] Enviando para o GitHub...
git push origin main
if errorlevel 1 (
  echo ERRO ao enviar para o GitHub.
  echo Abra o GitHub Desktop e clique em Push origin.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo  CORRECAO ENVIADA COM SUCESSO
echo ==========================================
echo Aguarde a sincronizacao do Lovable e atualize o preview.
echo.
pause
