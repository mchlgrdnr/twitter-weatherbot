const sprintf = require("sprintf-js").sprintf;
const weatherMessageService = {};

weatherMessageService.currentCelsiusMessage = function (celsius) {
	var message = '';

	const generalMessages = [
		'Aktuell sind es %s°C in Sendenhorst.',
		'Sendenhorst: %s°C',
		'Das Wetter in Sendenhorst: %s°C',
		'Gerade sind es %s°C',
		'%s°C'
	];

	const goodWeatherMessages = [
		'Frühlinghaftes Wetter in Sendenhorst: %s°C sind es gerade.',
		'Angenehme %s°C sind es gerade.'
	];

	// get random message
	if (celsius > 20) {
		var index = Math.floor(Math.random() * goodWeatherMessages.length);
		message = goodWeatherMessages[index];
	} else {
		var index = Math.floor(Math.random() * generalMessages.length);
		message = generalMessages[index];
	}

	return sprintf(message, celsius);
};

module.exports = weatherMessageService;
