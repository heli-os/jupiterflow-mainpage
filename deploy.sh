REPOSITORY=/home/jupiterflow/app/mainpage
cd $REPOSITORY

npm install

python3 ./deploy.py

pm2 restart main