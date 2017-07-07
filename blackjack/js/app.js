$('.betChip1').hide();
$('.betChip5').hide();
$('.betChip25').hide();
$('#hit').hide();
$('#stand').hide();
$('#playAgain').hide();

var deck = {
	'names' : ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	'suits' : ['Hearts','Diamonds','Spades','Clubs']
};
var cards = [];
var purse = 25;
var chipValue;
var betTotal = 0;
var betChipValue;
var betChipCount = 0;
var betChipCount1 = 0;
var betChipCount5 = 0;
var betChipCount25 = 0;
var hitIndex = 4;
var player;
var playerTemp;
var dealer;
var aces;
var aceCount = 0;

var test;

function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

for( var s = 0; s < deck.suits.length; s++ ) {
	for( var n = 0; n < deck.names.length; n++ ) {
		cards.push( new card( n+1, deck.names[n], deck.suits[s] ) );
	}
}

for( var c = 0; c < cards.length; c++ ) {
	if (cards[c].name === 'J' || cards[c].name === 'Q' || cards[c].name === 'K'){
			cards[c].value = 10;
	}
}

for( var c = 0; c < cards.length; c++ ) {
	if (cards[c].name === 'A'){
			cards[c].value = 11;
	}
}

// || cards[c].name === 'Q' || cards[c].name === 'K'

//Fisher-Yates (aka Knuth) Shuffle
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

shuffle(cards);

function nextHand(){
	betTotal = 0;
	$('.bet h2 span').replaceWith('<span>' + betTotal + '</span>');
	$('.playerTotal').replaceWith('<p class="playerTotal"></p>');
	betChipCount = 0;
	betChipCount1 = 0;
	betChipCount5 = 0;
	betChipCount25 = 0;
	hitIndex = 4;
	aceCount = 0;
	shuffle(cards);
	$('.purse ul a').addClass('enabled');
	$('.bet ul a').addClass('enabled');
	$('.betChip1').hide();
	$('.betChip5').hide();
	$('.betChip25').hide();
	$('.card').remove();
	$('.game-space h2').remove();
	$('#deal').show();
	$('#hit').hide();
	$('#stand').hide();
}

function lose(){
	if (purse <= 0) {
		$('.game-space').append('<h2 class="results">Sorry, you lose.</br>Your purse is empty.</br>Game Over.</h2>');
		$('#playAgain').show();
	}
	else {
		$('.game-space').append('<h2 class="results">Sorry,  you lose.</h2>');
		window.setTimeout(nextHand, 5000);
	}
}

