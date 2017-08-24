// By city name		By zip code    By geographic coordinates

// Add temp max/min..


//Build search functions
// Animate to Canvas

	//MIn Max temp diff animate sun rays
	
	//Additional weather obj loop in 5 day
	
$('.search2').hide();
	
var $searchMethod	
$('.searchType input').click(function(event){
	$('#weather').attr('disabled', false);
	$('#getWeather').attr('disabled', false);
	$searchMethod = $(this).attr('value');
	if($searchMethod == "geo"){
		$('.search2').show();
		$('.search1').hide();
	}
	else if($searchMethod == "zip"){
		$('#weather').attr('placeholder', 'ex. 97214 or WC2N5DU,UK');
		$('.search2').hide();
		$('.search1').show();
	}
	else{
		$('#weather').attr('placeholder', 'ex. Portland or London,UK');
		$('.search2').hide();
		$('.search1').show();
	}
	
});

// Format and Validate	
$('#getWeather').click(function(event){
	var getJsonString;
	if($searchMethod == 'name'){
		var city = $('#weather').val();
		//q city name and country code divided by comma, use ISO 3166 country codes
		getJsonString = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=aef08817909835269e1ed3691975cbaa&units=imperial';
	}
	else if($searchMethod == 'zip'){
		var zip = $('#weather').val();
		//{zip code},{country code}
		getJsonString = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + '&APPID=aef08817909835269e1ed3691975cbaa&units=imperial'	
	}
	else if($searchMethod == 'geo'){
		var lat = $('#lat').val();
		var lon = $('#lon').val();
		getJsonString = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=aef08817909835269e1ed3691975cbaa&units=imperial'
	}
		
	$.getJSON(getJsonString, function(response){
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
	
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	
	var temp = weather.temp;
	var bgColor;
	if(weather.temp <= 32){
		bgColor = "#D0FFF3";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp > 32 && weather.temp < 50){
		bgColor = "#22FFED";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp >= 50 && weather.temp < 60){
		bgColor = "#FBFF79";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp >= 60 && weather.temp < 70){
		bgColor = "#FFF700";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp >= 70 && weather.temp < 80){
		bgColor = "#FFC800";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp >= 80 && weather.temp < 90){
		bgColor = "#FF8300";
		$('#mainCanvas').css( "background", bgColor )
	}
	else if (weather.temp >= 90 && weather.temp < 100){
		bgColor = "#FF0000"
		$('#mainCanvas').css( "background", bgColor )
	}
	else{
		bgColor = "#D60000"
		$('#mainCanvas').css( "background", bgColor )
	}	
	
	
	var pallete = chroma.scale([bgColor,'#2A4858'])
    .mode('lch').colors(6);
	
	var d = new Date();
	var n = d.getTime();
	console.log(n);
	
	var groundPlane = canvas.height * 0.8;
	var skyLine = canvas.height * 0.3;
	
	ctx.fillStyle = pallete[5];
	
	//ground line
	ctx.lineWidth="1";
	ctx.beginPath();
	ctx.moveTo(0,groundPlane);
	ctx.lineTo(canvas.width,groundPlane);
	ctx.stroke();
	
	//cloud
	ctx.moveTo(canvas.width/2 - 20, skyLine);
	ctx.lineTo(canvas.width/2 + 20, skyLine);
	ctx.stroke();
	
	ctx.beginPath();
	ctx.arc(canvas.width/2,skyLine,20,0,-1*Math.PI);
	ctx.stroke();
	
	//sun path
	ctx.beginPath();
	ctx.arc(canvas.width/2,groundPlane,110,0,2*Math.PI);
	ctx.stroke();
	
	//sun
	ctx.beginPath();
	ctx.arc(41,groundPlane,temp/3,0,2*Math.PI);
	ctx.stroke();
	
	//building
	ctx.beginPath();
	ctx.lineWidth="3";
	ctx.strokeStyle = pallete[5];
	ctx.rect(canvas.width/2 - 20, groundPlane - 80, 40, 80);
	ctx.stroke();
	
	//display
	ctx.font = "8px Arial";
	ctx.fillStyle = pallete[1];
	ctx.fillText(weather.cityName + ' ' + weather.co, 10, 14);
	ctx.fillStyle = pallete[2];
	ctx.fillText(weatherItem.main + ' ' + weatherItem.desc, 10, 26);
	ctx.fillStyle = pallete[3];
	ctx.fillText(weather.temp + ' degrees', 10, 38);
	ctx.fillStyle = pallete[4];
	ctx.fillText('Wind Speed ' + weather.windSpeed + ' Wind Dir ' + weather.windDir, 10, 50);
	ctx.fillStyle = pallete[5];
	ctx.fillText(weather.clouds + ' clouds', 10, 62);
	
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