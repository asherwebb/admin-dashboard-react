# swing-shift-dashboard
Swing Shift Hotels admin dashboard built with react .js. Software utilizes auto-reload and auto-jsx-compile. 
<h1>Core Files</h1>
<h2>src/app.js</h2>
This is the main react file for rendering the ui and state
<h2>index.html</h2>
This file contains the dom element targeted by the react render. It also contains links to the 3rd party libraries jquery, jquery-ui and bootstrap

<h1>System Notes</h1>
This was developed on a mac using npm installed by homebrew. It uses node.js v10.33. 
Babel is used for compiling according to FB React recommendation.
https://facebook.github.io/react/docs/getting-started.html

The dev app processes should run offline.
All you need is a local server. MAMP has been tested.

The package.json file gives an overview of the starter and a couple of commands:
```
npm run babel-jsx-watch
npm run gulp-reload
```
To get up and running clone the starter from this repo. You will need to then run
```
npm install
```
