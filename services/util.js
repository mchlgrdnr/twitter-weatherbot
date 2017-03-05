var util = {};

util.convertKelvin2Celsius = function (kelvin) {
	return (kelvin - 273.15).toFixed(1);
}

module.exports = util;
