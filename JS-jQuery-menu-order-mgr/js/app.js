// Title: JavaScript / jQuery Pizza Menu and Order Manager
// Author: Daniel Wallace
// Course: JavaScript : Tech Academy Portland
// Version Dates: 12/2016	07/2017 
// Purpose: Pizza Menu and Order Manager - Tracks user order input for multiple items and displays itemized receipt. Utilizes Bootstrap to demonstrate responsive HTML/CSS.


//order and item total to modal
//Add button msg...add more doubles up items
// style checkout button added
//modal cuts off..modal scroll

//Should be able to do load and resize all in one?
$(window).on('load', function desktopViewUpdate() {
    var viewportWidth = $(window).width();
    if (viewportWidth >= 768) {
		$('#accordion').hide();
		$('#grid').show();
		$('.options').removeClass('row');
    }
});

$(window).on('resize', function desktopViewUpdate() {
    var viewportWidth = $(window).width();
    if (viewportWidth >= 768) {
		$('#accordion').hide();
		$('#grid').show();
		$('.options').removeClass('row');
    }
});

$(window).on('load', function mobileViewUpdate() {
    var viewportWidth2 = $(window).width();
    if (viewportWidth2 < 768) {
		$('#grid').hide();		
		$('#accordion').show();
		$('.options').addClass('row');
    }
});

$(window).on('resize', function mobileViewUpdate() {
    var viewportWidth2 = $(window).width();
    if (viewportWidth2 < 768) {
		$('#grid').hide();		
		$('#accordion').show();
		$('.options').addClass('row');
    }
});

$('#checkout2').hide();	

// Pizza constructor
function pizza(size, cheese, crust, sauce, veg, meat) {
    this.size = size;
    this.cheese = cheese;
    this.crust = crust;
    this.sauce = sauce;
	this.veg = veg;
	this.meat = meat;
}

// Select options for size
var $size;
var basePrice = 0; 
$('.size input').click(function() {
	$size = $(this).attr('value');
	var personal = 6;
	var medium = 10;
	var large = 14;
	var xlarge = 16;
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
	// Enables Add Item Button after Size is selected
	$('#addItem').removeAttr('disabled');
	// Toggles Checkout 2 button to display Order Started Modal
	$('#checkout2').attr("data-target","#started");
});

// Select options for cheese
var $cheese = 'Regular';
var cheesePrice = 0;
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
	return $cheese;
});

// Select options for crust
var $crust = 'Plain';
var crustPrice = 0;
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
	return $crust;
});

// Select options for sauce
var $sauce = 'Marinara';
$('.sauce input').click(function() {
	$sauce = $(this).attr('value')
	return $sauce;
});

// Select options for meat toppings
var meatCount = 0;
var $meatItem;
var meatPrice = 0;
var meat = [];
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

// Select options for veggie toppings
var vegCount = 0;
var $vegItem;
var vegPrice = 0;
var veg = [];
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
	return veg;
});

// Creates new pizza object and appends to receipt...Places item total into order total and displays...resets for additional items ordered
var itemTotal = 0;
var orderTotal = 0;
var pizzaOrder;
$('#addItem').click(function() {
	$('#checkout2').attr("data-target","#receipt");
	pizzaOrder = new pizza($size, $cheese, $crust, $sauce, veg, meat);
	$('#receipt .modal-body').append('<div class="row"><div class="col-xs-9"><p><span>Size</span>  ' + pizzaOrder.size + '</p></div><div class="col-xs-3"><p>$' + basePrice + '.00</p></div></div>');	
	$('#receipt .modal-body').append('<div class="row"><div class="col-xs-9"><p><span>Cheese</span>  ' + pizzaOrder.cheese + '</p></div><div class="col-xs-3"><p>$' + cheesePrice + '.00</p></div></div>');	
	$('#receipt .modal-body').append('<div class="row"><div class="col-xs-9"><p><span>Crust</span>  ' + pizzaOrder.crust + '</p></div><div class="col-xs-3"><p>$' + crustPrice + '.00</p></div></div>');	
	$('#receipt .modal-body').append('<div class="row"><div class="col-xs-9"><p><span>Sauce</span>  ' + pizzaOrder.sauce + '</p></div><div class="col-xs-3"></div></div>');	
	$('#receipt .modal-body').append('<div class="row"><div class="col-xs-9"><p><span>Meats</span>  ' + pizzaOrder.meat + '</p></div><div class="col-xs-3"><p>$' + meatPrice + '.00</p></div></div>');	
	$('#receipt .modal-body').append('<div class="row veg-row"><div class="col-xs-9"><p><span>Veggies</span>  ' + pizzaOrder.veg + '</p></div><div class="col-xs-3"><p>$' + vegPrice + '.00</p></div></div>');	
	$('#receipt .modal-body').append('<div class="row subtotal"><div class="col-xs-9"></div><div class="col-xs-3"><p>$' + itemTotal + '.00</p></div></div>');	
	orderTotal = orderTotal += itemTotal;
	$('.order-total').text(orderTotal);	
	resetOrder();
});

// Add more button press disables add item button and shows checkout2
$('#addMore').click(function() {
	//adjust the
	if($(window).width() >= 768){
		$('.info .addButton').css('padding-top', '0px');
		$('#checkout2').css('margin-top', '0px');
	}
	$('#addItem').attr('disabled', 'disabled');
	$('#checkout2').show();
});

// Resets form completely when Finish is pressed
$('.finish').click(function() {
	orderTotal = 0;
	$('.order-total').text(orderTotal);
	$('#checkout2').hide();
	$('#addItem').attr('disabled', 'disabled');
});

// Resets basePrice when selecting different sizes
function baseCheck(){
	if (basePrice > 0) {
		basePrice = 0;
	}
}

// Updates display of current item total cost
function updateItemTotal(){
	itemTotal = basePrice + cheesePrice + crustPrice + vegPrice + meatPrice;
	$('.item-total').text(itemTotal);
}

// Resets input checks and option prices when item added.
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

// Adds total to receipt
function checkOut(){
	$('.receiptModal .total').remove();
	$('.receiptModal .modal-body').append('<p class="total">Total :<span>  $ ' + orderTotal + '.00</span></p>');
}










	
	
	
	
	




	





	
	
	
	
	
		











	
	