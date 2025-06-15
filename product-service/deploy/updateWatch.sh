#!/bin/bash

# Construire l'image et la charger dans kind
docker build --tag docker.io/cgayet/products-service:0.0.1 . && \
kind load docker-image docker.io/cgayet/products-service:0.0.1

# Redémarrer le déploiement et appliquer les manifestes
kubectl apply -f deploy/local-k8s
kubectl -n local rollout restart deployment/products-service

# Attendre que le pod product-service soit prêt
echo "⏳ Attente que le pod 'products-service' soit prêt..."
kubectl wait --for=condition=ready pod -l app=products-service -n local --timeout=60s

# Récupérer le hash du pod
# HASH=$(kubectl -n local get pods -o custom-columns=NAME:.metadata.name --no-headers \
#   | grep product-service | awk -F'-' '{print $(NF-1) "-" $NF}')

POD=$(kubectl -n local get pods -o custom-columns=NAME:.metadata.name --no-headers \
    | grep products-service | tail -n1)

kubectl -n local logs $POD -c products-service -f

# # Afficher les logs du bon pod
# echo "📄 Logs du pod product-service-$HASH :"
# kubectl -n local logs product-service-$HASH -f