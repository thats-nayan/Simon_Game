
let buttonColours = ["red","blue","green","yellow"];
let UserPatten = [];
let gamePattern = [];
let start;
let level;
// Function to Play Sound
function playSound(name)
{
    let music = new Audio("/sounds/"+name+".mp3");
    music.play();
}
// Animation when button is clicked
function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () { 
    let userChosenColour = this.id;
    animatePress(userChosenColour);
    playSound(userChosenColour);
    UserPatten.push(userChosenColour);
    // Logic if Correct Button Pressed 
    if(UserPatten[UserPatten.length - 1] == gamePattern[UserPatten.length - 1])
    {
        if(UserPatten.length == gamePattern.length)
        {
            UserPatten.length = 0;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        // Game Over Logic
        $("body").addClass("game-over");
        $("h1").text("Game Over Press any Key to Continue");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        gamePattern.length = 0;
        UserPatten.length = 0;
        let gameover = new Audio("/sounds/wrong.mp3");
        gameover.play();
        start = false;
        level = 1;
    }
}); 
// Logic for Next Move
function nextSequence() {
    $("h1").text("Level "+level);
    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut().fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    level++;
}
// Logic to Start Game
$(document).keypress(function (e) { 
    level = 1;
    start = false;
    if(start == false)
    {
        nextSequence();
        start = true;
    }
});

