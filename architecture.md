# TéléSport architecture

## Scope

TéléSport is a React 19 application written in TypeScript. It presents historical Olympic results by country through a dashboard and a country detail page.

The application currently uses local mock data. The code is arranged so that a REST API can replace that data source without coupling the interface to HTTP details.

## Responsibilities by layer

### Application shell

`src/App.tsx` composes the application and defines the React Router routes:

```text
/            -> DashboardPage
/country/:id -> CountryDetailPage
*            -> NotFoundPage
```

The application shell should remain small. It should not contain domain data, chart configuration, or business calculations.

### Pages

The files in `src/pages` are route-level components. They coordinate data hooks, route parameters, UI states, and reusable components.

`DashboardPage`:

- loads the complete Olympic data set
- displays summary indicators
- renders the medal totals chart
- provides access to each country detail page

`CountryDetailPage`:

- reads and validates the country id from the URL
- loads the matching country
- displays participation, medal, and athlete totals
- renders the medal evolution chart
- redirects invalid or unknown countries to the not-found page

`NotFoundPage` provides a consistent response for unknown routes and invalid country requests.

### Components

Components in `src/components` are presentation-focused and receive their data through props.

- `HeaderComponent` displays page heading content.
- `IndicatorCard` displays one label and one value.
- `MedalTotalsChart` displays the dashboard chart and handles navigation to a country.
- `MedalEvolutionChart` displays the history of one country.
- `LoadingState`, `EmptyState`, and `ErrorState` communicate common request states.

These components should not import the data set or call the service directly. Keeping data access out of the presentation layer makes the components easier to reuse and test.

### Hooks

Hooks in `src/hooks` connect React pages to the data service.

`useData` loads all countries and exposes the data, loading state, and error state. `useCountry` loads one country by id and exposes the same asynchronous state shape.

The hooks own React-specific state. They do not contain chart markup, and they should not duplicate the domain calculations used by the pages.

### Models

`src/models` contains shared TypeScript types.

```ts
interface Participation {
  id: number
  year: number
  city: string
  medalsCount: number
  athleteCount: number
}

interface Olympic {
  id: number
  country: string
  participations: Participation[]
}
```

These interfaces are the single reference for the data used by the service, hooks, pages, and charts. New data sources should be adapted to this model at the service boundary.

`AsyncData<T>` describes the common asynchronous result shape. Keeping this state explicit allows the interface to distinguish loading, successful, empty, and failed requests.

### Data and services

`src/data/olympicsData.ts` contains the local data used during development. It is separate from the UI so that components do not own or duplicate the data set.

`src/services/olympicService.ts` is the data access boundary. It currently reads the local data and simulates asynchronous loading. In a later version it can make REST requests while preserving the public contract used by the hooks.

The service should not render UI or manage React state. It should return typed domain data or an explicit error.

### Utilities

`src/utils/olympicCalculations.ts` contains pure domain functions, including:

- total medals for a country
- total athletes for a country
- other derived values needed by the pages or charts

Pure functions keep calculations independent from React and make them straightforward to test.

## Data flow

The current flow is:

```text
Local data
    |
    v
Olympic service
    |
    v
useData or useCountry
    |
    v
Route page
    |
    v
Reusable components
    |
    v
Rendered interface
```

For a REST integration, only the source behind the service should change:

```text
REST API
    |
    v
Olympic service
    |
    v
useData or useCountry
    |
    v
Route page
    |
    v
Reusable components
```

The charts and interface should not need to know whether the data came from a local module or an API.

## Asynchronous state

Pages should handle these states explicitly:

1. Loading: the request has not completed.
2. Error: the service could not provide the data.
3. Empty: the request succeeded but returned no usable records.
4. Success: the expected data is available.
5. Not found: a country id is invalid or does not match a country.

The service simulates a delay for the local data source. If an effect or timer is used in a future implementation, it must be cleaned up when the request is cancelled or the component is unmounted.

## React hook decisions

The project does not choose hooks based on their version number. Each hook should match the problem it solves.

### `useData`

`useData` is the public entry point for the initial read of Olympic data. It keeps pages independent from the current data source and exposes loading and error information in one place.

### `useEffect`

`useEffect` is appropriate when React must synchronize with an external system, such as a timer, event listener, subscription, or DOM integration. It should not be used just to calculate a value that can be derived during rendering.

### `use`

React's `use()` could support a future Promise and Suspense based data strategy. It is not required for the current service. If that strategy is adopted, `useData` should remain the public contract for pages so the interface is not coupled to the internal loading mechanism.

### `useActionState`

`useActionState` is intended for user-triggered actions such as form submissions or mutations. It is not the right abstraction for the dashboard's initial read-only data load. It may become useful if the application later adds filtering submissions, manual refresh actions, or data updates.

## Accessibility and responsive behaviour

Charts use canvas and therefore need a text alternative or a clear accessible label that describes the data being shown. Interactive chart elements must remain understandable with keyboard navigation or have an equivalent accessible control.

The interface should continue to provide:

- visible focus styles
- meaningful heading and landmark structure
- accessible loading and error messages
- sufficient colour contrast
- layouts that work on mobile, tablet, and desktop widths

Responsive behaviour belongs in the component styles rather than in page-specific workarounds.

## Boundaries and conventions

- Pages coordinate. They should not become data stores.
- Components display data passed through props. They should not call the API.
- Services retrieve and adapt data. They should not render UI.
- Utilities calculate values without React dependencies.
- Domain types live in `src/models` and are reused instead of redefined.
- New routes belong in the application shell.
- New asynchronous data access belongs behind a hook and service.
- Chart-specific configuration stays with the chart component or a dedicated chart module.

These boundaries prevent the application from returning to a single large component with mixed data access, routing, calculations, and markup.

## Future work

The next architectural steps are:

1. Replace the simulated service with a REST implementation when the backend is available.
2. Add tests for the calculation utilities, service, hooks, and route-level behaviour.
3. Add an accessible non-canvas summary for chart data.
4. Add explicit empty-state coverage for missing or incomplete API responses.
5. Review error reporting so unexpected service failures are diagnosable without exposing implementation details to users.
