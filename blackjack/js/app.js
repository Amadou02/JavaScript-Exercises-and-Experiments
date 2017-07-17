
//Dynamic column sizing for xtra cards.

//write a tester

    //Ace check in deal for double aces case

	//natural > natural  ...Looks good  except style "Dealer is Bust" "You win Payout is"
	       // > push
	
	//bust      ...Looks good ... "Bust Sorry You Lose"    
	//blackjack ...dont need to reveal dealer or tally..or result(wait..actually looks good with the pause?..always?)  ..showed a push with 21 dealer
		// 10 10 A  stopped the seond stage  and dealerTally
		
		//"Black Jack"   Then.."You Win Payout is!"
	                                                 
	//stand > dealer bust > win  ...Looks good  except style "Dealer is Bust" "You win Payout is"
	     // > win                ...Looks good
		 // > lose               ...Looks good
		 // > push               ...Looks good
		
		// 1 Ace works


		
// Pass variables..objects		 
		 
// Timing	
	        

			
//Hidden Elements
$('.betChip1').hide();
$('.betChip5').hide();
$('.betChip25').hide();
$('#hit').hide();
$('#stand').hide();
$('.overPurseLimit').hide();
$('.overBetLimit').hide();

//Creates a standard 52 card deck
var deck = {
	'names' : ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
	'suits' : ['Hearts','Diamonds','Spades','Clubs']
};

var cards = [];



//Defines a card
function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

//For each suit, create a card for each name A - K
for( var s = 0; s < deck.suits.length; s++ ) {
	for( var n = 0; n < deck.names.length; n++ ) {
		cards.push( new card( n+1, deck.names[n], deck.suits[s] ) );
	}
}
//Face cards receive a value of 10
for( var c = 0; c < cards.length; c++ ) {
	if (cards[c].name === 'J' || cards[c].name === 'Q' || cards[c].name === 'K'){
			cards[c].value = 10;
	}
}

//Ace receives a value of 11
for( var c = 0; c < cards.length; c++ ) {
	if (cards[c].name === 'A'){
			cards[c].value = 11;
	}
}

// Shuffle the deck
// Fisher-Yates (aka Knuth) Shuffle
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

var purse = 100;
var chipValue;          
var betTotal = 0;
var betChipValue;
var betChipCount = 0;
var betChipCount1 = 0;
var betChipCount5 = 0;
var betChipCount25 = 0;

//sets text for purse and bet
$('.purse h4 span').text(purse);
$('.bet h4 span').text(betTotal);

// Handles function of chips in player purse
$('.purse a').click(function(event){
	event.preventDefault();	
	// Hide place bet message and enable the deal button
	$('.placeBetMessage').hide();
	$('#deal').prop('disabled', false);	
	if ($(this).hasClass('enabled')) {
		// Set chip value to value of chip clicked
		chipValue = parseInt($(this).text());
		if (betTotal + chipValue <= 50) {
			// Checks if player has sufficient value in purse to place chip
			if (purse >= chipValue)	{
				purse -= chipValue;
				// Update display for Purse and Bet totals
				$('.purse h4 span').replaceWith('<span>' + purse + '</span>');
				betTotal += chipValue;
				$('.bet h4 span').replaceWith('<span>' + betTotal + '</span>');
				// Determines which bet chip value to work with 
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
				// Updates display of chips and qty txt in bet chips
				$('.betChip' + chipValue).show();
				$('.betChip' + chipValue).text('x' + betChipCount);
			} else {
				// Displays if player bets more than in purse
				$('.overPurseLimit').show();
				window.setTimeout(overPurseMsg, 2000);
			}
		} else {
			// Displays if player bets over the table limit
			$('.overBetLimit').show();
			window.setTimeout(overBetMsg, 2000);
			
		}		
	}
});	

// Handles return of chips from player bet 
$('.bet a').click(function(event){
	event.preventDefault();
	//remove clsss if changed to button
	if ($(this).hasClass('enabled')) {
		//Detrmines value of chip being returned
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
		//updates bet and purse total dispaly
		purse += betChipValue;
		betTotal -= betChipValue;
		$('.purse h4 span').replaceWith('<span>' + purse + '</span>');
		$('.bet h4 span').replaceWith('<span>' + betTotal + '</span>');
		//reduces bet chip qty display for current value
		betChipCount -= 1;
		$('.betChip' + chipValue).text('x' + betChipCount);
		//hides away chip values not currently bet
		if(betChipCount === 0){
			$(this).hide();
		}
	}
});	
                       
var playerTotal = 0;
var player  = 0;
var dealerTotal = 0;
var dealer = 0;

//Tests for a Natural
//cards = [{name:'A',suit:'Diamond',value:11},{name:'10',suit:'Diamond',value:10},{name:'2',suit:'Clubs',value:2},{name:'2',suit:'Diamond',value:2}];

//Tests for a BlackJack
//cards = [{name:'10',suit:'Diamond',value:10},{name:'10',suit:'Diamond',value:10},{name:'2',suit:'Clubs',value:2},{name:'2',suit:'Diamond',value:2},{name:'A',suit:'Diamond',value:11}];

