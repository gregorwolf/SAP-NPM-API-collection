# generator-adaptation-project
Yeoman generator for creating an Adaptation project in SAP Business Application Studio.

## Installation (development purposes only)

1. Open your SAP BAS instance.
2. Create a new Basic dev space.
3. Open the `home/user/projects` folder
4. Open a terminal in this folder and `git clone` the repository.
5. Go into your repo in the terminal and run `npm i`
6. Run `npm run build`
7. Run `npm link`
8. Refresh the SAP BAS window
9. If everything works in terminal then run your generator in Yeoman UI
10. To open yeoman-ui: View => Find Command … => Yeoman UI Generators

In case you have changes that you need to apply run `npm unlink` and then repeat the steps from 6 to 9.

## Debugging
### Debugging via the CLI
1. Create a launch.json in the .vscode folder in home/user/projects.
2. Add the following configuration:
```
{
	// Use IntelliSense to learn about possible attributes.
	// Hover to view descriptions of existing attributes.
	"version": "0.2.0",
	"configurations": [
		{
			"type": "node",
			"request": "attach",
			"name": "Attach generator debugger",
			"port": 9229
		}
	]
}
```
3. In the terminal run `node --inspect-brk /home/user/.node_modules_global/bin/yo adaptationproject-creation`
4. Attach to the process by going to the Debug tab, selecting the `Attach generator debugger` configuration and pressing `Start debugging`
5. You can now add breakpoints and start debugging.

### Debugging in Yeoman UI
Steps to prepare your BAS (one time for devspace):
1. In terminal: `npm i -g generator-code`
2. In terminal: `yo code` (choose default answers in all your steps)
3. Download latest vsix of yeoman-ui: https://github.com/SAP/yeoman-ui/releases
4. Create folder: /home/user/default-plugins
5. Copy the downloaded vsix into the "default-plugins" folder
6. Stop and start the devspace

Steps to debug:
1. Opan a generator project to your workspace:
- use existing: /extbin/npm/globals/lib/node_modules/@adaptation-project/generator-adaptation-project
- clone it + npm link after that
2. Put brake points in a generator you want to debug
3. From Comman pallete run "Hosted Plugin: Debug Instance"
4. Choose the extension folder you have created with "yo code"
5. In the opened BAS instance run Comman pallete Yeoman UI Generators
6. Run the desired generator
7. Go to the first BAS instance and see that it is stopped in your brake points

## Enviroment check - workaround

The environment check depends on the presence of a flag as part of the environment variable:
```
process.env.INTERNAL_LANDSCAPE = "internalTrue"
```
In case the flag is not available, you are running in external mode.
Until the environment check functionality is implemented, the generator is running in external mode and you have to simulate the enviroment flag for testing the internal scenario.

The easiest way to do it is to modify the constructor of the `AdaptationProjectGenerator` generator located in `/src/app/index.ts`.
You have to add the following statement:
```
process.env.INTERNAL_LANDSCAPE = "internalTrue";
```
Then run in the Terminal `npm unlink && npm link` and refresh the browser window.
