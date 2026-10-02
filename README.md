# TéléSport

TéléSport is a React dashboard for exploring historical Olympic performance by country. The interface is in French and currently uses a local data set covering five Olympic editions.

The dashboard shows medal totals for each country. Selecting a country opens a detail page with its participation history, medal total, athlete total, and medal evolution.

## Features

- Dashboard with country totals and summary indicators
- Interactive medal chart with links to country detail pages
- Country detail route at `/country/:id`
- Medal and athlete evolution chart for each country
- Loading, empty, error, and not-found states
- Responsive layout for desktop and mobile screens
- TypeScript models and pure calculation helpers

## Requirements

- Node.js 22 LTS or later
- npm

## Getting started

Clone the repository and install its dependencies:

```bash
git clone https://github.com/seanrw93/TeleSport.git
cd TeleSport
npm install
```

Start the development server:

```bash
npm run dev
```

Vite prints the local URL in the terminal. The default address is [http://localhost:5173](http://localhost:5173).

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build the application |
| `npm run lint` | Run ESLint with zero warnings allowed |
| `npm run preview` | Serve the production build locally |

## Project structure

```text
src/
├── App.tsx                         # Application shell and route definitions
├── main.tsx                        # React entry point
├── index.css                       # Global styles and Tailwind imports
├── components/                     # Reusable presentation components
│   ├── EmptyState.tsx
│   ├── ErrorState.tsx
│   ├── HeaderComponent.tsx
│   ├── IndicatorCard.tsx
│   ├── LoadingState.tsx
│   ├── MedalEvolutionChart.tsx
│   └── MedalTotalsChart.tsx
├── data/
│   └── olympicsData.ts             # Local development data
├── hooks/
│   ├── useCountry.ts               # Load one country by route id
│   └── useData.ts                  # Load the Olympic data set
├── models/
│   ├── asyncData.ts                # Shared asynchronous state shape
│   └── olympic.ts                  # Olympic domain types
├── pages/
│   ├── CountryDetailPage.tsx
│   ├── DashboardPage.tsx
│   └── NotFoundPage.tsx
├── services/
│   └── olympicService.ts           # Data access boundary
└── utils/
    └── olympicCalculations.ts      # Pure domain calculations
```

The main routes are:

| Route | Page |
| --- | --- |
| `/` | Dashboard |
| `/country/:id` | Country detail |
| Any other route | Not found page |

## Data flow

Pages use hooks to request data. The hooks call the Olympic service, which currently reads the local data module and simulates asynchronous loading. Pages handle route parameters and UI states, then pass typed data to reusable components.

```text
Local data
    |
    v
olympicService
    |
    v
useData or useCountry
    |
    v
DashboardPage or CountryDetailPage
    |
    v
Reusable components and charts
```

The service boundary is intentional. A future REST API can replace the local data source without requiring changes to the charts or page layout.

## Technology

- React 19
- TypeScript
- Vite
- React Router
- Chart.js with `react-chartjs-2`
- Tailwind CSS
- ESLint

## Architecture

The design decisions, responsibilities, data flow, accessibility considerations, and future API direction are described in [architecture.md](architecture.md).

## Current data source

The application uses mock Olympic data from `src/data/olympicsData.ts`. The shared `Olympic` and `Participation` interfaces in `src/models/olympic.ts` define the shape used by the service, hooks, pages, and charts.

## License

This project is intended for educational and personal use.
