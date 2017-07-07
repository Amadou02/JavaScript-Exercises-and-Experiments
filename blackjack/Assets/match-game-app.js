var imagePaths = [
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-viscous.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-terrestrial.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-arctic.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-portal.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-molten.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-jovian.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-neptunian.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-solara.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-glacial.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-lucid.jpg',
	'http://wallacedaniel.com/jQuery/match-game/img/jubilant-art-stratosphere.jpg'
];
	

var cardReverse = 'http://wallacedaniel.com/jQuery/match-game/img/card-back.jpg';
var deckCounter = 0;
var itemCounter = 0;
var pathCounter;
var dealCounter; 
var imagePath;
var $placeRandom;
var $guess;
var guess1;
var guess2;
var guessCount = 0;
var correctGuess = 0;
var clickCount = 0;

//Creates the empty list items to hold the cards
for (var i = 1; i <= 14; i += 1) {
	$("#image-gallery").append('<li class="empty"></li>');
}

//Will be equal to the number of cards
$("#image-gallery li").each(function() {
		itemCounter += 1;
});

while (deckCounter < 7) {
	imagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
	
	pathCounter = 0;
	
	$("#image-gallery li a").each(function() {
		if($(this).attr("href") == imagePath) {
			pathCounter += 1;
		}
	});
	
	dealCounter = 0;
	
	if (pathCounter == 0) {   
		while (dealCounter < 2) {
			$placeRandom = $($("#image-gallery li")[Math.floor((Math.random() * 14) + 0)]);
			if ($placeRandom.hasClass("empty")){
				$placeRandom.append('<a class="face" href="' + imagePath + '"><img class="face" src="' + imagePath + '"alt="match-game-card" /><a class="reverse" href="' + cardReverse + '"><img class="reverseImage" src="' + cardReverse + '"alt="match-game-card" /></a>').removeClass("empty");
				dealCounter += 1;
			}
		}
	deckCounter += 1;	
	}
}

$(".face").each(function(){
	$(this).hide();
});

$(".reverse").click(function(event) {
	event.preventDefault();
	$(this).hide();
	$(this).parent().addClass("guessList");
	$(this).prev().show().addClass("guess").click(function(event) {
		event.preventDefault();
	});
	$(".guess").children().show().addClass("guess");
	$guess = $(this).prev().attr("href");
	guessCount += 1;
	clickCount += 1; 
	
	if (guessCount == 1){
		guess1 = $guess;
	} 
	if (guessCount == 2){
		guess2 = $guess;
		if (guess1 != guess2) {
			$(".guessList .reverse").show("slow");
			$(".guessList .reverseImage").show("slow");
			$(".guess").hide("slow");
			$(".guessList").removeClass("guessList");
			$(".guess").removeClass("guess");
			guessCount = 0;
		} else {
			$(".guess").children().hide("slow");
			$(".guessList .guess").hide("slow");
			$(".guessList .reverse").remove();
			$(".guessList .reverseImage").remove();
			$(".guessList").removeClass("guessList");
			$(".guess").removeClass("guess");
			correctGuess += 1;
			guessCount = 0;
			if (correctGuess * 2 == itemCounter) {
				$(".content").append('<h2 class="winner">Winner!</h2>');
				$(".content").append('<p class="turns">It took you ' + clickCount / 2  + ' turns.</p>');
				$(".content").append("<button>Play Again!</button>");
				$("button").click(function(event) {
					location.reload();
				});
			}
		}
	}
});
















  

	  






	  
	  

 











	




