FROM node:26.13.0-trixie-slim AS base
WORKDIR /app
RUN mkdir -p /app/node_modules && chown -R node:node /app
USER node

FROM base AS lighthouse
USER root
RUN apt-get update \
  && apt-get install -y --no-install-recommends chromium \
  && rm -rf /var/lib/apt/lists/*
ENV CHROME_PATH=/usr/bin/chromium
USER node
