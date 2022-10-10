#!/bin/sh

printf "> UPDATING SOURCE CODE\n"
git pull
printf "\n"

printf "> SWITCH NODE VERSION\n"
source ~/.nvm/nvm.sh && nvm use v14.20.0
printf "\n"

printf "> INSTALL PACKAGES\n"
npm install
printf "\n"

printf "> BUILDING APP\n"
npm run build
printf "\n"

printf "> REMOVE PREVIOUS APP ARTIFACT\n"
ssh andromeda "rm -r ~/patroltaru-fe/.nuxt"
printf "\n"

printf "> SENDING NEW APP ARTIFACT\n"
scp -r .nuxt andromeda:patroltaru-fe/
printf "\n"

printf "> RESTART AN APP\n"
ssh andromeda "source ~/.nvm/nvm.sh && cd ~/patroltaru-fe && pm2 start"
printf "\n"
