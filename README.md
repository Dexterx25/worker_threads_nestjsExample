This proyect contains the example how much important is uses worker_threads on backend app to improve the performance isolate the complex and heave process in other threads diferents to the main thread for let the main thread free for the main process api.


commands: 

1. npm install

2. npm run start:dev

3. go to the web browser and open the url http://localhost:3000/api/v1/testApp/docs#/

there are three endpoints to test the performance with and without the worker_threads module


commands to deploy kubernetes and docker:

install docker on your computer or virtual machine remotly:

install kubernetes or minikube on your computer or virtual machine remotly

## start minikube:

minikube start (look at the engine docker image of minikube was success create)

## retrieve the image to instance minikube or kubernetes:

#### option 1:

## build image
docker build -t workerthapp .

## save the image like a portable .tar
docker image save -o workerthapp.tar workerthapp:latest

## upload your .tar portable image to minikube
minikube image load workerthapp.tar

# now you can apply yaml file:
kubectl apply -f serviceNorPort.yaml


##########################  


### option 2:
if use windows: 

## connect minikube or k8s to docker:

## be ensure that your minikube is stoped and/or deleted:

minikube status
minikube stop
minikube delete

## setting env:
minikube docker-env

## start minikube:
minikube start

minikube -p minikube docker-env

## if you are using windows:
eval $(minikube -p minikube docker-env --shell=bash) 

## build image:
docker build -t workerthapp .

# now you can apply yaml file:
kubectl apply -f serviceNorPort.yaml


now you can forward the ports or use a cloud solution with AWS to deploy to the world

