const path = require("path");
const Plugin = require(path.resolve('./src/classes/Plugin'));

class ExampleStatefulButton extends Plugin {
    state = false;

    constructor() {
        // With JS Hooks, you must keep the ID of your plugin the name of the source folder.
        super('Freedeck 6: Example Stateful Button', 'Freedeck', 'ExampleStatefulButton', false);
    }

    onInitialize () {
        // This is an advanced plugin example!
        console.log('Initialized example stateful button plugin.')
        this.setJSServerHook("JSHookServer.js");
        this.setJSClientHook("JSHookClient.js");
        this.setJSSocketHook("JSHookSocket.js");
        this.registerNewType('This is before the state updates', 'sfb.button0');
        // This is all you need to do. Freedeck will do all of the logic for you.
        
        setInterval(() => {
            this.stateLoop();
        }, 1000);
        
        return true;
    }

    stateLoop() {
        // This will check the "state" or value of the button.
        // In this case, we will just flip a boolean.
        state = !state;

        // This will update the state of the button.
        this.stateChange({
            wanted: 'sfb.button0', // We want to change specifically only the button with the ID of "sfb.button0"
            state: state // This is the state we want to change it to.
        })
    }

    stateChange(changeData) {
        // Leave this empty so it can be initialized by the JS Socket hook.
    }
}

module.exports = {
	exec: () => new ExampleStatefulButton(),
 	class: ExampleStatefulButton
}