function push(){
	$('.game-space').append('<h2 class="results">Push.</h2>');
	purse += betTotal;
	$('.purse h2 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 5000);
}
 
function natural(){
	$('.game-space').append('<h2 class="results">Natural 21! We have a winner!</br>Payout is ' + Math.floor(betTotal + betTotal * 1.5) + '</h2>');
	purse += Math.floor(betTotal + betTotal * 1.5);
	$('.purse h2 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 5000);
}

function win(){
	$('.game-space').append('<h2 class="results">You win!  Payout is ' + betTotal * 2 + '</h2>');
	purse += betTotal * 2;
	$('.purse h2 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 5000);
}

//updates text for purse and bet
$('.purse h2 span').text(purse);
$('.bet h2 span').text(betTotal);

$('.purse ul a').click(function(event){
	event.preventDefault();
	$('.placeBetMessage').hide();
	if ($(this).hasClass('enabled')) {
		chipValue = parseInt($(this).children().text());
		tif (betTotal < 25) {
			if (purse >= chipValue)	{
				purse -= chipValue;
				$('.purse h2 span').replaceWith('<span>' + purse + '</span>');
				betTotal += chipValue;
				$('.bet h2 span').replaceWith('<span>' + betTotal + '</span>');
				if (chipValue === 1){
					betChipCount1 += 1;
					betChipCount = betChipCount1
				} 
				else if (chipValue === 5){
					betChipCount5 += 1;
					betChipCount = betChipCount5
				} else {
					betChipCount25 += 1;
					betChipCount = betChipCount25
				}
				$('.betChip' + chipValue).show();
				$('.betChip' + chipValue + ' li').text('x' + betChipCount);
			} else {
				alert('Sorry you don\'t have that in your purse.');
			}
		} else {
			alert('Sorry, that exceeds the maximum bet of 25. Deal?')
		}		
	}
});	

$('.bet ul a').click(function(event){
	event.preventDefault();
	if ($(this).hasClass('enabled')) {
		if ($(this).hasClass('betChip1')){
			betChipValue = 1;
			betChipCount = betChipCount1;
			betChipCount1 -=1;
		}
		else if ($(this).hasClass('betChip5')){
			betChipValue = 5;
			betChipCount = betChipCount5;
			betChipCount5 -=1;
		} else {
			betChipValue = 25;
			betChipCount = betChipCount25;
			betChipCount25 -=1;
		}
		purse += betChipValue;
		betTotal -= betChipValue;
		$('.purse h2 span').replaceWith('<span>' + purse + '</span>');
		$('.bet h2 span').replaceWith('<span>' + betTotal + '</span>');
		betChipCount -= 1;
		$('.betChip' + betChipValue + ' li').replaceWith('<li>x' + betChipCount +'</li>');
		if(betChipCount === 0){
			$(this).hide();
		}
	}
});	
	
$('#deal').click(function(){
	if (betTotal === 0){
		alert('Minimum bet is 1. Please click on your chips to place your bet.');
	} else {
		$(this).hide();
		$('.purse ul a').removeClass('enabled');
		$('.bet ul a').removeClass('enabled');
		$('.playerCards').append('<li class="card">'+ cards[0].name + ' ' + cards[0].suit +'</li>');
		$('.playerCards').append('<li class="card">'+ cards[1].name + ' ' + cards[1].suit +'</li>');
		$('.dealerCards').append('<li class="card">'+ cards[2].name + ' ' + cards[2].suit +'</li>');
		$('.dealerCards').append('<li class="card hole">'+ cards[3].name + ' ' + cards[3].suit +'</li>');
		
		player = cards[0].value + cards[1].value;
		$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '</p>');
		dealer = cards[2].value + cards[3].value;
		
		if (dealer === 22) {
			dealer -= 10;
			$('.dealerCards li').addClass('double-aces');
		}
		
		if (player === 22) {
			player -= 10;
			$('.playerCards li').addClass('double-aces');
			$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '</p>');
			$('#hit').show();
			$('#stand').show();
		}
		else if (player === 21) {
			$('.hole').removeClass('hole');
			if (dealer === 21){
				push();
			}
			else {
				natural();
			}
		} else {
			$('#hit').show();
			$('#stand').show();
		}
	}
});

function stand(){
	$('#stand').hide();
	$('#hit').hide();
	$('.hole').removeClass('hole');
	while (dealer <= 16){
		$('.dealerCards').append('<li class="card">' + cards[hitIndex].name + ' ' + cards[hitIndex].suit +'</li>');
		dealer += cards[hitIndex].value;
		
		
		hitIndex += 1;
		
		
		
		if (dealer > 21){
			$('.game-space').append('<h2 class="result">Dealer is bust!</h2>');
			win();
		}
	}
	if (dealer === player){
		push();
	}
	else if (dealer > player && dealer <= 21){
		lose();
	} 
	else if (player > dealer && dealer <= 21) {
		win();
	}  
}


$('#hit').click(function(){
	
	// Adds card to page with name and suit 
	$('.playerCards').append('<li class="card">' + cards[hitIndex].name + ' ' + cards[hitIndex].suit +'</li>');
	
	//adds the last hit card to player total
	player += cards[hitIndex].value;
	
	
	
	
	//$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '</p>');
	
	//if (player > 21 && $('.playerCards li:first-child').hasClass('double-aces') && cards[hitIndex].value === 11){
		//player -= 10;
	//}
	
	
	//if($('.playerCards li:first-child').hasClass('double-aces')) {
		//player += 10
	//}
	//what if double aces..and then 10..if dbl aces & over 21..subtract 10 more
	
	
	
	
	playerTemp = player;
	
	// Checks if each card is an ace and counts them
	$('.playerCards li').each(function() {
		aces = $(this).text();
		if (aces[0] === 'A'){
			aceCount += 1;
		}
	});
	
	if (aceCount >= 1) {
		player -= 10 * aceCount;
		$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '</p>');
		/*if (player + 10 === 21){
			player += 10;
			$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '. Stand.</p>');
			aceCount = 0;
			hitIndex += 1;
			window.setTimeout(stand, 3000);
		}*/
	}
	
	hitIndex += 1;
	
	if (player > 21) {
		$(this).hide();
		$('#stand').hide();
		$('.game-space').append('<h2 class="result">Bust!</h2>');
		$('.playerTotal').replaceWith('<p class="playerTotal"></p>');
		$('.hole').removeClass('hole');
		lose();
	}
	
	else if (player === 21) {
		$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '. Stand.</p>');
		//aceCount = 0;
		window.setTimeout(stand, 3000);
	}
	
	else {
		player = playerTemp;
		$('.playerTotal').replaceWith('<p class="playerTotal">Player has: ' + player + '</p>');
		aceCount = 0;
	}
	
	
});

$('#playAgain').click(function(event) {
	location.reload();
});





//Calculate the Aces

//payout properly defined?

//Aesthetics...small place bet message in btwn..display player and dealer values hands...timing...transitions...sound

//tidy code?..start hidden? and comment














	











































