kind load docker-image docker.io/cgayet/order-service:0.0.1
docker build --tag docker.io/cgayet/order-service:0.0.1 .
kubectl apply -f deploy/local-k8s
kubectl -n local get pod