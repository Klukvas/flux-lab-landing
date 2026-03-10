#!/bin/bash
set -e

DOMAIN="flux-lab.dev"
EMAIL="admin@flux-lab.dev"
COMPOSE_DIR="/opt/flux-lab-landing"

cd "$COMPOSE_DIR"

# Create dummy certificate so nginx can start
echo "Creating dummy certificate for $DOMAIN..."
docker compose run --rm --entrypoint "\
  mkdir -p /etc/letsencrypt/live/$DOMAIN && \
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem \
    -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem \
    -subj '/CN=localhost'" certbot

# Start nginx with dummy cert
echo "Starting nginx..."
docker compose up -d nginx

# Delete dummy certificate
echo "Deleting dummy certificate..."
docker compose run --rm --entrypoint "\
  rm -rf /etc/letsencrypt/live/$DOMAIN && \
  rm -rf /etc/letsencrypt/archive/$DOMAIN && \
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf" certbot

# Request real certificate
echo "Requesting Let's Encrypt certificate for $DOMAIN..."
docker compose run --rm --entrypoint "\
  certbot certonly --webroot -w /var/www/certbot \
    --email $EMAIL \
    -d $DOMAIN \
    --agree-tos \
    --no-eff-email \
    --force-renewal" certbot

# Reload nginx with real cert
echo "Reloading nginx..."
docker compose exec nginx nginx -s reload

echo "Done! SSL certificate installed for $DOMAIN"
