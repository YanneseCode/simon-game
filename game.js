//Step 1: Alert the player with a Welcome pop message
alert("Welcome to Simon Game!");

//Step 2: 3. Generate an array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];
//Step 2: 5. Empty array to hold the game pattern
var gamePattern = [];
//Step 4: 3. At the top of the game.js file, create a new empty array with the name userClickedPattern.
var userClickedPattern = [];

//Step 7: 1.Keep track of whether the game has started
var started = false;
var level = 0;

//Step 7: 2. Detect when a keyboard key is pressed to start the game
$(document).keypress(function() {
    if (!started){
        //Step 7: 2. change the title to show the level
        $("#level-title").text("Level " + level); 
        //Step 7: 3. Start the game by calling nextSequence()
        nextSequence(); 
        //Step 7: 4. Set the flag to true so the game only starts once is started
        started = true; 
    }
});

//Step 4: 1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {
    //Step 4: 2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    //Step 4: 4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
    //Step 5: 2. Refactor the code in playSound() so that it will work for both playing sound in nextSequence() and when the user clicks a button.
    playSound(userChosenColour);
    //Step 6: 4. Animate the button press
    animatePress(userChosenColour);  
    // Step 8: 2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
});

//Step 8: 1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
    //Step 8: 2. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
//Step 8: 3. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if(userClickedPattern.length === gamePattern.length){
            //Step 8: 5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        } 

        } else {
            console.log("wrong");
            //Step 9: 1. Play wrong sound
            playSound("wrong"); 
            //Step 9: 1. Add game-over class for visual feedback
            $("body").addClass("game-over"); 
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 200);
        
        //Step 9: 3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");
        //Step 10: 3. Call startOver() if the user gets the sequence wrong.
        startOver();
        }
}

//Step 2: 1. Create a function named nextSequence()
function nextSequence(){
    
    //Step 8: 4. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    //Step 2: 2. Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random() * 4);
    //Step 2: 4. Select a random color using the random number
    var randomChosenColour = buttonColours[randomNumber];
    //Step 2: 6.  Add the randomly chosen color to the game pattern
    gamePattern.push(randomChosenColour);
    //Step 3: 1. Use jQuery to select the button with the id of the randomChosenColour
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
//Step 5: 1. Create a function playSound() by taking one input parameter as "name"
function playSound(name){
    //Step 2: 3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + name + ".mp3");
    //Step 2: 4. Play sound corresponding to the randomChosenColour
    audio.play();
}

//Step 6: 1. Create a new function called animatePress(), it should take a single input parameter called currentColour.
function animatePress(currentColour){
    //Step 6: 2. Add "pressed" class to the clicked button
    $("#" + currentColour).addClass("pressed"); 
    //Step 6: 3. Remove the "pressed" class after 100 milliseconds
    setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
    },100);
}

//Step 10: 1. Create a Startover function
function startOver(){
    //Step 10: 2. Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}