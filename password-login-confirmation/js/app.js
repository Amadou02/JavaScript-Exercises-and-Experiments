// Problem: Hints are shown even when password is valid
// solution: hide and show them at appropriate times
var $password = $("#password");
var $confirmPassword = $("#confirm_password");

//Hide hints
$("form span").hide();

function isPasswordValid(){
  return $password.val().length > 8;
}

function arePasswordsMatching(){
  return $password.val() === $confirmPassword.val();
}

function canSubmit(){
  return isPasswordValid() && arePasswordsMatching();
}

function passwordEvent() {
  //Find out if password is valid
  if (isPasswordValid()) {
     $password.next().hide();
    //Hide hint if valid
  } else {
    //else show hint
    $password.next().show();
  } 
}

function confirmPasswordEvent () {
  //Find out if password and confirmation match
  if(arePasswordsMatching()) {
    //Hide hint if match
     $confirmPassword.next().hide();
  } else {
    // else show hint
     $confirmPassword.next().show();
  }
}

function enableSubmitEvent() {
  $("#submit").prop("disabled", !canSubmit());
}

//When event happens on paswword input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);
   
//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);

enableSubmitEvent();
  
