import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

function geoFindMe() {

	const status = document.querySelector('#status');

	function success(position) {
		const latitude  = position.coords.latitude;
		const longitude = position.coords.longitude;

		console.log(latitude, longitude);
		console.log(getWeatherApiUrl(latitude, longitude));
		status.textContent = `Getting weather for ${latitude},${longitude}`;
		fetch(getWeatherApiUrl(latitude, longitude))
			.then(response => response.json())
			.then(function(data) {
				console.log(data);
				status.innerHTML = `Temp: ${data.main.feels_like}º<br>`;
				if (data.main.feels_like > 67) {
					status.innerHTML += 'Yeah, prolly not sweater weather';
				} else {
					status.textContent += 'Looks like sweater weather.'
				}
			});
	}

	function error() {
	  status.textContent = 'Unable to retrieve your location';
	}

	if(!navigator.geolocation) {
	  status.textContent = 'Geolocation is not supported by your browser';
	} else {
	  status.textContent = 'Locating…';
	  navigator.geolocation.getCurrentPosition(success, error);
	}

}

function getWeatherApiUrl(latitude, longitude) {
	const params = {
		lat: latitude,
		lon: longitude,
		appid: '3238e8f65f973df777e476458fb6780f',
		units: 'imperial'
	}
	const paramString = new URLSearchParams(params).toString();
	return `https://api.openweathermap.org/data/2.5/weather?${paramString}`;
}

document.addEventListener("DOMContentLoaded", geoFindMe);
