// array that holds colors of Simon game
var buttonColours = ["red", "blue", "green", "yellow"];

// Empty array for the pattern the game creates
var gamePattern = [];

// Empty array for the pattern the user clicks
var userClickedPattern = [];

// Variable that returns true when a key is pressed more than once on keyboard
var toggle = false;

var level = 0;

// Press key one time to start the game
$(document).on("keydown", function(e){
  if (toggle === false && e.key === "Enter")
  {
      $("#level-title").text("Level " + level); //change title to level 0
      nextSequence();
      toggle = true;
  }
});

function nextSequence() {
  userClickedPattern = []; //empty the user clicked array each time this func is called
  level++;
  // Change the h1 to level __ according leveling up
  $("#level-title").text("Level " + level); //change title to level 0


  //generates a random number between 0 & 3
  var randomNumber = Math.floor(Math.random() * 4);

  // variable that selects a random colour
  var randomChosenColour = buttonColours[randomNumber];

  //colour gets pushed into gamePattern array
  gamePattern.push(randomChosenColour);

  // When key is pressed a random button flashes
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  // call the play sound function tht produces according sound
  playSound(randomChosenColour);

}

// Gets button that user clicked
$(".btn").on("click", function() {

  if(toggle === true)
  {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    // call the play sound function tht produces according sound
    playSound(userChosenColour);

    animatePress(userChosenColour);

    // index of the last answer
    var index = userClickedPattern.length - 1;
    // Call function once user clicks on button
    checkAnswer(index);
  }
  else{
    return;
  }

});

function playSound(name) {
  //Play specific audio for each button
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  // button changes colors to show that it is pressed
  setTimeout(removeAnimation, 100);

  // function that removes transparancy and shadow effect from button
  function removeAnimation(){
    $("#" + currentColour).removeClass("pressed");
  }
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(nextSequence, 1000);
    }
  }
  else
  {
    playSound("wrong"); //play sound when user selects a wrong button

    // make the background color red when wrong
    $("body").addClass("game-over");

    setTimeout(removeAnimation, 200);

    // function that removes animation when wrong button is pressed
    function removeAnimation(){
      $("body").removeClass("game-over");
    }

    $("#level-title").text("Game over. Press Enter to Restart"); //change title to game over

    startOver(); //call function to restart game
  }
}

function startOver(){
  //empty out variables
  level = 0;
  gamePattern = [];
  toggle = false;
}
