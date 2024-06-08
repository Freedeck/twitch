const path = require("path");
const Plugin = require(path.resolve('./src/classes/Plugin'));

class autoupdate extends Plugin {
    constructor() {
        super('Autoupdater for Freedeck', 'Freedeck', 'autoupdate', false);
    }

    onInitialize () {
        console.log('Initialized my first plugin!')
        
        return true;
    }

}

module.exports = {
	exec: () => new autoupdate(),
 	class: autoupdate
}