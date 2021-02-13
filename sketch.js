var bg,play,playimage,balloon,balloonimage,coin,coinimage,coingroup,enemy,enemyimage2,enemygroup;
var gamestate="intro";
var score=0;
var restart,restartimage;
function preload() {
bg=loadImage("Bg.jpg")
playimage=loadImage("play.png")
balloonimage=loadAnimation("B1.png","B2.png","B3.png","B4.png","B5.png","B6.png");
coinimage=loadImage("Coin.png")
enemyimage2=loadImage("enemy2.png")
restartimage=loadImage("restart.png")
}

function setup(){
    var canvas = createCanvas(288,512);
    play=createSprite(144,300);
    play.addImage(playimage)
    play.scale=0.1;
    balloon=createSprite(144,400);
    balloon.addAnimation("balloona",balloonimage);
    balloon.scale=0.06;
    restart=createSprite(144,310);
    restart.addImage(restartimage);
    restart.scale=0.3;
    restart.visible=false;
    coingroup=new Group();
    enemygroup=new Group();
}

function draw(){
        background(bg);
        if(gamestate==="intro"){
            restart.visible=false
            balloon.visible=false;
            textSize(40);
            fill(rgb(random(0,255),random(0,255),random(0,255)))
            stroke("green");
            strokeWeight(3.5);
            text("hot air balloon",25,200);
            if(mousePressedOver(play)||touches.length>0){
                gamestate="play"
                touches=[];
            }
        }
        textSize(40);
            fill(0)
            stroke(0);
            strokeWeight(3.5);
            text(Math.round(score),5,35)
        if(gamestate==="play"){
            score=score+0.05
            play.visible=false;
            balloon.visible=true;
            spawncoins();
            spawnenemy();
            if(balloon.isTouching(coingroup)){
                coingroup.destroyEach();
            }
            if(balloon.isTouching(enemygroup)){
                gamestate="end"
            }
        }
        if(gamestate==="end"){
            coingroup.destroyEach();
            enemygroup.destroyEach();
            textSize(90);
            fill(0)
            stroke(0);
            strokeWeight(9);
            text("GAME",10,150);
            text("OVER",10,230);
            restart.visible=true;
            if(mousePressedOver(restart)||touches.length>0){
                gamestate="intro"
                score=0
                touches=[];
            }
        }
        drawSprites();
}
function mouseDragged(){
    balloon.x=mouseX
}
function spawncoins(){
    if(frameCount%5===0){
      coin=createSprite(random(8,280),-5);
    coin.addImage(coinimage);
    coin.velocityY=score/100+3;
    coin.scale=0.01;
    coin.lifetime=260
    coingroup.add(coin)
    }
}
function spawnenemy(){
    if(frameCount%40===0){
    enemy=createSprite(random(8,280),-5);
        enemy.addImage(enemyimage2);
        enemy.rotationSpeed=4
    enemy.velocityY=score/100+3;
    enemy.scale=random(0.03,0.1);
    enemy.lifetime=300
    enemygroup.add(enemy)
    enemy.setCollider("circle",0,0,340)
    }
}