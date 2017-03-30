var $size;
var basePrice = 0;
var personal = 6;
var medium = 10;
var large = 14;
var xlarge = 16;

var $cheese = 'Regular';
var cheesePrice = 0;
var $crust = 'Plain';
var crustPrice = 0;
var $sauce = 'Marinara';

var meatCount = 0;
var $meatItem;
var meatPrice = 0;
var meat = [];
var vegCount = 0;
var $vegItem;
var vegPrice = 0;
var veg = [];

var itemTotal = 0;
var orderTotal = 0;

var pizzaOrder;

// Resets basePrice when selecting different sizes
function baseCheck(){
	if (basePrice > 0) {
		basePrice = 0;
	}
}

// Updates current total to screen for item being ordered
function updateItemTotal(){
		itemTotal = basePrice + cheesePrice + crustPrice + vegPrice + meatPrice;
		$('.item-total').text(itemTotal);
}

// Pizza constructor
function pizza(size, cheese, crust, sauce, veg, meat) {
    this.size = size;
    this.cheese = cheese;
    this.crust = crust;
    this.sauce = sauce;
	this.veg = veg;
	this.meat = meat;
}

// Resets input checks and option prices
function resetOrder() {
	basePrice = 0;
	$cheese = 'Regular';
	cheesePrice = 0;
	$crust = 'Plain';
	crustPrice = 0;
	$sauce = 'Marinara';
	veg = [];
	vegPrice = 0;
	meat = [];
	meatPrice = 0;
	itemTotal = 0;
	
	$('#checkout').removeAttr('disabled');
	$('#checkout').removeClass('disabled');
	$('.item-total').text(itemTotal);
	$('input[type=radio]').prop('checked', function () {
		return this.getAttribute('checked') == 'checked';
	});
	$('input[type=checkbox]').prop('checked', function () {
		return this.getAttribute('checked') == 'checked';
	});
	$("input[value=Regular]").prop("checked", true);
	$("input[value=Plain]").prop("checked", true);
	$("input[value=Marinara]").prop("checked", true);
}

// Shows receipt modal window
function checkOut(){
	$('#checkout').hide();
	$('#place-order').hide();
	$('.order-more').hide();
	$('.modal-content').prepend('<h3>Order Details</h3>');
	$('.modal-content').prepend('<h2>Thanks For Your Order !</h2>');
	$('.modal-content').append('<p class="total">Total :<span>  $ ' + orderTotal + '.00</span></p>');
	$('.modal').show();
}

// Hide unseen elements in order menu
$('.choose-size').hide();
$('.order-more').hide();
$('.order-started').hide();
$('#checkout').hide();
$('.modal').hide();

// Size options selection 
$('.size input').click(function() {
	$size = $(this).attr('value')
	$('.choose-size').hide();
	if ($size == 'Personal'){
		baseCheck();
		basePrice += personal;
		updateItemTotal();
	}
	else if ($size == 'Medium'){
		baseCheck();
		basePrice += medium;
		updateItemTotal();
	}
	else if ($size == 'Large'){
		baseCheck();
		basePrice += large;
		updateItemTotal();
	} else {
		baseCheck();
		basePrice += xlarge;
		updateItemTotal();
	}
});

// Cheese options selection
$('.cheese input').click(function() {
	$cheese = $(this).attr('value')
	if (cheesePrice > 0) {
		cheesePrice = 0;
		updateItemTotal();
	}
	if ($cheese == 'Extra-Cheese'){
		cheesePrice += 3;
		updateItemTotal();
	}
});

// Crust options selection
$('.crust input').click(function() {
	$crust = $(this).attr('value')
	if (crustPrice > 0) {
		crustPrice = 0;
		updateItemTotal();
	}
	if ($crust == 'Stuffed'){
		crustPrice += 3;
		updateItemTotal();
	}
});

// Sauce options selection
$('.sauce input').click(function() {
	$sauce = $(this).attr('value')
});

// Veggies options selection
$('.veggies input').click(function() {
	$vegItem = $(this).attr('value');
	if ($(this).prop('checked')){
		veg.push(' ' + $vegItem);
		vegCount +=1;
		updateItemTotal();
	} else {
		veg.splice($.inArray($vegItem, veg),1);
		vegCount -=1;
		updateItemTotal();
	}
	if (vegCount > 1){
		vegPrice = vegCount - 1;
		updateItemTotal();
	}
	if (vegCount == 1){
		vegPrice = 0;
		updateItemTotal();
	}
});

// Meats options selection
$('.meats input').click(function() {
	$meatItem = $(this).attr('value');
	if ($(this).prop('checked')){
		meat.push(' ' + $meatItem);
		meatCount +=1;
		updateItemTotal();
	} else {
		meat.splice($.inArray($meatItem, meat),1);
		meatCount -=1;
		updateItemTotal();
	}
	if (meatCount > 1){
		meatPrice = meatCount - 1;
		updateItemTotal();
	}
	if (meatCount == 1){
		meatPrice = 0;
		updateItemTotal();
	}
});

// Creates pizza object and appends to receipt modal window...Places item total into order total...resets for additional orders
$('#place-order').click(function() {
	if (basePrice == 0){
		$('.choose-size').show();
	} else {
		$('.order-more').show();
		$('.order-started').hide();
		$('#checkout').show();
		pizzaOrder = new pizza($size, $cheese, $crust, $sauce, veg, meat);
		$('.modal-content').append('<p>Pizza Size : ' + pizzaOrder.size + '<span>  $ ' + basePrice + '.00</span></p>');
		$('.modal-content').append('<p>Cheese : ' + pizzaOrder.cheese + '<span>  $ ' + cheesePrice + '.00</span></p>');
		$('.modal-content').append('<p>Crust Style : ' + pizzaOrder.crust + '<span>  $ ' + crustPrice + '.00</span></p>');
		$('.modal-content').append('<p>Sauce : ' + pizzaOrder.sauce + '<span> ');
		$('.modal-content').append('<p>Veggies : ' + pizzaOrder.veg + '<span>  $ ' + vegPrice + '.00</span></p>');
		$('.modal-content').append('<p class="meat-row">Meats : ' + pizzaOrder.meat + '<span>  $ ' + meatPrice + '.00</span></p>');
		$('.modal-content').append('<p class="subtotal">' + ' ' + '<span>  $ ' + itemTotal + '.00</span></p>');
		
		orderTotal = orderTotal += itemTotal;
		$('.order-total').text(orderTotal);
		
		resetOrder();
	}
});

// Shows receipt for total order
$('#checkout').click(function() {
	if (itemTotal > 0 && $(this).hasClass('disabled')){ 
		$('.order-started').hide();
		resetOrder();
		checkOut();
	} else if (itemTotal > 0){
		$(this).attr('disabled')
		$(this).addClass('disabled');
		$('.order-more').hide();
		$('.order-started').show();
		$(this).removeAttr('disabled');
	} else {
		checkOut();
	}
});

// Order started message continue option
$('.continue').click(function() {
		$('#checkout').removeAttr('disabled');
		$('#checkout').removeClass('disabled');
		$('.order-started').hide();
		$('.order-more').show();
});

// Order started message checkout option
$('.checkout').click(function() {
	resetOrder();
	checkOut();
	$('.order-started').hide();
});

// Closes receipt modal window and resets all order totals
$('#close').click(function() {
	$('.modal-content').empty();
	$('.modal').hide();
	resetOrder();
	orderTotal = 0;
	$('.order-total').text(orderTotal);
	$('#place-order').show();
});










	
	
	
	
	



