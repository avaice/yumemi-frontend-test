git pull origin
docker image prune
sudo docker image build -t avaice/population ./ --network=host
docker run avaice/population -p 3000:3001