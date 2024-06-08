const path = require("path");
const Plugin = require(path.resolve('./src/classes/Plugin'));

class ExamplePlugin extends Plugin {
    constructor() {
        // With JS Hooks, you must keep the ID of your plugin the name of the source folder.
        super('My First Plugin', 'Me', 'MyFirstPlugin', false);
    }

    onInitialize () {
        console.log('Initialized my first plugin!')
        this.setJSServerHook("mfp/server.js");
        this.setJSClientHook("mfp/client.js");
        this.setJSSocketHook("mfp/socket.js");
        this.addImport("mfp/myCoolStyle.css");
        this.registerNewType('Example JSHook Test', 'fd.example.jshook');
        // This is all you need to do. Freedeck will do all of the logic for you.
        return true;
    }

}

module.exports = {
	exec: () => new ExamplePlugin(),
 	class: ExamplePlugin
}