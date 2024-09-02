# Freedeck Developer Environment

![Developer](https://github.com/Freedeck/media-kit/blob/main/sections/slice1.png?raw=true)

---

Welcome to the official Developer Environment! Here, you can create insanely powerful Freedeck plugins.

## Marketplace

The Marketplace is a built-in section of the Freedeck Companion app that allows users to easily download plugins using [Handoff](https://github.com/Freedeck/handoff).  
You can host your own repo as well [using this server, or your own! (Specification coming soon.)](https://github.com/Freedeck/marketplace-repository-php).  

[You can see the default repository raw here.](https://freedeck.app/_fd/repository.php)

## Want to submit your own plugin to the Marketplace?

[Make an issue here! Title it something related to "Marketplace Submission"!](https://github.com/Freedeck/dev-env/issues/new)

## Back to the Developer Environment

Here's what the plugin system can do:

- Add your own dependencies with a Node project in ASAR format!
- Hook into the Client, Companion, Socket server, AND main process!
  - This allows you to communicate back and forth between every client & send your own encoded events/data.
- Create your own Tiles!
  - You can make sliders, text, button, and more on the way!
- Hook into [other](https://github.com/Freedeck/WaveLink) [applications](https://github.com/Freedeck/obscontrol)!

## Using the Developer Environment

To use the dev-env, it's pretty self explanatory. Take a look at any folder with .src at the end, you'll want to copy that. MyFirstPlugin is a nice and clean base.

**For this guide, I'm going to assume you're changing all references of MyFirstPlugin to MySecondPlugin.**  
**I'll also assume you renamed "MFP.js" to "MSP.js".**

In `index.js`, you'll want to change this lines to reflect your new folder's name:

```js
let name = 'MySecondPlugin'
```

*This step is very important. Without changing this, Freedeck will not be able to find your plugin.*  
In `MySecondPlugin.src/config.js`, you'll want to change this lines to reflect your new plugin entry's name:

```json
entrypoint: 'MSP.js'
```

But.. It still has "MyFirstPlugin" written all over it! Let's change that.

<details>
<summary>The entire code for `MySecondPlugin.src/MSP.js`</summary>

```js
const path = require("path");
const Plugin = require(path.resolve('./src/classes/Plugin'));

class MySecondPlugin extends Plugin {
    constructor() {
        // With JS Hooks, you must keep the ID of your plugin the name of the source folder.
        super('My SECOND Plugin', 'Me', 'MySecondPlugin', false);
    }

    onInitialize () {
        console.log('Initialized my second plugin!')
        this.setJSServerHook("mfp/server.js");
        this.setJSClientHook("mfp/client.js");
        this.setJSSocketHook("mfp/socket.js");
        this.addImport("mfp/myCoolStyle.css");
        this.registerNewType('Example Button Test 1', 'mfp.0');
        this.registerNewType('Example Button Test 2', 'mfp.2');
        this.registerNewType('Example Button JSHook Slider 1', 'mfp.s1', {direction:"vertical",min:0,max:100,step:1,value:0}, "slider");
        // The above is a little verbose, but I'm working on a way to make it easier.
        // This is all you need to do. Freedeck will do all of the logic for you.
        return true;
    }

    onButton(interaction) {
        console.log('Button pressed!', interaction.type);
        console.log(interaction.data) // If it's the slider you slid, you'll see all the data here.
    }

}

module.exports = {
  exec: () => new MySecondPlugin(),
  class: MySecondPlugin
}
```

</details>

## Running

Running a plugin uses a simulated Plugin class. This means you don't need to keep restarting Freedeck to test changes, unless it's something like a button press.  
There are some drawbacks though:

- Hooks are never loaded.. because they have nowhere to load
- All Tile types are "registered" but you can't press them

However, it's simple to build your own tests to press the "Tile"s.

To build and run your plugin in the dev env, just do `node index.js` and let the environment do the rest!  

Very much magic.
