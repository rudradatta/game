var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

 function rld(){
    location.reload();
}
document.getElementById("bttn").addEventListener("click",rld);


// load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.gif";
//fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";


// some variables


//gap btw pipes
var gap = 300;
var constant;

var bX = 500;
var bY = 150;

var gravity = 3;

var score = 0;

// audio files

var fly = new Audio();
var scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on key down

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp);
document.addEventListener("ondblclick",moveUp);

function moveUp(){
    bY -= 100;
    fly.play();
}

// pipe coordinates

var pipe = [];
//FIRST pipe
pipe[0] = {
    x : cvs.width-400,
    y : 0
};

// draw images

function draw(){
    
    ctx.drawImage(bg,0,0);
    
    
    for(var i = 0; i < pipe.length; i++){
        
        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
             
        pipe[i].x--;


        //PIPE GENERATION
        
        if( pipe[i].x == 600){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            }); 
        }

        // detect collision
        
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            ctx.fillText(" your Score : "+score,450,100);
            ctx.fillText(" Click START To Play Again",400,280);
            location.destroy(); // reload the page
        }
        
        if(pipe[i].x == 5){
            score++;
            scor.play();
        }
        
        
    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    var milli = draw.prototype.getTime;
    draw.prototype.getTime = function(){
    return milli.call(this) * 0.1;  
    };




    requestAnimationFrame(draw);

    
}
//reload the page


draw();

























