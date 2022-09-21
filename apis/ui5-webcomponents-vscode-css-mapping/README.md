# ui5-webcomponents-vscode-css-mapping

The CSS Variable Mapping from [UI5 Web Components](https://sap.github.io/ui5-webcomponents/) / [Open UI5](https://openui5.org/) to [VSCode theming variables](https://code.visualstudio.com/api/references/theme-color#base-colors) in CSS format.

## Background in Webview UI Development

1. To develop the VSCode extensions with Webview UI, the [Webview UI Toolkit for VSCode](https://github.com/microsoft/vscode-webview-ui-toolkit/) can fit well and be convenient to use in many scenarios.
1. Sometimes when the Webview UI Toolkit for VSCode is not enough, or there have been massive existing UI elements made with UI5 libraries, this mapping can save some efforts to deal with detailed styling in UI controls, with native support of different VSCode themes.


## Prerequisites

- You're using `@ui5/webcomponents` or `openui5` as the UI Library.
- \[Optional\] Build your app with modern bundlers like webpack, esbuild and etc, or with tool-chains like @angular/cli or react-scripts.

## Installation

If you're using modern bundlers with components like css-loader to build your app, it's quite easy for you to introduce this mapping in 2 steps.
1. In your project, run `npm install file:path/to/sap-ui5-webcomponents-vscode-css-mapping.tgz`
1. In the index.ts or app.ts:
    ```TypeScript
    import "@sap/ui5-webcomponents-vscode-css-mapping/dist/vscode-to-ui5-webcomponents.css";
    import "@sap/ui5-webcomponents-vscode-css-mapping/dist/quartz-legends.css"; // optional when using @ui5/webcomponents or SAPUI5(OpenUI5)
    ```
1. Start enjoying the seamless theme switching in VSCode/BAS.

If you're not using any bundling tools, it's also workable (but not recommended):
1. In your project, run `npm install file:path/to/sap-ui5-webcomponents-vscode-css-mapping.tgz`
1. Copy these files to your preferred location, e.g., into `assets/styles/` folder.
    - `node_modules/@sap/ui5-webcomponents-vscode-css-mapping/dist/vscode-to-ui5-webcomponents.css` => `assets/styles/vscode-to-ui5-webcomponents.css`
    - `node_modules/@sap/ui5-webcomponents-vscode-css-mapping/dist/quartz-legends.css` => `assets/styles/quartz-legends.css`
1. Refer to them in `index.html`:
    ```html
    <head>
        <link rel="stylesheet" href="styles/vscode-to-ui5-webcomponents.css">
        <link rel="stylesheet" href="styles/quartz-legends.css"> <!-- optional when using @ui5/webcomponents or SAPUI5(OpenUI5) -->
    </head>
    ```
1. Start enjoying the seamless theme switching.

In case that the definitions of any variables were missing, we also provided fallback variable definitions in some files. At present there're 2 types of fallback: light and dark.

To consume styles with fallback, just add the type of fallback as suffix of file path, like:
```html
   <head>
        <link rel="stylesheet" href="styles/vscode-to-ui5-webcomponents-light.css">
   </head>
```

## Try example
1. In the root folder on this repo, install and build
    ```bash
    npm install
    npm pack
    npm run install:examples
    npm run build:examples
    ```
1. Press F5 if this root repo has been opened in VSCode as its first workspace folder.
1. Input VSCode Command `Webview Consumer: Show Webview` in Command Pallette
1. Switch among different themes and observe the styles.

## Development

- Clone
    ```bash
    git clone https://github.wdf.sap.corp/devx-wing/ui5-webcomponents-vscode-css-mapping;
    ```
- Install dependencies and generate an npm package
    ```bash
    npm install
    npm pack
    ```