//Tests for a Dealer Bust win
//cards = [{name:'2',suit:'Diamond',value:2},{name:'2',suit:'Diamond',value:2},{name:'10',suit:'Clubs',value:10},{name:'10',suit:'Diamond',value:10},{name:'10',suit:'Diamond',value:10}];

//Tests for a win
//cards = [{name:'10',suit:'Diamond',value:10},{name:'10',suit:'Diamond',value:10},{name:'2',suit:'Clubs',value:2},{name:'2',suit:'Diamond',value:2}];

//Tests for a lose
//cards = [{name:'2',suit:'Diamond',value:2},{name:'2',suit:'Diamond',value:2},{name:'10',suit:'Clubs',value:10},{name:'10',suit:'Diamond',value:10}];

//Tests for a push
//cards = [{name:'10',suit:'Diamond',value:10},{name:'10',suit:'Diamond',value:10},{name:'10',suit:'Clubs',value:10},{name:'10',suit:'Diamond',value:10}];

//Tests for player w double aces on deal..then two Aces and a 10 on 3 hits
//cards = [{name:'A',suit:'Diamond',value:11},{name:'A',suit:'Diamond',value:11},{name:'2',suit:'Clubs',value:2},{name:'2',suit:'Diamond',value:2},{name:'A',suit:'Diamond',value:11}, {name:'A',suit:'Diamond',value:11}, {name:'10',suit:'Diamond',value:10}];

//Tests for dealer w double aces on deal..then two Aces and a 10 and a 10 to bust on 4 hits
//cards = [{name:'2',suit:'Diamond',value:2},{name:'2',suit:'Diamond',value:2},{name:'A',suit:'Clubs',value:11},{name:'A',suit:'Diamond',value:11},{name:'A',suit:'Diamond',value:11}, {name:'A',suit:'Diamond',value:11}, {name:'10',suit:'Diamond',value:10}, {name:'10',suit:'Diamond',value:10}];

// Deal button pressed	
$('#deal').click(function(){
	// Hide deal button and disable all purse and bet chips
	$(this).hide();
	$('.purse a').removeClass('enabled');
	$('.bet a').removeClass('enabled');
	// Appends player cards into their row
	$('.playerCards').append('<div class="cardRow"></div>');
	$('.playerCards .cardRow').append('<div class="col-xs-3"><p class="card">'+ cards[0].name + ' ' + '<br><span>' + cards[0].suit +'</span></p></div>');
	$('.playerCards .cardRow').append('<div class="col-xs-3"><p class="card">'+ cards[1].name + ' ' + '<br><span>' + cards[1].suit +'</span></p></div>');
	
	// Appends dealer cards into their row
	$('.dealerCards').append('<div div class="cardRow"></div>');
	$('.dealerCards .cardRow').append('<div class="col-xs-3"><p class="card">'+ cards[2].name + ' ' + '<br><span>' + cards[2].suit +'</span></p></div>');
	$('.dealerCards .cardRow').append('<div class="col-xs-3"><p class="card hole">'+ cards[3].name + ' ' + '<br><span>' + cards[3].suit +'</span></p></div>');
	
	// Tallies player and dealer totals to temp value
	playerTotal = cards[0].value + cards[1].value;
	dealerTotal = cards[2].value + cards[3].value;
	
	player = playerTotal;
	dealer = dealerTotal;
	// Checks for player = 21
	if (player === 21) {
		$('.hole').removeClass('hole');
		
		// If dealer has 21 also...push 
		if (dealer === 21){
			push();
		}
		// Else player has natural 21
		else {
			natural();
		}
	// If no 21 dealt to player..show hit/ stand buttons	
	} else {
		$('#hit').show();
		$('#stand').show();
	}
	
	$('.playerTotal span').replaceWith('<span> ' + player + '</span>');	
});

//keeps track of which card is being drawn from the deck
var hitIndex = 4;

$('#hit').click(function(){	
	var playerAceCount = 0;
	// Adds card to page with name and suit 
	$('.playerCards').append('<div class="col-xs-3"><p class="card">' + cards[hitIndex].name + ' ' + '<br><span>' + cards[hitIndex].suit + '</span></p></div>');
	//adds the last hit card to player total and displays
	playerTotal += cards[hitIndex].value;
	hitIndex += 1;
	// Count how many aces player has...
	var stack = ".playerCards";
	playerAceCount = countAces(stack);
	// Adjust player score for aces
	player = aceCheck(playerTotal, playerAceCount);
	$('.playerTotal span').replaceWith('<span> ' + player + '</span>');
	
	if (player > 21) {
		//Hides buttons
		$(this).hide();
		$('#stand').hide();
		//Display results 
		$('.game-space').append('<h2 class="result">Bust!</h2>');
		$('.dealerTotal span').replaceWith('<span> ' + dealer + '</span>');
		$('.hole').removeClass('hole');
		lose();
	}
	
	else if (player === 21) {
		//Hides buttons
		$(this).hide();
		$('#stand').hide();
		//Display results 
		$('.game-space').append('<h2 class="result">BlackJack!</h2>');
		window.setTimeout(stand, 3000);
	}
});

