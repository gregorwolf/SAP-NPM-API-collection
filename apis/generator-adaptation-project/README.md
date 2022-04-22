# generator-adaptation-project
Yeoman generator for creating an Adaptation project in SAP Business Application Studio

## Installation (development purposes only)
1. Open your SAP BAS instance
2. Create a new Basic dev space
3. Open the folder `home/user/projects` in a terminal and `git clone` this repository (for issues with user authentication see [BAS help on Connect to Your Git Source Control System](https://help.sap.com/docs/SAP%20Business%20Application%20Studio/9d1db9835307451daa8c930fbd9ab264/e7a42bcb9d124b43be7e396b11d5e808.html)
4. Go into your repo in the terminal and run `npm i`
5. Run `npm run build`
6. Run `npm link`
7. When ready refresh the SAP BAS window
8. To open the yeoman-ui: View => Find Command … => Open Template Wizard _(Currently console prompt mode is not supported)_

In case you have changes that you need to apply run `npm unlink` and then execute steps 5 ans 6

## Debugging
### Steps to prepare your BAS (one time for devspace):
1. In terminal: `npm i -g generator-code`
2. Create a fake debug project as entry point to your project => in terminal: `yo code` (choose default answers in all your steps, remember its name)
3. Download latest vsix of yeoman-ui: (https://github.com/SAP/yeoman-ui/releases)
4. Create folder: /home/user/default-plugins
5. Copy the downloaded vsix into the "default-plugins" folder
6. Stop and start the devspace

### Steps to debug:
1. Put break points in the code of generator-adaptationproject-creation accordingly (click on the left hand-side next to the corresponding line)
2. From Command pallete run "Hosted Plugin: Debug Instance"
4. Choose the name of your extension folder you have created with "yo code" in step 2 in "Steps to prepare your BAS"
5. A new BAS instance opens in a new tab and there run View => Find Command … => Open Template Wizard
6. Crete a new adaptation project to run the creation generator
7. Go to the first BAS instance and see that it has stopped to your break points

### Debugging fine tuning
(in case the break points only in .js-files are fired but not in .ts- files then)
1. Create a launch.json in the .vscode folder in home/user/projects
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
3. Attach to the process by going to the Debug tab (leftmost pane, icon with a bug), selecting the `Attach generator debugger` configuration and pressing `Start debugging`

