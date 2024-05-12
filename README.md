# Jackbooru

A "booru" is an "online image board with taggable images". A place to store media, and organise them to make them easy to find.

Inspired by some online image boards (a lot being questionable 😂), I thought it would be a fun project to make my own. Make it great on mobile, written in TypeScript.

I plan to use this as more of a personal photo hosting solution for myself but others are welcome to try this out.

## WIP

This project is a bit WIP! Rough edges are inevitable.

## Install

### Development via local

- Clone this repo
- Copy and rename ".envexample" to ".env" and fill in the correct values
- Install Volta (https://volta.sh/)
- Run `npm install` on this package
- Run `npm run dev` to launch all services
- Visit the site!

Volta will automatically read this project and install the exact tested version of Node.js and NPM and use that.

### Prod build via Docker Compose

- Clone this repo
- Install Docker with Docker Compose
- Copy and rename ".envexample" to ".env" and fill in the correct values
- Run `docker build -t jackbooru:latest -f .docker/Dockerfile .`
- Run `docker-compose up`
- Visit the site!

Note: _Reverse proxy config will come later_

Note: _K8s/Helm will come later_