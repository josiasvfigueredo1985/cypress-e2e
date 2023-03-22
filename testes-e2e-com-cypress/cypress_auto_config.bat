@REM cy.sh
@REM  Este arquivo utiliza sintaxe válida somente em sistema Windows

set NLM=^


set NL=^^^%NLM%%NLM%^%NLM%%NLM%
set /p nm= "Please enter a name for settings:" 
mkdir www\%nm%
cd www\%nm%
call git init
(echo # %nm% & echo. & echo TBD.) > README.md
call type README.md
call npm config set init-author-name "Josias Valentim de Figueredo"
call npm init --yes
call echo .DS_Store%NL%cypress.env.json%NL%cypress/screenshots/%NL%cypress/videos/%NL%node_modules/ > .gitignore
call echo {%NL%} > cypress.env.json
call echo {%NL%} > cypress.env.example.json
call npm i cypress -D
call npx cypress open