$('#playAgain').click(function(event) {
	location.reload();
});

// Counts how many aces in the player or dealer card stack
function countAces(stack){
	var aceCount = 0;
	$(stack + ' .card').each(function() {
		var aces = $(this).text();
		if (aces[0] === 'A'){
			aceCount += 1;
		}
	});	
	return aceCount;
}

// Runs playerTotal and dealerTotal calculations for aces
function aceCheck(tempTotal, aceCount){	
	// If there is one ace and the total is > 21, reduce by 10
	if(tempTotal > 21 && aceCount == 1){
		tempTotal = tempTotal - 10;
	}
	// If there is more than one ace and the total is > 21, reduce by 10 for all but 1 ace
	else if(tempTotal > 21 && aceCount > 1){
		tempTotal = tempTotal - (10 * (aceCount - 1));
	}
	// If the total is still > 21 then reduce by 10 for last ace
	if(tempTotal > 21 && aceCount > 1){
		tempTotal = tempTotal - 10;
	}
	return tempTotal;
}

// When stand
function stand(){
	$('#stand').hide();
	$('#hit').hide();
	$('.game-space h2').remove();
	//"Flips" dealers hidden card
	$('.hole').removeClass('hole');
	// Count how many aces dealer has...
	stack = ".dealerCards";
	var dealerAceCount = countAces(stack);
	// Adjust dealer score for aces
	dealer = aceCheck(dealerTotal, dealerAceCount);
	        
	while (dealer <= 16){
		$('.dealerCards').append('<div class="col-xs-3"><p class="card">' + cards[hitIndex].name + ' ' + '<br><span>' + cards[hitIndex].suit +'</span></p></div>');
		dealerTotal += cards[hitIndex].value;		
		dealerAceCount = countAces(stack);
		// Adjust player score for aces
		dealer = aceCheck(dealerTotal, dealerAceCount);		
		$('.dealerTotal span').replaceWith('<span> ' + dealer + '</span>');
		hitIndex += 1;
				
		if (dealer > 21){  
			$('.controls').append('<h2 class="result">Dealer is bust!</h2>');
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

// Calls when player loses
function lose(){
	$('.dealerTotal span').replaceWith('<span> ' + dealer + '</span>');
	if (purse <= 0) {
		$('.controls').append('<h2 class="results">Sorry, you lose.</h2>');
		$('#gameOverModal').modal('show')
	}
	else {
		$('.controls').append('<h2 class="results">Sorry,  you lose.</h2>');
		window.setTimeout(nextHand, 8000);
	}
}

// Calls when player and dealer tie
function push(){
	$('.dealerTotal span').replaceWith('<span> ' + dealer + '</span>');
	$('.controls').append('<h2 class="results">Push.</h2>');
	purse += betTotal;
	$('.purse h4 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 8000);
}
 
 // Calls when player is dealt 21 straight away
function natural(){
	$('.controls').append('<h2 class="results">Natural 21 You Win!</h2>');
	$('.controls').append('<h2 class="results">Payout is ' + Math.floor(betTotal + betTotal * 1.5) + '</h2>');
	purse += Math.floor(betTotal + betTotal * 1.5);
	$('.purse h4 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 8000);
}

// Call when player wins
function win(){
	$('.dealerTotal span').replaceWith('<span> ' + dealer + '</span>');
	$('.controls').append('<h2 class="results">You win! Payout is ' + betTotal * 2 + '</h2>');
	purse += betTotal * 2;
	$('.purse h4 span').replaceWith('<span>' + purse + '</span>');
	window.setTimeout(nextHand, 8000);
}

function overPurseMsg(){
	$('.overPurseLimit').hide();
}

function overBetMsg(){
	$('.overBetLimit').hide();
}

// Calls after complete hand
function nextHand(){
	// Removes cards from table
	$('.playerCards div').remove();
	$('.dealerCards div').remove();
	// Removes current hand result display
	$('.game-space h2').remove();
	$('.controls h2').remove();
	// Resets display and other values back to initial state
	betTotal = 0;
	$('.bet h4 span').replaceWith('<span>' + betTotal + '</span>');
	$('.playerTotal span').replaceWith('<span></span>');
	$('.dealerTotal span').replaceWith('<span></span>');
	betChipCount = 0;
	betChipCount1 = 0;
	betChipCount5 = 0;
	betChipCount25 = 0;
	dealerAceCount = 0;
	aceCount = 0;
	hitIndex = 4;
	// Hide/show and enable/disable elements
	$('.purse a').addClass('enabled');
	$('.bet a').addClass('enabled');
	$('.betChip1').hide();
	$('.betChip5').hide();
	$('.betChip25').hide();
	$('#deal').prop('disabled', true);
	$('#deal').show();
	$('#hit').hide();
	$('#stand').hide();
	// Shuffle cards
	shuffle(cards);
}


















	











































