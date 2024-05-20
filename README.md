# Imageboard

Inspired by some online image boards (a lot being questionable 😂), I thought it would be a fun project to make my own. Make it great on mobile, written in TypeScript.

I plan to use this as more of a personal photo hosting solution for myself but others are welcome to try this out.

## WIP

This project is a bit WIP! Rough edges are inevitable.

Here is a super early sneak peek.

|                                                                                                  |                                                                                                  |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| ![](https://github.com/jack3898/imageboard/assets/28375223/2ace2ce0-1029-4ca3-8512-ecae1e8b3318) | ![](https://github.com/jack3898/imageboard/assets/28375223/5ea1ad6c-4528-41c2-8b9f-141522630874) |
| ![](https://github.com/jack3898/imageboard/assets/28375223/deaa74c7-cccf-4c35-973d-45eec5123252) | ![](https://github.com/jack3898/imageboard/assets/28375223/6c156e05-ae6c-4773-b2de-b59a68c5f4f1) |

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
- Copy and rename ".envexample" to ".env" and fill in:
  - NGROK_AUTHTOKEN
  - NGROK_DOMAIN
  - FRONTEND_PORT set to `80` (this is proxied so do not worry about no encryption)
- Run `docker build -t imageboard:latest -f .docker/Dockerfile . --build-arg UNSAFE_BACKEND_URL=https://your_ngrok_domain.com`
- Run `docker-compose up`
- Visit the site!

Note: _Reverse proxy config will come later_

Note: _K8s/Helm will come later_
