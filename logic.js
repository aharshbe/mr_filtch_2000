/*
  JavaScript file for Mr. Filtch 2000 logic
  Added in separate file because it's cleaner ...
*/

//Globals
var dirt_plots_arr = [];
var plots_cleaned = 0;
var room_dimensionsS = [];
var directions = [];
var position = [0,0];
var incrementor = 50;
var myGamePiece;
var game_total = 0;

// Function to create <p> tags
function create_p(text){
  var p = document.createElement("p");
  var node = document.createTextNode(text);
  p.appendChild(node);
  document.body.appendChild(p);
}
// Function to create buttons
function create_b(name,onclickf){
  var b = document.createElement("INPUT");
  b.setAttribute("type","button");
  b.setAttribute("value",name);
  b.setAttribute("onclick",onclickf);
  document.body.appendChild(b);
}

// Display confirmation of input data to upload to game
function displayInput(){
  var file = document.getElementById("fileInput").files[0];
  if (file) {
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
          tokens = parseInput(evt.target.result)
          startGame(tokens[0],tokens[1],tokens[3],tokens[2])
      }
      reader.onerror = function (evt) {
          document.getElementById("FileContents").innerHTML = "error reading file";
      }
  }
}
// Parse input data that was uploaded
function parseInput(contents){
  token = []
  tokens = []
  dirt_plots = []
  for (i = 0; i < contents.length; i++){
    if (contents[i] == '\n'){
      if (i > 7 && i < contents.length - 1){
        dirt_plots.push(token)
        token = []
      } else {
        tokens.push(token)
        token = []
      }
    } else {
      if (contents[i] != ' '){
        token.push(contents[i])
      }
    }
  }
  tokens.push(dirt_plots)
  displayHelp();
  return tokens
}

// Start game logic
function create_patches(dirt_patches){
  var sizex = 50;
  var sizey = 50;
  var skip = 0;
  // Generates dirt plots, but check for single axis: If dirt plots are on the same axis, they are merged
  for (i = 0; i < dirt_patches.length; i++){
    if (i > 0 && dirt_patches[i-1][0] == dirt_patches[i][0] || dirt_patches[i+1] && dirt_patches[i][0] == dirt_patches[i+1][0]){
      if (skip){
        skip = 0;
      } else {
        sizex += 100;
        skip = 1;
      }
    } else if (i > 0 && dirt_patches[i-1][1] == dirt_patches[i][1] || dirt_patches[i+1] && dirt_patches[i][1] == dirt_patches[i+1][1]){
      if (skip){
        skip = 0;
      } else {
        sizey += 100;
        skip = 1;
      }
    } else {
      skip = 0;
      sizex = 50;
      sizey = 50;
    }
    if (!skip){
      dirt_plots_arr.push(new component(sizex, sizey, "brown", dirt_patches[i][1]*100, dirt_patches[i][0]*100))
    }
  }
}
// Starts the game: Initial uploaded instructions are passed as args
function startGame(room_dimensions, hoover_position, dirt_patches, driving_instructions) {
    unhide("d-pad");
    unhide("upload_button");
    unhide("help_button");
    room_dimensionsS.push(room_dimensions);
    directions.push(driving_instructions);
    myGameArea.start();
    position[0] = hoover_position[0]*100;
    position[1] = hoover_position[1]*100;
    myGamePiece = new component(50, 50, "red", position[0], position[1]);
    create_patches(dirt_patches);
}
// Generates a game board object 'canvas' with dimensions, etc
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = room_dimensionsS[0][0]*100;
      this.canvas.height = room_dimensionsS[0][1]*100;
      this.canvas.style.border = '2px solid #000';
      this.context = this.canvas.getContext("2d");
      this.context.transform(1, 0, 0, -1, 0, this.canvas.height)
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      window.addEventListener('touchstart', function (e) {
        myGameArea.x = e.pageX;
        myGameArea.y = e.pageY;
      })
      window.addEventListener('touchend', function (e) {
        myGameArea.x = false;
        myGameArea.y = false;
      })
    },
    clear : function(){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval);
  }
}
// Creates a component object with properties to define Mr. Filtch or dirt plots
function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  // Logic to detect if Mr. Filtch crashes with dirt plots, so that they can be removed if he does and added to his score
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) ||
    (mytop > otherbottom) ||
    (myright < otherleft) ||
    (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}
// Function that constantly updates the frames of the game for moves, etc
function updateGameArea(num_pathes){
  myGameArea.clear();
  myGamePiece.newPos();
  myGamePiece.update();
  for (i = 0; i < dirt_plots_arr.length; i++){
    dirt_plots_arr[i].update();
    if (myGamePiece.crashWith(dirt_plots_arr[i])){
      plots_cleaned += 1
      dirt_plots_arr[i].x += 1000;
      alert("Dirt cleaned. Currently you've cleaned "+plots_cleaned+" plots.");
      stopMove();
    }
  }
  // Logic to control if the game is over or not
  if (game_total == directions[0].length){
    console.log(position[0]/100+" "+position[1]/100+"\n"+plots_cleaned);
    alert("Game over! No more moves left. Score below.\n\nRefresh page when done to restart/upload a new input file.\n\nLast hoover position: "+position[0]/100+", "+position[1]/100+"\nDirt plots cleared: "+plots_cleaned);
  }
  displyNav();
}
// Lines 238 - 273 define the directional pad movements and update the hoover position
function moveup() {
  myGamePiece.y += incrementor;
  position[1] += incrementor*2;
  game_total += 1;
}
function movedown() {
  myGamePiece.y -= incrementor;
  position[1] -= incrementor*2;
  game_total += 1;
}
function moveleft() {
  myGamePiece.x -= incrementor;
  position[0] -= incrementor*2;
  game_total += 1;
}
function moveright() {
  myGamePiece.x += incrementor;
  position[0] += incrementor*2;
  game_total += 1;
}
function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}
function unhide(divID) {
  var item = document.getElementById(divID);
  if (item) {
    if(item.className=='hidden'){
        item.className = 'unhidden' ;
    }else{
        item.className = 'hidden';
    }
  }
}
// Creates the helpful navigational text, the cardinal direction output and the hoover position
function displyNav(){
  document.getElementById("hoover_pos").innerHTML = "Current hoover position: "+position[0]/100+", "+position[1]/100;
  document.getElementById("all_moves").innerHTML = "Driving instructions: "+directions[0];
  if (directions[0][game_total]){
    document.getElementById("FileContents").innerHTML = "Next move Mr. Filtch: "+directions[0][game_total];
  } else {
    document.getElementById("FileContents").innerHTML = "No more moves left! Refresh page to restart.";
  }

}
// Help alert dialogue
function displayHelp(){
  alert("Mr. Filtch 2000! Your handy dirt cleaning roombot -- the best there is.\n\nTo get started, confirm your uploaded 'input.txt' details...\n\nRoom dimensions: "+tokens[0]+"\nInitial hoover position: "+tokens[1]+"\nPatches of dirt coordinates: "+tokens[3]+"\nDriving instructions: "+tokens[2]+"\n\nTo navigate Mr. Filtch 2000, use the directional pad below the room map. Then follow the directions given in the 'input.txt' file.\n\nOh! Almost forgot, when the game is complete, an alert will pop up. After you've reviewed Mr. Filch's score, refresh your web browser. If you need to view this alert again, just click the 'Instructions' button.");
}

// EOF
