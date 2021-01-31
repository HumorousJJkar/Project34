//Create variables here
var dog, happyDog, sadDog, database, foodS, foodStock;

function preload()
{
  happyDog=loadImage("images/dogImg1.png");
  sadDog=loadImage("images/dogImg.png");
	//load images here
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,350);
  dog.addImage(sadDog);
  dog.scale=0.3;
  foodStock=database.ref('food');
  foodStock.on("value", readStock);
}


function draw() {  

  background(46, 139, 87);
  if(keyDown(UP_ARROW)){
    writeStock();
    dog.addImage(happyDog);
  }
  if(foodS===0){
    dog.addImage(sadDog);

  }
  drawSprites();
  //add styles here
  fill("red");
  textSize(20);
  text("Food Remaining "+ foodS, 170, 150);
}

function readStock(data){
  foodS=data.val();

}

function writeStock(){
  if(foodS<=0){
    foodS=0;
  }
  else{
    foodS=foodS-1;
  }
    database.ref("/").update({food:foodS});
}


