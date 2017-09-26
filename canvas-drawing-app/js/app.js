//brush transparency
//circle shaped brush
//extend copyt to circle shaped brush
//pen..path tool
//collapsable palette
//save off a doodle 


var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var ctx = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var activeTool = "brush";


var canvasSave = document.getElementById('canvas');
var dataURL = canvasSave.toDataURL("image/png");

//when clicking on control list items
$(".controls").on("click", "li", function(){
  //deselect sibling elements
  $(this).siblings().removeClass("selected");
  //select clicked element
  $(this).addClass("selected");
  //cache current color here
  color = $(this).css("background-color");
});
 
//When new color is pressed
$("#revealColorSelect").click(function() {
  //Show color select or hide color select
  changeColor();
  $("#colorSelect").toggle();
});

//update the new color span
function changeColor() {
  var r = $("#red").val();
  var g = $("#green").val();
  var b = $("#blue").val();
  $("#newColor").css("background-color", "rgb(" + r + "," + g + "," + b + ")");  
}
 
//When color sliders change
$("input[type=range]").on("input", changeColor);

//When "Add Color" is pressed
$("#addNewColor").click(function() {
//Append the color to the controls ul
  var $newColor = $("<li></li>");
  $newColor.css("background-color", $("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  //Select the new color
  $newColor.click();
});

$("#canvasBackGrnd").click(function() {
	
	var $bgColor = $('.selected').css("background-color");
	
	$('canvas').css( "background", $bgColor )
	
});


//setTool() function 
//set brush to default
$("#brush").click(function() {
	activeTool = "brush";	
});

$("#eraser").click(function() {
	activeTool = "eraser";	
});

$("#path").click(function() {
	activeTool = "path";	
});

$("#text").click(function() {
	activeTool = "text";	
});




$("#save").click(function() {
	console.log(dataURL);
	//document.write('<img src="'+dataURL+'"/>')
});




function copy()
{
	var imgData = ctx.getImageData(0, 0, 600, 400);
	ctx.putImageData(imgData, 300, 200);
}




  
//On mouse events on the canvas
$canvas.mousedown(function(e){
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  // Draw lines
  if (mouseDown) {
	  
	  
    
	
	var $transp = $('#brushTrans').val()*.1;
	var $toolSize = $('#toolSize').val();
	
	
    
	
	if(activeTool == "brush"){	
		//change color above to rgba to add trap to brush
		ctx.beginPath();
		ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		ctx.lineTo(e.offsetX, e.offsetY);
		
		ctx.strokeStyle = color;
		ctx.lineWidth = $toolSize;
	}
	
	if(activeTool == "eraser"){
		ctx.beginPath();
		ctx.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		ctx.lineTo(e.offsetX, e.offsetY);
		
		ctx.globalCompositeOperation = "destination-out";
		ctx.strokeStyle = "rgba(0,0,0," + $transp +")";
		ctx.lineWidth = $toolSize;
	}
	
	if(activeTool == "path"){
		$("canvas").click(function() {
			var coord = getCursorPosition(canvas, event);
			ctx.strokeStyle = color;
			ctx.fillStyle="#000";
			console.log("x: " + coord[0] + " y: " + coord[1]);
			ctx.fillRect( coord[0], coord[1], 1, 1 );
		});
	}
	
	ctx.stroke();
    lastEvent = e;
	
   }
}).mouseup(function(){
	mouseDown = false; 
}).mouseleave(function(){
	$canvas.mouseup();
}).mouseenter(function(){
	$canvas.mousedown();
});

// retrieves the cursors position on the canvas 
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
	return [x, y]
}
  


