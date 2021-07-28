//make variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bgImage,bg;
var player, player_running;
var restart,restart_img;
var gameOver,gameImg;

var ground;
       
var FoodGroup, bananaImg;
var obstaclesGroup, obstacleImg;

var gameOver;
var score=0;
var count=0;
var hit= 0;


function preload(){
  //load images or animation
  bgImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
    bananaImg = loadImage("banana.png");
  obstacleImg = loadImage("stone.png");
      
  restart_img=loadImage("restart.png");
  gameImg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(600,400);
  
  //createsprite for background var
  bg=createSprite(0,0,600,400);
  bg.addImage(bgImage);
  bg.scale=1.5;
  bg.x=bg.width/2;
  bg.velocityX=-4;
  
  //sprite for restart button
  restart= createSprite(350,200,30,30);
  restart.addImage(restart_img);
  restart.scale=0.08;
  restart.visible=false;
  
  //sprite for gameover button
  gameOver= createSprite(260,200,30,30);
   gameOver.addImage(gameImg);
  gameOver.scale=0.2;
  gameOver.visible=false;
  
  //create player sprite
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  //create ground sprite
  ground = createSprite(250,350,600,10);
  ground.x=ground.width/2;
  ground.visible=false;
  
  //make groups for food and obstacle
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  //score obviously
  score = 0;
}

function draw() {
  
  background(255);
  
  //reseting background image
   if(bg.x<100){
    bg.x=bg.width/2;
  }
  
  //collide player with the ground
  player.collide(ground);
  
 //code in play state...
  if (gameState===PLAY) {
    //looking for survival points
  count= count + Math.round(World.frameRate/60);
  
    //when food touches the player..
    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
       score = score + 2;
    }
    //switch condition to scale the player...
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
   //to make the player jump
    if(keyDown("space") && player.y>=170 ) {
      player.velocityY = -12;
    }
   //add gravity to the player
    player.velocityY = player.velocityY + 0.8;
  
  //recalling the functions
    spawnFood();
    spawnObstacles();
    
 //when the stone hits the player...
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.08;
      hit=hit+1;
    }
    
  }
  
  //code for changing the state to end...
      if(hit>=25){
         gameState=END;
    }
  
//code for end state
  if (gameState===END) {
    
    //destroy the groups..
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    
  //stop moving the background image..
    bg.velocityX=0;
    
  //make both images invisible...
    restart.visible=true;
    gameOver.visible=true;
        
  //recalling reset function here...
    if (mousePressedOver(restart)) {
     reset();
     } 

  }
  
  drawSprites();
  
  //code for different texts
  textFont("WOLTON");
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 400,50);
  textFont("SANS");
  
  textSize(20);
  fill("black");
  text("survival Time:" + count,50,45);
  
    textSize(20);
  fill("black");
  text("hit time:" + hit,700,70);


}

function spawnFood() {
  //code to spawn food
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -5;

    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  //code to spawn the stone
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImg);
   
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  //function for reseting the game after presseing the reset button in the end state...
 gameState=PLAY;
  player.scale = 0.1;
  count=0;
  score=0;
  hit=0;
  bg.velocityX=-4;
  restart.visible=false;
  gameOver.visible=false;
}

//thats it:)