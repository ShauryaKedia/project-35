//Create variables here
var dog, dogImg, happyDogImg,  database, foodS, foodStock, milkBottle;
var feed, add;
var fedTime, lastFed;
var foodObj;

function preload(){
  dogImg = loadImage("Dog.png")
  happyDogImg = loadImage("happydog.png")

}

function setup() {
  createCanvas(1000,500);
  database = firebase.database();

  foodObj=new Food()  
  dog = createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  feed=createButton("Feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog)
  
  add=createButton("Add Food");
  add.position(800,95)
  add.mousePressed(addFoods)
  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87)
   
  foodObj.display()

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  drawSprites();

}

function readStock(data){
     foodS=data.val();
}

function writeStock(x){

  if(x<=0){
      x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDogImg)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:Hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

