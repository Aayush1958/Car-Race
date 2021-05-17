var PLAY = 1;
var END = 0;
var gameState = PLAY;
var background_Img, background_Picture;
var car_Img, car_Picture;
var knife_Img, knife_Picture;
var MedicalBox_Img, MedicalBox_Picture;
var pins_Img, pins_Picture;
var tnt_Img, tnt_Picture;
var bomb_Img, bomb_Picture;
var invisibleGround;

function preload() {
  background_Picture = loadImage("Road Two.jpg");
  car_Picture = loadImage("Car.png");
  knife_Picture = loadImage("Knife.png");
  MedicalBox_Picture = loadImage("Medicine.png");
  pins_Picture = loadImage("Pins.png");
  tnt_Picture = loadImage("TNT.png");
  bomb_Picture = loadImage("Bomb.png");
}

function setup() {
  createCanvas(600, 400);
  background_Img = createSprite(200,200,20,20);
  background_Img.addImage(background_Picture);
  background_Img.x = background_Img.width / 2;
  background_Img.scale=2
 


  car_Img = createSprite(100, 350, 400, 20);
  car_Img.addImage(car_Picture);
  car_Img.scale = 0.5;
  
  car_Img.setCollider("rectangle",0,0,200,90);
  car_Img.debug = true

  obstaclesGroup = createGroup();

  score = 0;
}

function draw() {
  background(180);
  car_Img.velocityY=0;
  car_Img.velocityX=0;

  edges = createEdgeSprites();
  car_Img.collide(edges);
  if (gameState === PLAY) {
    background_Img.velocityX = -4;
    score = score + Math.round(frameCount / 60);
    if (background_Img.x < 0) {
      background_Img.x = background_Img.width / 2;
    }
    if (keyDown(UP_ARROW) ) {
      car_Img.velocityY = -4;
    }
    if(keyDown(DOWN_ARROW)){
      car_Img.velocityY=4
    }
    if(keyDown(RIGHT_ARROW)){
      car_Img.velocityX=4;
    }
    if(keyDown(LEFT_ARROW)){
      car_Img.velocityX=-4;
    }

     
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(car_Img)){
      gameState=END;
    }
    

    
    
  }else if (gameState===END){
    background_Img.velocityX=0;
    obstaclesGroup.setLifetimeEach(-2)
    obstaclesGroup.setVelocityXEach(0);
    car_Img.velocityX=0;
    car_Img.velocityY=0;
  }

  drawSprites();
  textSize(20);
  fill("yellow");
  text("Score="+score,300,20)
}
function spawnObstacles() {
  if (frameCount % 60 === 0) {
    var obstacle = createSprite(600,Math.round(random(50,400),10,40));
    obstacle.velocityX = -6;

    var rand = Math.round(random(1, 5));
    switch (rand) {
      case 1:obstacle.addImage(bomb_Picture);
            break;
        
      case 2:obstacle.addImage(knife_Picture);
             break;
        
      case 3: obstacle.addImage(MedicalBox_Picture);
              break;
       
      case 4: obstacle.addImage(pins_Picture);
              break;

      case 5:obstacle.addImage(tnt_Picture);
             break;
        

      default:break;
        
    }
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}
