CarScope

A car market tool I built with React + Vite. You type in a VIN or a model name and it gives you a price estimate, known reliability issues, and maintenance reminders for that vehicle.

## What it does

- VIN lookup using the NHTSA API (free, no key needed)
- Model search — just type something like "2018 BMW 420d"
- Price range estimate based on age and depreciation
- 6-month valuation trend chart
- Common faults and risk levels per model
- Basic maintenance interval reminders

## Stack:

- React 19 + Vite 8
- Chart.js for the valuation graph
- NHTSA API for VIN decoding

## Run it locally:
- bashnpm install
- npm run dev


## "Notes"

The pricing is calculated from a depreciation model, not live listings. The VIN decoding is real though — it hits the NHTSA database. A proper market API like MarketCheck would replace the mock pricing in a production version.

## Author:

Jonne Virtanen — LinkedIn — GitHub
