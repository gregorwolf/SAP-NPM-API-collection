# @sap/vite-plugin-leanix-custom-report

A Vite plugin for developing SAP LeanIX Custom Reports with hot reload, TypeScript support, and seamless deployment.

## Features

- 🚀 Fast development with Vite's hot module replacement
- 📦 Automatic bundling and optimization for LeanIX reports
- 🔧 Built-in TypeScript support
- 📤 One-command deployment to LeanIX workspace
- ⚛️ Optimized for React with TypeScript

## Prerequisites

- Node.js 16+ and npm/yarn/pnpm
- A SAP LeanIX workspace with API access
- A valid SAP LeanIX API token

## Get Started

1. Install vite and this plugin with your favorite package manager, here use npm as example:

```bash
npm install vite @sap/vite-plugin-leanix-custom-report
```

2. Create a `vite.config.ts` file in your project root to config vite to actually use this plugin:

```ts
import { fileURLToPath, URL } from 'node:url';
import leanix from '@sap/vite-plugin-leanix-custom-report';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [leanix()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html'
      }
    }
  }
});
```

3. Create an `./index.html` file that will be the entry point to you app:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

4. Create an `./src/main.js` file that you can use to add some behavior to your HTML page and/or import a framework such as Vue, React, etc.

5. Add the "upload" command to the "script" section of your `package.json` file:

```json
{
  "scripts": {
    "upload": "vite build --mode upload"
  }
}
```

6. Make sure that the package.json file contains both "author" and "description", and add the "leanixReport" section as follows:

```json
{
  "author": "The report author",
  "description": "Description of the report",
  "leanixReport": {
    "id": "<your report id in dot notation, e.g. leanix.net.report.demo>",
    "title": "Your Report Title",
    "defaultConfig": {}
  }
}
```

7. Finally add a `lxr.json` file into your project root folder with the following contents:

```json
{
  "host": "<your workspace instance here, e.g. demo-eu.leanix.net>",
  "apitoken": "<your workspace api token here>"
}
```

⚠️ **Security Note**: Add `lxr.json` to your `.gitignore` to avoid committing sensitive credentials.

8. You are now ready to start developing your report by issuing the following command

```bash
npm run dev
```

## Troubleshooting

**Common Issues:**

- **Build fails**: Ensure all required package.json fields are present
- **Upload fails**: Verify your API token and workspace URL in `lxr.json`
- **Report not loading**: Check browser console for JavaScript errors
