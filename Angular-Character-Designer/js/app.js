
var characterApp = angular.module('characterApp', []);

	//Sliders flash warning color when stats > min exp.
	//ng-repeat   index.html repeating elements such as sliders
	//Color Palettes and Character Types as Objects
	//Limit first name/ last name character qty  try ... filter | limitto:  for display purposes...then chop it off at apply time
	// No repeat full name entries
	// After create character clicked..reset

characterApp.controller('characterCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	
	// New Character object
    $scope.character = {
		firstName: '',
		lastName: '',
		//fullName: $scope.character.firstName + " " + $scope.character.lastName, 
		type: '',
		race: '',
		gender: '',
		wealth: 0,
		exp: 0,
		health: 0,
		attack: 0,
		defense: 0,
		speed: 0,
		magic: 0,
		inventory: [],
		assigned: false	
	};
	
	$scope.characterType = {
		Warrior : {defaultItem : ['Sword', 10], palette : ['#140001','#6B0409','#A30B13','#E52D37']},
		Wizard : {defaultItem : ['Wand', 10], palette : ['#001514','#046B65','#0BA39B','#2DE5DC']},
		Thief : {defaultItem : ['Cloak', 10], palette : ['#090014','#32046B','#4F0BA3','#802DE5']},
		Monk : {defaultItem : ['Staff', 10], palette : ['#140900','#6B3204','#A34F0B','#E5802D']},
		Archer : {defaultItem : ['Bow', 10], palette : ['#0B1400','#3C6B04','#5EA30B','#92E52D']},
		Cleric : {defaultItem : ['Amulet', 10], palette : ['#0E0004','#300713','#6B0E29','#BA1242']}
	}
	
	$scope.typeDefault = function() {
		// Do without the loop?
		for(charType in $scope.characterType ){
			if(charType == $scope.character.type){
				charDefaultItem = ($scope.characterType[charType].defaultItem[0]);
				break;
			}
		}
		$scope.character.inventory.shift();
		$scope.character.inventory.unshift($scope.characterType[charType].defaultItem);
	}
	
	$scope.palette = [];
	
	
	
	
	
	
	
	// Roll for character starting Wealth.
	$scope.wealthRoll = {
		value1: 0,
		value2: 0,
		wealthRollMsg: false,
		minGoldMsg: false,
		shopMsg: false,
		checksEnabled: true,
		purchaseEnabled: true
	};
	
	$scope.tempWealth = 0;
	
	// Response to Roll Wealth button
	$scope.rollWealth = function() {
		$scope.wealthRoll.wealthRollMsg = true;
		$scope.wealthRoll.checksEnabled = false;
	
		defaultItemDisable(charDefaultItem);
		$scope.wealthRoll.purchaseEnabled = false;
		rollValues = diceRoll();
		$scope.wealthRoll.value1 = rollValues[0];
		$scope.wealthRoll.value2 = rollValues[1];
		
		$scope.tempWealth = rollValues[2];
		if($scope.tempWealth < 40){
			$scope.wealthRoll.minGoldMsg = true;
			$scope.tempWealth = 40;
		}
	}
	
	
	
	
		
	// Add items from cart array to inventory array / Empties cart array and value
	$scope.addInventory = function() {
		for (i = 0; i < $scope.cart.length; i++){
			$scope.character.inventory.push($scope.cart[i]);
		}
		$scope.character.wealth = $scope.tempWealth - $scope.cartTotal;
		$scope.tempWealth = $scope.tempWealth - $scope.cartTotal;
		$scope.cartTotal = 0;
		$scope.cart = [];
		
		
		$scope.wealthRoll.checksEnabled = true;
	}
	
	
	
	
	
	$scope.shop = [['Wand', 10],['Sword', 10],['Cloak',10],['Staff',10],['Bow',10],['Elixir',10],['Dagger',8],['Ax',12],['Shield',12],['Helmet',8],['Mail',12],['Armor',15],['Boots',12],['Book',15],['Amulet',15]];
	
	$scope.cart = [];
	$scope.cartTotal = 0;
	
	// Toggle selection for a given product by name 
	$scope.toggleSelection = function toggleSelection(product) {
		var idx = $scope.cart.indexOf(product);

		// Is currently selected
		if (idx > -1) {
		  $scope.cart.splice(idx, 1);
		  $scope.cartTotal -= 10;
		}
		// Is newly selected
		else {
		  $scope.cart.push(product);
		  $scope.cartTotal += 10;
		}
		
		// Checks whether Cart Total is greater than Wealth. Disables and Displays Msg.
		if($scope.cartTotal > $scope.tempWealth){
			$scope.wealthRoll.purchaseEnabled = true;
			$scope.wealthRoll.shopMsg = true;	
		}
		else {
			$scope.wealthRoll.purchaseEnabled = false;
			$scope.wealthRoll.shopMsg = false;
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Roll for character starting Experience. 
	$scope.expRoll = {
		value1: 0,
		value2: 0,
		expRollMsg: false,
		applyEnabled: true,
		slidersEnabled: true,
		minExpMsg: false,
		statMsg: false
	};
	
	$scope.tempStats = {
		health: 0,
		attack: 0,
		defense: 0,
		speed: 0,
		magic: 0,
		statsTotal:0,
		tempExp:0
	}
	
	// Response to Roll Experience button
	$scope.rollExp = function() {
		$scope.expRoll.expRollMsg = true;
		$scope.expRoll.applyEnabled = false,
		$scope.expRoll.slidersEnabled = false,
		rollValues = diceRoll();
		$scope.expRoll.value1 = rollValues[0];
		$scope.expRoll.value2 = rollValues[1];
		$scope.tempStats.tempExp = rollValues[2];
		if($scope.tempStats.tempExp < 40){
			$scope.expRoll.minExpMsg = true;
			$scope.tempStats.tempExp = 40;
		}
	}
	
	// Responds to Apply Stats Button
	$scope.applyStats = function() {		
		$scope.expRoll.slidersEnabled = true;
		$scope.character.exp = $scope.tempStats.tempExp - $scope.tempStats.statsTotal;
		$scope.character.health = $scope.tempStats.health
		$scope.character.attack = $scope.tempStats.attack
		$scope.character.defense = $scope.tempStats.defense
		$scope.character.speed = $scope.tempStats.speed
		$scope.character.magic = $scope.tempStats.magic
		$scope.tempStats.tempExp = $scope.tempStats.tempExp - $scope.tempStats.statsTotal;
	}
	
	// Response to Stats sliders
	$scope.statsCheck = function() {
		$scope.tempStats.statsTotal =	$scope.tempStats.health + $scope.tempStats.attack + $scope.tempStats.defense + $scope.tempStats.speed + $scope.tempStats.magic;
		if($scope.tempStats.statsTotal > $scope.tempStats.tempExp){
			$scope.expRoll.statMsg = true;
			$scope.expRoll.applyEnabled = true;
		}
		if($scope.tempStats.statsTotal <= $scope.tempStats.tempExp){
			$scope.expRoll.statMsg = false;
			$scope.expRoll.applyEnabled = false;
		}
	}
	
	$rootScope.newCharacter = $scope.character;

}]);


