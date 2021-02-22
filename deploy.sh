REPOSITORY=/home/jupiterflow/app/mainpage
cd $REPOSITORY
python3 ./deploy.py && /usr/local/bin/pm2 restart "main"