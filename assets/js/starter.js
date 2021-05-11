// Importing JavaScript
//
// You have two choices for including Bootstrap's JS files—the whole thing,
// or just the bits that you need.


// Option 1
//
// Import Bootstrap's bundle (all of Bootstrap's JS + Popper.js dependency)

// import "../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


// Option 2
//
// Import just what we need

// If you're importing tooltips or popovers, be sure to include our Popper.js dependency
// import "../../node_modules/popper.js/dist/popper.min.js";

import "../../node_modules/bootstrap/js/dist/util.js";
import "../../node_modules/bootstrap/js/dist/modal.js";


console.log('Jake was here');

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
				status.innerHTML = `Temp: ${data.main.feels_like}<br>`;
				if (data.main.feels_like > 67) {
					status.innerHTML += '<br>Yeah, prolly not sweater weather';
				} else {
					status.textContent += '<br>Looks like sweater weather.'
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
	return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=3238e8f65f973df777e476458fb6780f&units=imperial`;
}

document.addEventListener("DOMContentLoaded", geoFindMe);
