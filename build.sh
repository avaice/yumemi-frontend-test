git pull origin
docker image prune
sudo docker image build -t avaice/population ./ --network=host
docker run -p 3001:3000 avaice/population
