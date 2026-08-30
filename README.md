# Open House Visitor List

A mobile-first **Progressive Web App** for registering visitors at an open house and
tracking how each visit went. Built with React + Vite + `vite-plugin-pwa`.

Data is stored **locally on the device** (IndexedDB), so the app works **fully offline**
and never sends visitor data to any server — important for privacy.

## Features

- **Register a visitor**: name, phone, date, arrival time, time stayed, interest level
  (low/medium/high), the visitor's “What do you think?” response, and agent notes.
- **List view**: searchable by name or phone; tap a card for full details.
- **Edit / Delete** any record.
- **Export** all records as a CSV (readable in Excel).
- **Offline & installable** PWA (standalone, no address bar when installed).
- **Local-only storage** via IndexedDB.

## Live URL

Deployed via GitHub Pages at:

```
https://kenkanfix.github.io/open-house-visitor-list/
```

## Local development

```bash
npm install
npm run dev
```

The dev server runs on `https://localhost:5173` (self-signed cert via
`@vitejs/plugin-basic-ssl`).

## Build

```bash
npm run build
```

Outputs to `dist/`, rooted at `/open-house-visitor-list/` (matching the repo name).

## Deploy

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the app on every push
to `master` and publishes `dist/` to **this repo's own GitHub Pages** deployment
(`https://kenkanfix.github.io/open-house-visitor-list/`).

It uses the modern Pages Actions flow (`actions/configure-pages`, `actions/upload-pages-artifact`,
`actions/deploy-pages`) with the built-in Pages token — **no deploy key or extra secrets required**.

To enable: in the repo go to **Settings → Pages → Source → GitHub Actions**.

## Project structure

```
index.html                # Vite entry
vite.config.js            # Base path + PWA (manifest, icons, SW)
src/
  main.jsx                # React root
  App.jsx                 # Shell: views, tabs, export, modal
  index.css               # Styles
  lib/
    db.js                 # IndexedDB data layer
    constants.js          # Labels + field defs
    export.js             # CSV export
  components/
    VisitorForm.jsx       # Add/edit form
    VisitorList.jsx       # Searchable list
    VisitorDetail.jsx     # Detail modal (edit/delete)
public/
  icons/                  # App icons (192, 512, svg)
.github/workflows/deploy.yml
```

## Usage notes

- Add all visitors during the open house; optionally export the CSV afterward.
- Each device keeps its **own** local records (no sync). Export the CSV to consolidate.
