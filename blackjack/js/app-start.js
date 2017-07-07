			
		
placeBetMessage
Deal Button
Stand Button
Hit Button


		
			
		while (betTotal < 1){
				placeBetMessage is shown

		
		
			
			
			
			
			Update betTotal and purse display amount
		

		if betTotal >= 1 && <= 25
		
		highlight/enable deal button
			
		else disable the button/ on click alert.. Min bet is 1 Max is 25 click a chip in your purse to add to your bet.	


		
		
		
			
		Hide Place Your Bet Message...Disable/DeHighlight Deal Button	
			
		
		
		
		1 Card is dealt face up and 1 face down to the dealer
		
		
		
		
		
	
		
			
		
		
		
		
		If Hit...card dealt to player...
		
			(Aces 1/11 Calculation)
		
			Sum Player cards
			
			
				
				if (player > 21) {
						message Bust! You Lose
					lose();
				} 
					
				else {
						Display Hit or Stand
				}
				
				
		

		
				
		If Stand...
		
			Dealers card is shown
			
		
			if (dealer === 21) {
					lose();
			}
			
			while(dealer <= 16){
				Draw/Display / and += / and return
				if (dealer > 21){
					message Dealer is Bust / You Win
					win();
				}
			}
				
				
				
				
		
		
		Sum Dealer Cards	
		
		Sum Player Cards
		
		
		
		
		
		
		
		
		
			

			

function reSet(){
	betTotal = 0;
	betChips removed
	cards removed
	deck shuffled
	place bet message displayed
}

function lose(){
	if (purse <= 0) {
		message Your Purse is empty. Sorry you're out of the game.
		Play Again? button to reload game
	}
	else {
		reset();
	}
}

function push(){
	message Push
	
	reset();
}

function natural(){
	message A natural 21 You Win!
	purse += betTotal + betTotal x 1.5?...round;
	reset();
}

function natural(){
	message You Win!
	purse += betTotal * 2;
	reset();
}





			
			
			
			
			

Dealer Object {
		
		
		
		Properties
			array of deck...in deck.js
				card image pathname
				card identity and value
			
		Methods
			Shuffle
			Deal
			Hit
}	









		
  

		
		
		
		
		
		
		
		
		
		
		
				
		







		
		
		
		
		
		