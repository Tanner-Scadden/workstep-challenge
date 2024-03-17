# Tanner's Workstep Challenge

## Setup

#### Frontend

- `pnpm install`

#### Server

- `python -m venv ./server`
- `cd ./server && pip3 install -r requirements.txt`

#### Database

- `docker-compose up`

## Running

- `pnpm dev`
- `pnpm dev:server`
- `docker-compose up`

## What I did

- Upgraded the app to use Vite since webpack didn't want to run on my machine (macos)
- Added Typescript
- Added MUI, tanstack query, and a debounce hook for the filter.
- Decided to stick to mostly the same layout and styles as the original app, but added some things to make it feel more realistic like the skeleton fallback and timeouts on the API calls.
- Setup the server using flask and graphql
- Added a docker-compose file to run a mysql database
- Migrated frontend to use graphql instead of REST
- Decided to stick to mostly the same layout as the mockup, but added some things to make it feel more realistic like the skeleton fallback and timeouts on the API calls.

### Code Notes

- I don't think there needs to be a provider here, as you could easily use searchParams state for the filters to update the query. Since I didn't want to bring in a whole library for it, I just used a context provider and store to update the search query, and set it on load.
