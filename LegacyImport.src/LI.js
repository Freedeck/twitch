const path = require("path");
const Plugin = require(path.resolve('./src/classes/Plugin'));
const fs = require('fs')

class LegacyImport extends Plugin {
	FreedeckInstallLocation = "";
    constructor() {
        super('LegacyImport', 'Freedeck', 'roi.legacyimport', false);
    }

    onInitialize () {
		  this.createSaveData();
			if (!this.getFromSaveData('FreedeckInstallLocation')) {
				this.setToSaveData('FreedeckInstallLocation', 'Change Me!');
			}
		  this.FreedeckInstallLocation = require(path.resolve('./plugins/LI/settings.json')).FreedeckInstallLocation;

		  if (this.FreedeckInstallLocation == 'Change Me!') {
			console.log('Please change the FreedeckInstallLocation in the LegacyImport settings.json file!')
			process.exit(0);
		  }

		  if (!fs.existsSync(path.resolve(this.FreedeckInstallLocation))) {
			console.log('FreedeckInstallLocation is invalid!')
			process.exit(0);
		  }

		  if (fs.existsSync(path.resolve(this.FreedeckInstallLocation, "src/app/assets/sounds"))) {
			console.log('Found sounds folder, importing...')
			if (fs.existsSync(path.resolve("src/public/sounds/.li"))) {
				console.log('Sounds already imported, skipping...')
			}
			fs.readdirSync(path.resolve(this.FreedeckInstallLocation, "src/app/assets/sounds")).forEach(file => {
				fs.copyFileSync(path.resolve(this.FreedeckInstallLocation, "src/app/assets/sounds", file), path.resolve('./src/public/sounds', file));
			});
			fs.writeFileSync(path.resolve("src/public/sounds/.li"), "true");
		}
		  
		console.log('You can now delete this plugin as it it no longer needed and will not allow Freedeck to start.')
		process.exit(0);
		return true;
    }

    onButton(interaction) {
        this.pushNotification(interaction.type + ' pressed!');
        return true;
    }
}

module.exports = {
	exec: () => new LegacyImport(),
 	class: LegacyImport
}