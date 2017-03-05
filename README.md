# twitter-weatherbot
Twitter weather bot


## Install

1. To install the twitter weatherbot you just need to clone this repository and install all dependencies with ```npm install``. After that you have to add your twitter API data and your open weather access token.

2. You also have to add configuration files for the weather API and the twitter API:

### Twitter twitterAPI.json
```javascript
{
	"consumer_key": "<consumer_key>",
	"consumer_secret": "<consumer_secret>",
	"access_token_key": "<access_token_key>",
	"access_token_secret": "<access_token_secret>"
}

```

### Twitter twitterAPI.json ([openWeather](https://openweathermap.org/))
```javascript
{
	"token": "<token>"
}
```


## Coming soon
* ElasticSearch integration to log weather information
* Choose Weather messages with some intelligence service
* Weather prognose tweets, not only current state
* analytics to analyse the current weather with the given API information