characterApp.controller('charactersListCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	
	$scope.charactersList = [
		
		{"firstName": "First1", "lastName": "Last1", "fullName": "First1 Last1", "type": "Warrior", "race": "Human", "gender": "Male", "wealth": 20, "exp": 10, "health": 20, "attack": 30, "defense": 20, "speed": 8, "magic": 7, "inventory": ['Sword', 'Armor', 'Ax'], "assigned": true},
	
		{"firstName": "First2", "lastName": "Last2", "fullName": "First2 Last2",  "type": "Wizard", "race": "Elf", "gender": "Female", "wealth": 10, "exp": 20, "health": 25, "attack": 10, "defense": 15, "speed": 12, "magic": 20, "inventory": ['Wand', 'Dagger', 'Book'], "assigned": true},
		
		{"firstName": "First3", "lastName": "Last3", "fullName": "First3 Last3",  "type": "Thief", "race": "Dwarf", "gender": "Male", "wealth": 30, "exp": 5, "health": 15, "attack": 5, "defense": 5, "speed": 5, "magic": 12, "inventory": ['Cloak', 'Dagger', 'Boots'], "assigned": false},
		
		{"firstName": "First4", "lastName": "Last4", "fullName": "First4 Last4",  "type": "Cleric", "race": "Human", "gender": "Female", "wealth": 5, "exp": 25, "health": 10, "attack": 20, "defense": 20, "speed": 15, "magic": 20, "inventory": ['Elixir', 'Cloak', 'Amulet'], "assigned": true},
		
		{"firstName": "First5", "lastName": "Last5", "fullName": "First5 Last5",  "type": "Monk", "race": "Elf", "gender": "Male", "wealth": 12, "exp": 20, "health": 30, "attack": 15, "defense": 5, "speed": 10, "magic": 15, "inventory": ['Staff', 'Ax', 'Cloak'], "assigned": false},
		
		{"firstName": "First6", "lastName": "Last6", "fullName": "First6 Last6",  "type": "Archer", "race": "Dwarf", "gender": "Female", "wealth": 15, "exp": 10, "health": 10, "attack": 12, "defense": 10, "speed": 7, "magic": 10, "inventory": ['Bow', 'Helmet', 'Mail'], "assigned": true}
	];
	
	
	// Sets default table column to sort by
	$scope.sortField = 'firstName';
	
	// Adds Character from creator to CharacterList
	$scope.addCharacter = function(){
		$scope.charactersList.push($rootScope.newCharacter);
    };
	
	// Removes Character from CharacterList when remove button pushed
	
	//Doesnt delete new characters
	$scope.removeCharacter = function($event, ){
		charToRemove = $event.target.name;
		for (character in $scope.charactersList) {
			if ($scope.charactersList[character].fullName == charToRemove){ 
				charIndex = $scope.charactersList.indexOf($scope.charactersList[character]);
				$scope.charactersList.splice(charIndex, 1)
				break;
			}
		}
    };
	
	
	        //work out teamsAvail language
	$scope.teamsAvailMsg = {
		"teamMsg": false
	}
	
	$scope.teamsAvailable = [];
	
	$scope.addToTeam = function(){
		$scope.teamsAvailMsg.teamMsg = true;
		$scope.teamsAvailable = $rootScope.availableTeams;
		//..where teams with less than 4 members exist..finalize button
    };
	
}]);


