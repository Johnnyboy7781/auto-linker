@echo off

cd %1

:loop_start
if "%2"=="" goto loop_end
set packageNamesToLink=%packageNamesToLink% %2
shift
goto loop_start
:loop_end

echo %packageNamesToLink%

npm link %packageNamesToLink% --legacy-peer-deps
