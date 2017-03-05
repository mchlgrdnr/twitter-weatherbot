const bunyan = require('bunyan');
const express = require('express');
const app = express();
const cron = require('node-cron');
const config = require('./config');
const twitterService = require('./services/twitterService');
const utilService = require('./services/util');
const sprintf = require("sprintf-js").sprintf;

// global logging object
global.log = bunyan.createLogger({name: 'twitter-weatherbot'});

app.listen(config.app.port, function () {
	log.info(sprintf('Twitter weather bot is running on port %s!', config.app.port));

	// cron shedule weather tweet
	cron.schedule(config.schedule.currentWeather, function () {
		twitterService.tweetCurrentWeather();
	});
});
