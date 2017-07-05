$(document).ready(function(){
	$('#getWeather').on('click', function() {
  	if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(showWeather);
  	} else { 
    	document.getElementById('location').innerHTML = "Geolocation is not supported by this browser.";
    }
		
		$('#unit').show();
	});
	
	$('#unit').on('click', function() {
 		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(toggleCF);
  	}
	});
	
});

function showWeather(position) {
	var result;
	var data;
	var latitude = position.coords.latitude.toFixed(6);
	var longitude = position.coords.longitude.toFixed(6);
	
	$.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&result_type=neighborhood&key=[YOUR API KEY]", function(result, status) {
		console.log(result);
		$('#display').addClass('showBackground');
		$('#location').html(result.results["0"].formatted_address);
	});
	
	$.getJSON("https://api.darksky.net/forecast/[YOUR API KEY]/"+latitude+","+longitude+"?callback=?", function(data) {
  	console.log(data);
  	$('#temp').html(Math.round(data.currently.temperature)+"&ordm; F");
 	  $('#description').html(data.currently.summary);
		//$('#weatherIcon').html(data.currently.icon);
		console.log(data.currently.icon);
		
		var skycons = new Skycons({"color":"#f98257"});
		switch(data.currently.icon) {
			case "clear-day":
				skycons.set("weatherIcon", Skycons.CLEAR_DAY);
				skycons.play();
				break;
			case "clear-night":
				skycons.set("weatherIcon", Skycons.CLEAR_NIGHT);
				skycons.play();
				break;
			case "rain":
				skycons.set("weatherIcon", Skycons.RAIN);
				skycons.play();
				break;
			case "snow":
				skycons.set("weatherIcon", Skycons.SNOW);
				skycons.play();
				break;
			case "sleet":
				skycons.set("weatherIcon", Skycons.SLEET);
				skycons.play();
				break;
			case "wind":
				skycons.set("weatherIcon", Skycons.WIND);
				skycons.play();
				break;
			case "fog":
				skycons.set("weatherIcon", Skycons.FOG);
				skycons.play();
				break;
			case "cloudy":
				skycons.set("weatherIcon", Skycons.CLOUDY);
				skycons.play();
				break;
			case "partly-cloudy-day":
				skycons.set("weatherIcon", Skycons.PARTLY_CLOUDY_DAY);
				skycons.play();
				break;
			case "partly-cloudy-night":
				skycons.set("weatherIcon", Skycons.PARTLY_CLOUDY_NIGHT);
				skycons.play();
				break;
			default:
				skycons.set("weatherIcon", Skycons.CLEAR_DAY);
				skycons.play();
				break;
		}
	});
}

function toggleCF(position) {
	var unit = $('#temp').text();
	console.log(unit[unit.length-1]);
	var data;
	var latitude = position.coords.latitude.toFixed(6);
	var longitude = position.coords.longitude.toFixed(6);
	
 	$.getJSON("https://api.darksky.net/forecast/[YOUR API KEY]/"+latitude+","+longitude+"?callback=?", function(data) {
  	var tempF = Math.round(data.currently.temperature);
		console.log(tempF);
		if(unit[unit.length-1] == "F") {
			var c = Math.round((tempF-32)*(5/9));
			$('#temp').html(c+"&ordm; C");
		} else if(unit[unit.length-1] == "C") {
			$('#temp').html(tempF+"&ordm; F");
		}
	});
}
