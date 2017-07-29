// By city name		By zip code    By geographic coordinates

// Add temp max/min..


//Build search functions
// Animate to Canvas

	//MIn Max temp diff animate sun rays
	
	//Additional weather obj loop in 5 day
	

$('#weather').click(function(event){
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?q=Mumbai&APPID=aef08817909835269e1ed3691975cbaa&units=imperial', function(response){
		var JSON = response;
		
		console.log(response);
			
		var cityId = JSON.id; //City ID
		var cityName = JSON.name; //City name
		var lon = JSON.coord.lon;   //...City geo location, longitude
		var lat = JSON.coord.lat;   //...City geo location, latitude
		var temp = JSON.main.temp; //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
		var windSpeed = JSON.wind.speed; //Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
		var windDir = JSON.wind.deg; //Wind direction, degrees (meteorological)
		var clouds = JSON.clouds.all; //Cloudiness, %
		var co = JSON.sys.country; //Country code (GB, JP etc.)
		var rise = JSON.sys.sunrise; //Sunrise time, unix, UTC
		var set = JSON.sys.sunset; //Sunset time, unix, UTC
		
		var weatherArray = [];
		
		for(i = 0; i < JSON.weather.length; i++){
			
			main = JSON.weather[i].main; //...Group of weather parameters (Rain, Snow, Extreme etc.)
			desc = JSON.weather[i].description; //....Weather condition within the group
			
			var weatherItem = new weatherDesc(main, desc);
			weatherArray.push(weatherItem);			
		}
			
		var weather = new weatherObj(cityId, cityName, lon, lat, co, temp, windSpeed, windDir, clouds, rise, set);
		
		displayDesc(weatherArray);
		displayWeather(weather);
		
		draw(weatherItem, weather);
		
	}) 
});	

function weatherDesc(main, desc) {
		this.main = main;
		this.desc = desc;
};

function weatherObj(cityId, cityName, lon, lat, co, temp, windSpeed, windDir, clouds, rise, set) {
		this.cityId = cityId;
		this.cityName = cityName;
		this.co = co;
		this.lon = lon;
		this.lat = lat;
		this.temp = temp;
		this.windSpeed = windSpeed;
		this.windDir = windDir;
		this.clouds = clouds;
		this.rise = rise;
		this.set = set;	
};  

function displayWeather(weather){
	for(attr in weather){
		$('.current').append('<li>' + attr + ": " + weather[attr] +'</li>');
	}
}

function displayDesc(weatherArray){
	for(i = 0; i < weatherArray.length; i++){
		$('.current').append('<li>' + weatherArray[i].main +'</li>');
		$('.current').append('<li>' + weatherArray[i].desc +'</li>');
	}
} 




function draw(weatherItem, weather){
	var canvas = document.getElementById("mainCanvas");
	var ctx = canvas.getContext("2d");
	var temp = weather.temp;
	if(weather.temp <= 32){
		$('#mainCanvas').css( "background", "#D0FFF3" )
	}
	else if (weather.temp > 32 && weather.temp < 50){
		$('#mainCanvas').css( "background", "#22FFED" )
	}
	else if (weather.temp >= 50 && weather.temp < 60){
		$('#mainCanvas').css( "background", "#FBFF79" )
	}
	else if (weather.temp >= 60 && weather.temp < 70){
		$('#mainCanvas').css( "background", "#FFF700  " )
	}
	else if (weather.temp >= 70 && weather.temp < 80){
		$('#mainCanvas').css( "background", "#FFC800" )
	}
	else if (weather.temp >= 80 && weather.temp < 90){
		$('#mainCanvas').css( "background", "#FF8300" )
	}
	else if (weather.temp >= 90 && weather.temp < 100){
		$('#mainCanvas').css( "background", "##FF0000" )
	}
	else{
		$('#mainCanvas').css( "background", "#D60000" )
	}	
	//ctx.fillStyle = "#666";
	//ctx.beginPath();
	//ctx.arc(95,50,temp,0,2*Math.PI);
	//ctx.stroke();	
}


/*
$('#weather').click(function(event){
	$.getJSON(
	'http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=aef08817909835269e1ed3691975cbaa&units=imperial', function(response){
		var fiveDayJSON = response;
		console.log(response);
		
		var cityId = fiveDayJSON.city.id; //City ID
		var cityName = fiveDayJSON.city.name; //City name
		var lat = fiveDayJSON.city.coord.lat; //City geo location, latitude
		var lon = fiveDayJSON.city.coord.lon; //City geo location, longitude
		var co = fiveDayJSON.city.country; //Country code (GB, JP etc.)
		
		var weather = new weatherObj(lon, lat, co, cityId, cityName);
		// main, desc, temp, windSpeed, windDir, clouds
		
		var weatherArray = [];
		
		for(i = 0; i < fiveDayJSON.list.length; i++){
			var temp = fiveDayJSON.list[i].main.temp; //Temperature. Unit Default: Kelvin, Metric: Celsius, Imperial: Fahrenheit.
			
			//Another weather array to iterate through if I please...
			
			var main = fiveDayJSON.list[i].weather[0].main //Group of weather parameters (Rain, Snow, Extreme etc.)
			var desc = fiveDayJSON.list[i].weather[0].description //Weather condition within the group
			var clouds = fiveDayJSON.list[i].clouds.all //Cloudiness, %
			var windSpeed = fiveDayJSON.list[i].wind.speed //Wind speed. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour.
			var windDir = fiveDayJSON.list[i].wind.deg //Wind direction, degrees (meteorological)
			
			var forecastItem = new weatherDesc(main, desc, temp, windSpeed, windDir, clouds);
			weatherArray.push(forecastItem);			
		}
		
		displayDesc(weatherArray);
		displayWeather(weather);	
	 })
 });

*/ 
 

/*
function weatherObj(lon, lat, co, cityId, cityName) {
		this.lon = lon;
		this.lat = lat;
		this.co = co;
		this.cityId = cityId;
		this.cityName = cityName;
}; 

function weatherDesc(main, desc, temp, windSpeed, windDir, clouds) {
		this.main = main;
		this.desc = desc;
		this.temp = temp;
		this.windSpeed = windSpeed;
		this.windDir = windDir;
		this.clouds = clouds;
};

*/



/*

function display2(weatherArray){
	for(i = 0; i < weatherArray.length; i++){
		$('.current').append('<li>' + weatherArray[i].main +'</li>');
		$('.current').append('<li>' + weatherArray[i].desc +'</li>');
		$('.current').append('<li>' + weatherArray[i].windSpeed +'</li>');
		$('.current').append('<li>' + weatherArray[i].windDir +'</li>');
		$('.current').append('<li>' + weatherArray[i].clouds +'</li>');
	}
} 


*/



	
 
/*
 
//var canvas = document.createElement('canvas');
//canvas.id     = "CursorLayer";
//canvas.width  = 800;
//canvas.height = 600;

//document.body.appendChild(canvas);





*/