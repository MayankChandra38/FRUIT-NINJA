// for sword and sword image
var sword,swordimg;
//for gamestate
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//for adding image in fruits
var fruit1,fruit2,fruit3,fruit4;
//for score
var score;
//for fruitsgroup and enemygroup
var fruitGroup,enemyGroup;
//for adding image in monster
var monsterimg,monsterimg2;
//for monstergroup and enemygroup
var fruitsGroup,enemyGroup;
//for adding gameOver image
var gameOverImage;
//for adding gameover sound
var gameOverSound;
//for adding cutting sound
var swooshSound;

function preload(){
  //for loading sword image
  swordimg = loadImage("sword.png");
 
  //for loading fruits image
  fruit1 = loadAnimation("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  //for loading monster image
  monsterimg = loadImage("alien1.png");
  monsterimg2 = loadImage("alien2.png");
  
  //for loading gameover image
  gameOverImage = loadImage("gameover.png");
  
  //for loading gameover sound
  gameOverSound = loadSound("gameover.mp3");
  
  //for loading woosh sound
  wooshSound = loadSound("knifeSwooshSound.mp3");
}

function setup() {
  createCanvas(400,400);
  
  //for creating sword 
  sword=createSprite(50,200,20,20);
  sword.addImage(swordimg);
  sword.scale = 0.7;
  
  // for score
  score = 0;
  
  //for creating fruit and enemy group
  fruitsGroup = createGroup();
  enemyGroup = createGroup();
}

function draw(){
 background("blue");
 
  if(gameState === PLAY) {
  //for calling fruit function
  fruit();
  
  //for calling enemy function
  enemy();
    
  //for the sword when touching fruitsgroup
  if(fruitsGroup.isTouching(sword)) {
    fruitsGroup.destroyEach();
    score = score+2;
    wooshSound.play();
  }
    
  //for setting sword x and y according to mouse x,y
  sword.x = mouseX;
  sword.y = mouseY;
    
  if(enemyGroup.isTouching(sword)) {
    gameState = END;
    gameOverSound.play();
  }
   
  }
  
  if(gameState === END) {
 
    sword.addImage(gameOverImage);
    sword.x = 200;
    sword.y = 200;
  
    //for destroying monster
    enemyGroup.destroyEach();
   
    //for destroying fruits
    fruitsGroup.destroyEach();
    
    //for setting monster and fruits velocityX 0
    enemyGroup.setVelocityXEach(0);
    fruitsGroup.setVelocityXEach(0);
  }

  //for displaying score
  text("Score:"+ score,330,20);
 
  drawSprites();

}

function fruit() {
  //for creating fruits 
  if (World.frameCount%80===0) {
    fruits = createSprite(400,200,20,20);
    fruits.scale = 0.2;
  
    r=Math.round(random(1,4));
    
  //for setting fruits image randomly
  if (r == 1) {
    fruits.addAnimation("fruit",fruit1);
  }
  if (r == 2) {
    fruits.addImage(fruit2);
  }
  if (r == 3) {
    fruits.addImage(fruit3);
  }
  if (r == 4) {
    fruits.addImage(fruit4);
  }
  //for setting fruits y randomly 
  fruits.y = Math.round(random(50,340));
 
  //for setting fruits x randomly
  position=Math.round(random(1,2));
  if(position==1) {
    fruits.x=400;
    fruits.velocityX=-(7+(score/4));
  }
  if(position==2) {
    fruits.x=0;
    fruits.velocityX=(7+(score/4));
  }
  
 //for setting lifetime of fruits
  fruits.setLifetime = 100;
    
 //for adding fruit to fruitsgroups
  fruitsGroup.add(fruits);
  }
}

function enemy() {
  if (World.frameCount%200 === 0) {
  monster = createSprite(400,200,20,20);
  monster.y = Math.round(random(100,300));

  //for setting monster x randomly
  pstn=Math.round(random(1,2))
  if(pstn==1) {
    monster.x = 400;
    monster.velocityX = -(8+(score/10));
  }
  if (pstn==2) {
    monster.x = 0;
    monster.velocityX = (8+(score/10));
  }
  
  //for generating random alien animation
  var rndm = Math.round(random(1,2));
  switch(rndm) {
      case 1:monster.addImage(monsterimg);
      break;
      case 2:monster.addImage(monsterimg2);
      break;
  }
  
  //for adding monster to enemygroups
  enemyGroup.add(monster);
  }
}


