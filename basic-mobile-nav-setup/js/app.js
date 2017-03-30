//Problem    Nav Looks wrong in smaller browser/device widths
//Solution   Hide text and links and swap with more appropriate Nav

//Create a select and append to #menu
var $select = $("<select></select>");
$("#menu").append($select);

//Cycle over menu links 
$("#menu a").each(function(){
  var $anchor = $(this);   

  //Create and option 
  var $option = $("<option></option>");

  //Options value is the href
  $option.val($anchor.attr("href"));

  //Options text is the text of the link
  $option.text($anchor.text());

  //Append option to select   
  $select.append($option);
});
 
//Bind change listener to the select
$select.change(function(){
  //Go to selects location
  window.location = $select.val();
});








//Create button 
//var $button = $("<button>Go</button>");
//$("#menu").append($button);

//Bind click to button
//$button.click(function(){
  //Go to selects location
  //window.location = $select.val();
//});
  

//Deal with selected options depending on current page