characterApp.controller('teamsCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
	
	$scope.teamsList = [
		
		//Don't currently include fullName
		{"teamName": "Sample Team 2", "teamComplete": true, "teamMembers": [{"firstName": "First8", "lastName": "Last6", "type": "Archer", "race": "Dwarf", "gender": "Female", "wealth": 15, "exp": 10, "health": 10, "attack": 12, "defense": 10, "speed": 7, "magic": 10, "inventory": ['Bow', 'Helmet', 'Mail'], "assigned": true}, {"firstName": "First4", "lastName": "Last4", "type": "Cleric", "race": "Human", "gender": "Female", "wealth": 5, "exp": 25, "health": 10, "attack": 20, "defense": 20, "speed": 15, "magic": 20, "inventory": ['Elixir', 'Cloak', 'Amulet'], "assigned": true}, {"firstName": "First2", "lastName": "Last2", "type": "Wizard", "race": "Elf", "gender": "Female", "wealth": 10, "exp": 20, "health": 25, "attack": 10, "defense": 15, "speed": 12, "magic": 20, "inventory": ['Wand', 'Dagger', 'Book'], "assigned": true}, {"firstName": "First1", "lastName": "Last1", "type": "Warrior", "race": "Human", "gender": "Male", "wealth": 20, "exp": 10, "health": 20, "attack": 30, "defense": 20, "speed": 8, "magic": 7, "inventory": ['Sword', 'Armor', 'Ax'], "assigned": true}]},
		
		{"teamName": "Sample Team 2", "teamComplete": true, "teamMembers": [{"firstName": "First8", "lastName": "Last6", "type": "Archer", "race": "Dwarf", "gender": "Female", "wealth": 15, "exp": 10, "health": 10, "attack": 12, "defense": 10, "speed": 7, "magic": 10, "inventory": ['Bow', 'Helmet', 'Mail'], "assigned": true}, {"firstName": "First4", "lastName": "Last4", "type": "Cleric", "race": "Human", "gender": "Female", "wealth": 5, "exp": 25, "health": 10, "attack": 20, "defense": 20, "speed": 15, "magic": 20, "inventory": ['Elixir', 'Cloak', 'Amulet'], "assigned": true}, {"firstName": "First2", "lastName": "Last2", "type": "Wizard", "race": "Elf", "gender": "Female", "wealth": 10, "exp": 20, "health": 25, "attack": 10, "defense": 15, "speed": 12, "magic": 20, "inventory": ['Wand', 'Dagger', 'Book'], "assigned": true}, {"firstName": "First1", "lastName": "Last1", "type": "Warrior", "race": "Human", "gender": "Male", "wealth": 20, "exp": 10, "health": 20, "attack": 30, "defense": 20, "speed": 8, "magic": 7, "inventory": ['Sword', 'Armor', 'Ax'], "assigned": true}]},
		
		{"teamName": "Sample Team 1", "teamComplete": false, "teamMembers": [{"firstName": "First6", "lastName": "Last6", "type": "Archer", "race": "Dwarf", "gender": "Female", "wealth": 15, "exp": 10, "health": 10, "attack": 12, "defense": 10, "speed": 7, "magic": 10, "inventory": ['Bow', 'Helmet', 'Mail'], "assigned": true}, {"firstName": "First4", "lastName": "Last4", "type": "Cleric", "race": "Human", "gender": "Female", "wealth": 5, "exp": 25, "health": 10, "attack": 20, "defense": 20, "speed": 15, "magic": 20, "inventory": ['Elixir', 'Cloak', 'Amulet'], "assigned": true}, {"firstName": "First2", "lastName": "Last2", "type": "Wizard", "race": "Elf", "gender": "Female", "wealth": 10, "exp": 20, "health": 25, "attack": 10, "defense": 15, "speed": 12, "magic": 20, "inventory": ['Wand', 'Dagger', 'Book'], "assigned": true}]}
	];	
	
	$rootScope.availableTeams = $scope.teamsList;  //Iterate for only those incomplete teams
	
}]);

	


// Rolls 6 and 20 sided dice and returns array with three values, each die result and their multiplied value 
function diceRoll() {
		rollValues = [];
		dieRoll6 = Math.floor(Math.random() * 6 ) + 1;
		rollValues.push(dieRoll6);
		dieRoll20 = Math.floor(Math.random() * 20 ) + 1;
		rollValues.push(dieRoll20);
		rollTotal = dieRoll6 * dieRoll20;
		rollValues.push(rollTotal);
		return rollValues;
}

//Move back to wealth roll?
function defaultItemDisable(charDefaultItem) {
	parent = document.getElementById('shopForm');
	toRemove = document.getElementById(charDefaultItem);
	parent.removeChild(toRemove);
}






