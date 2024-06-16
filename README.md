# Imageboard

Inspired by some online image boards (a lot being questionable 😂), I thought it would be a fun project to make my own. Make it great on mobile, written in TypeScript.

I plan to use this as more of a personal photo hosting solution for myself but others are welcome to try this out.

## WIP

This project is a bit WIP! Rough edges are inevitable and big breaking changes are too.

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
  - ℹ️ Volta will read this application and auto-pick the best version of Node and npm to use that has been tested during development previously.
- Run `npm install` on this package
- Using Docker, run `docker run --name postgres -v postgresdata:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`, to spin up a database
  - ℹ️ For local dev, make sure the DB port is exposed to localhost
  - ℹ️ Update the values in the command if required to match your .env
- Run `npm run nx run @internal/server:migrate` to initialize the database
- Run `npm run dev` to launch all services
- Visit the site on `localhost:5173`!

_You will need to make an account on the sign up page to log in._

### Prod build via Docker Compose

⚠️ Currently not working since migration from mongodb to postgres. Check back soon!

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
