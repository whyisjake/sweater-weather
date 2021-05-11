import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function geoFindMe() {

	const status = document.querySelector('#status');
	let latitude, longitude = '';

	function success(position) {

		// Let's add these to the cache.
		localStorage.setItem('latitude', position.coords.latitude);
		localStorage.setItem('longitude', position.coords.longitude);

		const latitude  = position.coords.latitude;
		const longitude = position.coords.longitude;

		status.textContent = `Getting weather for ${latitude},${longitude}`;
		getWeather(latitude, longitude);
	}

	function error() {
		status.textContent = 'Unable to retrieve your location';
	}

	function getWeather(latitude, longitude) {
		fetch(getWeatherApiUrl(latitude, longitude))
			.then(response => response.json())
			.then(function(data) {
				console.log(data);
				status.innerHTML = `Temp: ${data.main.feels_like}º<br>`;
				if (data.main.feels_like > 67) {
					status.innerHTML += 'Yeah, prolly not sweater weather';
				} else {
					status.innerHTML += 'Looks like sweater weather.'
				}
			});
	}

	function getWeatherApiUrl(latitude, longitude) {
		const params = {
			appid: '3238e8f65f973df777e476458fb6780f',
			lat: latitude,
			lon: longitude,
			units: 'imperial'
		}
		const paramString = new URLSearchParams(params).toString();
		return `https://api.openweathermap.org/data/2.5/weather?${paramString}`;
	}


	if(!navigator.geolocation) {
		status.textContent = 'Geolocation is not supported by your browser';
	} else {

		// Do we have lat/long in the browser cache?
		latitude = localStorage.latitude;
		longitude = localStorage.longitude;

		// We have it in the cache, let's just get the weather.
		if (latitude !== undefined && longitude !== undefined) {
			getWeather(latitude, longitude)
		} else {
			status.textContent = 'Locating…';
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

}

document.addEventListener("DOMContentLoaded", geoFindMe);
