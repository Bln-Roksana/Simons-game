var transportModes=["car","bike","motor","train"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=1;

// document.addEventListener("keydown", nextSequence);
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});



$(".btn").click(function() {
    var userChosenTransport=this.classList[1];
    userClickedPattern.push(userChosenTransport);
    PlaySound(userChosenTransport);
    animatePress(userChosenTransport);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
    $("h1").text("Level "+ level);
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4); //number between 0 and 3.
    var randomChosenTransport=transportModes[randomNumber];

    gamePattern.push(randomChosenTransport);

    $("."+randomChosenTransport).fadeIn(200).fadeOut(200).fadeIn(200);

    PlaySound(randomChosenTransport)
    level++;

}

function PlaySound(name){
  var chosenSound=new Audio("sounds/"+name+".wav");
  chosenSound.play();
}

function animatePress(currentTransport){
  $("."+currentTransport).addClass("pressed");
  setTimeout(function(){
    $("."+currentTransport).removeClass("pressed");
  }, 100);;
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(gamePattern.length===userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 2000);
    }
  }else{
    var wrongSound=new Audio("sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
    $("h1").text("Game Over, Press any Key to Restart");
    startOver();
  }

}

function startOver(){
  level=1;
  gamePattern=[];
  started=false;
}
