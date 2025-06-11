#!/bin/bash

# Construire l'image et la charger dans kind
docker build --tag docker.io/cgayet/order-service:0.0.1 . && \
kind load docker-image docker.io/cgayet/order-service:0.0.1

# Redémarrer le déploiement et appliquer les manifestes
kubectl apply -f deploy/local-k8s
kubectl -n local rollout restart deployment/order-service

# Attendre que le pod order-service soit prêt
echo "⏳ Attente que le pod 'order-service' soit prêt..."
kubectl wait --for=condition=ready pod -l app=order-service -n local --timeout=60s

# Récupérer le hash du pod
# HASH=$(kubectl -n local get pods -o custom-columns=NAME:.metadata.name --no-headers \
#   | grep order-service | awk -F'-' '{print $(NF-1) "-" $NF}')

POD=$(kubectl -n local get pods -o custom-columns=NAME:.metadata.name --no-headers \
    | grep order-service | tail -n1)

kubectl -n local logs $POD -c order-service -f

# # Afficher les logs du bon pod
# echo "📄 Logs du pod order-service-$HASH :"
# kubectl -n local logs order-service-$HASH -f