# SAP LeanIX Custom Report

A minimal custom report starter template showcasing SAP LeanIX Reporting SDK basics.

## Features

- Fetches Applications from SAP LeanIX workspace
- Groups applications by business criticality level
- Displays interactive bar chart with Chart.js
- Clean separation of concerns (UI, visualization)
- TypeScript for type safety

## Development

Install dependencies:

```bash
npm install
```

**Important:** Authenticate with your SAP LeanIX workspace before starting development. The recommended way is OAuth via the CLI:

```bash
npx lxr login
```

This opens a browser window, completes the OAuth flow, and saves credentials to `~/.leanix/lxr.json`.

Alternatively, create a `lxr.json` file in the project root with an API token:

```json
{
  "host": "your-workspace.leanix.net",
  "apitoken": "your-api-token"
}
```

A project-level `lxr.json` takes precedence over the user-level one. Either way, add `lxr.json` to your `.gitignore` — it contains sensitive credentials.

Start development server:

```bash
npm run dev
```

The report will run against your SAP LeanIX workspace configured in `lxr.json`.

## Project Structure

```
src/
├── App.tsx           # Main component with data logic, SAP LeanIX configuration, and chart visualization
├── App.css           # Styles
└── main.tsx          # Application entry point
```

## Build

Build for production:

```bash
npm run build
```

Output will be in the `dist/` folder.

## Upload to SAP LeanIX

Upload the report to your SAP LeanIX workspace:

```bash
npm run upload
```

This builds and uploads the report using credentials from `lxr.json`.

## Customization

### Change What Data to Fetch

Edit the `attributes` array in `src/App.tsx`:

```typescript
attributes: ['id', 'displayName', 'businessCriticality'];
```

To use a different field, update the `FIELD_NAME` constant in `src/App.tsx`.

### Modify the Visualization

Edit `src/App.tsx` to change how data is grouped and displayed.

Edit `src/App.tsx` to customize the Chart.js configuration.

### Query Different Fact Sheet Types

Change `fixedFactSheetType` in `src/App.tsx`:

```typescript
fixedFactSheetType: 'BusinessCapability'; // or 'Project', 'ITComponent', etc.
```

## Learn More

- [SAP LeanIX Reporting Documentation](https://help.sap.com/docs/leanix/ea/reporting-framework-and-cli)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
