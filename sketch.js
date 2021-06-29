var wall;
var bunker;
var mg;
var bunkerimg
var wallHealth=10
var gamestate=0
var score=0
var play
var bulletg
var tankg
var infantryg
var artilleryg
var edges1
var edges2
var edges3
var edges4
var restart
var ammo = 10
var score = 0
var help
var main
var defend
var level = 1
var infantry2g;

function preload(){
bunkerimg = loadImage('bunker.jpg')
tigerimg   = loadImage('tiger.png')
artilleryimg = loadImage('artillery-removebg-preview.png')
bulletimg    = loadImage('bullet.png')
}


function setup() {
  createCanvas(400,400);

  edges1 = createSprite(0,0,800,1)
  edges2 = createSprite(799,0,1,800)
  edges3 = createSprite(0,800,800,1)
  edges4 = createSprite(0,0,1,800)
  
 wall= createSprite(0,360,800,20);
 wall.shapeColor='red'

 mg= createSprite(65,330,2,20)
 mg.shapeColor='black'

 bunker= createSprite(40,350,50,30)
 bunker.addImage(tigerimg)
bunker.scale=0.1

database = firebase.database();

 
if(gamestate===0){
 play=createButton("battle briefing")
play.position(170,190)

help=createButton("how to play")
help.position(150,220)


}
bulletg    = createGroup();
tankg      = createGroup();
infantryg  = createGroup();
artilleryg = createGroup();
infantry2g = createGroup();
}



function draw() {
  background("blue")
  drawSprites();


  if(bulletg.isTouching(infantryg)){
    infantryg.destroy();
    bulletg.destroy();
    console.log('infantryworks')
    score = score+1
  }
  if(bulletg.isTouching(artilleryg)){
   artilleryg.destroy();
   bulletg.destroy();
   console.log("artilleryworks")
   score = score+1
  }
  if(bulletg.isTouching(tankg)){
    tankg.destroy();
    bulletg.destroy()
    console.log('tankworks')
score = score+1
  }
  if(bulletg.isTouching(edges1)|| bulletg.isTouching(edges2)|| bulletg.isTouching(edges3)|| bulletg.isTouching(edges4)){
    bullet.destroy();
  }
  if(wall.isTouching(tankg)){
    wallHealth= wallHealth-1
    tankg.destroy();
  }
  if(wall.isTouching(artilleryg)){
    wallHealth= wallHealth-1
    artilleryg.destroy();
  }
  if(wall.isTouching(infantryg)){
    wallHealth= wallHealth-1
    infantryg.destroy();
  }

  play.mousePressed(()=>{
    gamestate=4
    play.hide();
    help.hide();
  })
  help.mousePressed(()=>{
gamestate=3
play.hide();
help.hide();

  })
  
  

var playY = 190
  bunker.x = mouseX
  mg.x = mouseX

if(gamestate===1){
  play.hide();
 
  textSize(20)
strokeWeight(2)
stroke('red')
  text(wallHealth,170,20)
  text("WALL HEALTH : ",20,20)

  stroke('green')
  strokeWeight(2)
  textSize(20)
  text(score,170,40)
  text("SCORE             :",20,40)
  
  createArtillery();
  createInfantry();
  createTank();
}
if(gamestate===3){
  background("white")
  stroke('lightGreen')
  textSize(15)
  text("use mouse to move bunker",20,20)
  text("click spacebar to fire",20,40)
  text("1 spacebar click = 1 bullet fired",20,60)
  text("red line in the game is the wall",20,80)
  text("wall health is shown in the top left in red colour",20,100)
  text("if wall health falls to 0 the game ends",20,120)
  text("each time you destroy a unit you gain a score",20,140)
  text("score count is shown below wall health in green colour",20,160)
  main = createButton("main menu")
  main.position(170,190)
}
if(gamestate===4){
  textSize(20)
  stroke('red')
  text("Today is may 7, 1945. The allies have reached the borders of Germany and is pushing on to Berlin.The Germans are desperate for a defence but most of their high ranking generals had been killed or taken prisoner.But they have one left and that is you.You are the only one left who can fight and defend the fatherland. commander show that you can fight just like the other high ranking generals. Dont allow the allies to reach Berlin ",1,1,399,399)
  defend=createButton("attack")
  defend.position(190,350)
  defend.mousePressed(()=>{
    gamestate=1;
   defend.hide();
  })
}
}
main.mousePressed(()=>{
  gamestate=0;
})

function keyPressed(){
  if(keyCode===32){
    createBullet();
    
  }
}
if(wallHealth===0){
  gamestate=2
}

if(gamestate===2){
restart=createButton("RESTART");
restart.position(170,190);
background('red')
}
if(wallHealth===0){
gamestate=2;
console.log('good');
}
if(score===10){
  database.ref('level').update({
    "level":2
  })

}
if(level===2){
  
createInfantry2();
createTank();
createArtillery();
console.log("level 2 congrats")
  
}
function createBullet(){
  bullet=createSprite(500,500,1,1) ;
  bullet.addImage(bulletimg)
  bullet.scale=0.03
  bullet.shapeColor="red"
   bullet.x = mg.x;
     bullet.y = mg.y;
      bullet.velocityY = -10;
    bulletg.add(bullet);
 }

 function createInfantry(){
   if(frameCount%20===0){
      infantry = createSprite(Math.round(random(10,390)),-5,10,10);
     infantry.velocityY=3;
     infantryg.add(infantry);
   }
 
 }
 function createTank(){
   if(World.frameCount%80===0){
      tank = createSprite(Math.round(random(10,390)),-5,10,10);
      tank.addImage(tigerimg)
      tank.scale = 0.1

     
     tank.velocityY=3;
     tankg.add(tank);
   }}
   function createArtillery(){
   if(World.frameCount%100===0){
      artillery = createSprite(Math.round(random(10,390)),-5,10,10);
     artillery.addImage(artilleryimg)
     artillery.scale= -0.2       
     
     artillery.velocityY=2;
     artilleryg.add(artillery);
    
   }}
   function createInfantry2(){
if(frameCount%40===0){
  infantry = createSprite(math.round(random(10,390)),-5,10,10)
  infantry.shapeColor='red'
  infantry.velocityY=10
  infantry2g.add(infantry)
}
   };