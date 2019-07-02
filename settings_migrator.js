const DefaultSettings = {
	enabled: true,
	defaultServants: {}
};

module.exports = function MigrateSettings(from_ver, to_ver, settings) {
	if (from_ver === undefined)
		return Object.assign(Object.assign({}, DefaultSettings), settings);
	else if (from_ver === null) return DefaultSettings;
	else {
		if (from_ver + 1 < to_ver) {
			settings = MigrateSettings(from_ver, from_ver + 1, settings);
			return MigrateSettings(from_ver + 1, to_ver, settings);
		}

		switch (to_ver) {
			/*case 2:
				settings.x = true;
				break;*/
			default:
				console.log(
					`[TerableServant] Your "config.json" was very outdated, so I've remade it.`
				);
				Object.keys(settings).forEach(key => delete settings[key]);
				settings = JSON.parse(JSON.stringify(DefaultSettings));
				break;
		}
		return settings;
	}
};
