REPOSITORY=/home/jupiterflow/app/mainpage
cd $REPOSITORY
python3 ./deploy.py && pm2 restart "main"