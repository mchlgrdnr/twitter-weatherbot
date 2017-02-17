// dependencies
var bunyan = require('bunyan');
var express = require('express');
var app = express();
var TwitterPackage = require('twitter');
var twitterAPI = require('./twitterAPI');
var weatherAPI = require('./weatherAPI');
var cron = require('node-cron');
var request = require('request');
var sprintf = require("sprintf-js").sprintf;
var twitter = new TwitterPackage(twitterAPI);
var config = require('./config');


// global objects
var log = bunyan.createLogger({name: 'twitter-weatherbot'});

app.listen(3000, function () {
	log.info('Twitter weather bot is running on port 3000!');
	console.log(sprintf('http://api.openweathermap.org/data/2.5/weather?q=%s&APPID=%s', config.city.name, weatherAPI.token));
	// current weather tweet
	cron.schedule(config.schedule.currentWeather, function(){
		request(sprintf('http://api.openweathermap.org/data/2.5/weather?q=%s&APPID=%s', config.city.name, weatherAPI.token), function (error, response, body) {
			if (!error) {
				var currentWeatherData = JSON.parse(body);
				var twitterMessage = sprintf("Aktuell sind es %s°C in Sendenhorst.", convertKelvin2Celsius(currentWeatherData.main.temp));
				twitter.post('statuses/update', {status: twitterMessage},  function(error, tweet, response) {
					if(error) {
						log.error(sprintf("An error occured with the error message %s", error));
					} else {
						log.info("Tweet succesfully posted.");
					}
				});
			} else {
				log.error('An error occured');
			}
		});
	});
});


function convertKelvin2Celsius(kelvin) {
	return (kelvin - 273.15).toFixed(1);
}

