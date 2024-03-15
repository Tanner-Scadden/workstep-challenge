# Tanner's Workstep Challenge

## Getting Started

- `pnpm install`
- `pnpm dev`

## What I did

- Upgraded the app to use Vite since webpack didn't want to run on my machine (macos)
- Added Typescript
- Added MUI, tanstack query, and a debounce hook for the filter.
- Decided to stick to mostly the same layout as the mockup, but added some things to make it feel more realistic like the skeleton fallback and timeouts on the API calls.

### Code Notes
- I don't think there needs to be a provider here, as you could easily use searchParams state for the filters to update the query. Since I didn't want to bring in a whole library for it, I just used a context provider and store to update the search query, and set it on load. 
