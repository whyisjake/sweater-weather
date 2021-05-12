import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function geoFindMe() {

	const status = document.querySelector('#status');
	const temp = document.querySelector('#temp');
	let latitude, longitude = '';

	function success(position) {

		const latitude  = position.coords.latitude;
		const longitude = position.coords.longitude;

		// Let's add these to the cache.
		localStorage.setItem('latitude', latitude);
		localStorage.setItem('longitude', longitude);

		status.textContent = `Getting weather for ${latitude},${longitude}`;
		getWeather(latitude, longitude);
	}

	function error() {
		status.textContent = 'Unable to retrieve your location';
	}

	function getWeather(latitude, longitude) {
		fetch(getWeatherApiUrl(latitude, longitude))
			.then(response => response.json())
			.then((data) => {
				console.log(data);
				temp.innerHTML = `Temp: ${data.main.feels_like}º`;
				if (data.main.feels_like > 67) {
					status.innerHTML = '<i class="bi bi-thermometer-sun"></i> Yeah, prolly not sweater weather';
				} else {
					status.innerHTML = '<i class="bi bi-thermometer-low"></i>Looks like sweater weather.'
				}
			})
			.catch((error) => {
				console.error('Error:', error);
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
