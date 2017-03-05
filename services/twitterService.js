const TwitterPackage = require('twitter');
const twitterAPI = require('../twitterAPI');
const weatherAPI = require('../weatherAPI');
const request = require('request');
const twitter = new TwitterPackage(twitterAPI);
const config = require('../config');
const util = require('./util');
const twitterService = {};
const weatherMessageService = require('./weatherMessageService');
const sprintf = require("sprintf-js").sprintf;

twitterService.tweetCurrentWeather = function () {
	request(sprintf('http://api.openweathermap.org/data/2.5/weather?q=%s&APPID=%s', config.city.name, weatherAPI.token),
		function (error, response, body) {
			if (!error) {
				var currentWeatherData = JSON.parse(body);
				var twitterMessage = weatherMessageService
					.currentCelsiusMessage(util.convertKelvin2Celsius(currentWeatherData.main.temp));

				// tweet current weather message
				twitter.post('statuses/update', {status: twitterMessage},  function(error, tweet, response) {
					if(error) {
						log.error(sprintf("An error occured with the error message %s", error));
					} else {
						log.info(sprintf("Tweet succesfully posted with Message '%s'.", twitterMessage));
					}
				});

			} else {
				log.error('An error occured');
			}
	});
};

module.exports = twitterService;
