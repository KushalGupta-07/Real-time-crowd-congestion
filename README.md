# VenueFlow — Real-time Crowd Congestion Dashboard

A React + Vite demo application for venue operations, crowd monitoring, and mobile ordering.

## Project Overview

`Real-time-crowd-congestion` simulates a venue operations dashboard with:

- Live heatmap view for crowd congestion across venue zones
- Smart routing and zone interaction for safer navigation
- Real-time event feed with alerts, promotions, and schedule updates
- Express ordering for food and merchandise with order tracking
- Admin portal for traffic management, order workflow updates, and broadcast alerts

## Features

- **Map Dashboard**: displays zone congestion levels and allows users to select a route.
- **Live Feed**: shows real-time alerts and venue updates.
- **Order Express**: mock ordering experience with cart preview and status tracking.
- **Admin Portal**: manage traffic density, update order status, and broadcast live notifications.
- **Mock data-driven**: uses `VenueContext` for shared demo data across components.

## Tech Stack

- React 19
- Vite
- lucide-react icons
- ESLint

## Getting Started

From the project root:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite to view the app.

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

- `src/App.jsx` — app shell with tab navigation and admin toggle
- `src/components/MapDashboard.jsx` — crowd heatmap and routing panel
- `src/components/LiveFeed.jsx` — event timeline and alerts
- `src/components/OrderExpress.jsx` — ordering flow and order status
- `src/components/admin/` — admin portal pages and controls
- `src/context/VenueContext.jsx` — shared mock venue state and action handlers

## Project Maturity

- **Adoption**: Early-stage adoption with initial usage of Google services such as Google Cloud for deployment.
- **Testing**: Core UI and workflow paths are covered, while edge cases and integration flows remain opportunities for expanded coverage.
- **Accessibility**: Early accessibility patterns are visible; additional improvements are possible around page structure, navigation flow, and assistive support.
- **Security**: Basic protections are present, but validation and access control require stronger review to reduce exposure risks.
- **Efficiency**: Most areas are optimized for demo performance, with room for advanced tuning in critical interactions and load paths.
- **Architecture**: The current React/Vite architecture is thoughtful and modular, with minor consistency gaps in component structure and state handling.

## Notes

- This repository is a UI-focused demo and does not include a backend.
- The admin portal is accessed by clicking the shield button in the interface.
- All data is currently mocked in React state for demonstration purposes.
