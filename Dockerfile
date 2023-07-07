FROM mcr.microsoft.com/playwright:v1.35.1-jammy

WORKDIR /app

COPY package.json /app/package.json
COPY tests /app/tests
COPY fixtures /app/fixtures
COPY pages /app/pages
COPY clean.js /app/clean.js

COPY playwright.config.js /app/playwright.config.js
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get -y install default-jre-headless && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
RUN npm install && npx playwright install --with-deps
