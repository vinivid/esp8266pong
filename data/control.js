//All units in px
//there are problems on vertical mobile

let posP1 = 440;
let posP2 = 440;

let ballPosX = 900;
let ballXdir = -1;
let ballXvel = 3;

let ballPosY = 440;
let ballYvel = 1;

let qttMoveP1 = 3.75;
let qttMoveP2 = 3.75;

let pointsP1 = 0;
let pointsP2 = 0;

function randomizeStart(){
    let ballYdir = 0;
    ballPosX = 900; ballPosY = 440;

    if(Math.random() >= 0.5){
        ballXdir = -1;
    }else{
        ballXdir = 1;
    }
    
    if(Math.random() >= 0.5){
        ballYdir = -1;
    }else{
        ballYdir = 1;
    }   

    ballYvel = (Math.random()*5) * ballYdir;
}

randomizeStart();

/*Pos top = 110px Pos bot = 800px vertical limits
< 250px || > 1550px horizontal limits

rect heigh = 100px
*/

//Moves the player 30px vertically
//And tries to make the bar not go above the limits
//For some reason it flickers a little bit on the limit some times
function moveP1(yMoveDir){
    const rect = document.getElementById('rect1');
    let intervalAnim = setInterval(moveFunc, 1);
    let count = 0;

    function moveFunc(){
        qttMoveP1 = 3.75;
        if(count == 8) clearInterval(intervalAnim);
        if(posP1 <= 130){
            qttMoveP1 = posP1 - 110;
            if(yMoveDir == 1) qttMoveP1 = 3.75;
        }else if(posP1 >= 680){
            qttMoveP1 = 700 - posP1;
            if(yMoveDir == -1) qttMoveP1 = 3.75;
        }
        posP1 +=  qttMoveP1 * (yMoveDir);
        count += 1;
        rect.style.top = posP1 + 'px';
    }
}

//Same thing as moveP1() just with differnt variables
function moveP2(yMoveDir){
    const rect = document.getElementById('rect2');

    let intervalAnim = setInterval(moveFunc, 1);
    let count = 0;

    function moveFunc(){
        qttMoveP2 = 3.75;
        if(count == 8) clearInterval(intervalAnim);
        if(posP2 <= 130){
            qttMoveP2 = posP2 - 110;
            if(yMoveDir == 1) qttMoveP2 = 3.75;
        }else if(posP2 >= 680){
            qttMoveP2 = 700 - posP2;
            if(yMoveDir == -1) qttMoveP2 = 3.75;
        }
        posP2 +=  qttMoveP2 * (yMoveDir);
        count += 1;
        rect.style.top = posP2 + 'px';
    }
}

/*Pos top = 110px Pos bot = 800px vertical limits
< 250px || > 1550px horizontal limits

rect height = 100px 
rect width = 20px
rect pos relattive to left:
rect1 = 250px
rect2 = 1550px

ball height && widht = 25px
*/
let ballTiming = setInterval(moveBall, 100);

function moveBall(){
    const ball = document.getElementById('ball');

    let intervalAnim = setInterval(moveFunc, 1);
    let count = 0;

    function moveFunc(){
        //Check if the ball has hit a limit and changes vertical
        //direction
        if(ballPosY <= 113 || ballPosY >= 773) ballYvel *= -1;

        //The the reflection is calculated is the distance from the top of
        //the bar to the top of the ball minus the distance from the bottom 
        //of the bar to the bottom of the ball
        if(ballPosX <= 270 && ballPosX >= 250){
            if((ballPosY + 25) >= posP1 && ballPosY <= (posP1 + 100)){
                ballXdir *= -1; ballXvel = 5;
                ballYvel = ((ballPosY - posP1) - ((posP1 + 100)-(ballPosY + 25)))/10;
            }
        }else if(ballPosX >= 1520 && ballPosX <= 1540){
            if((ballPosY + 25) >= posP2 && ballPosY <= (posP2 + 100)){
                ballXdir *= -1; ballXvel = 5;
                ballYvel = ((ballPosY - posP2) - ((posP2 + 100)-(ballPosY + 25)))/10;
            }
        }

        if(ballPosX <= 235){
            pointsP2 += 1; 
            const pP2 = document.getElementById('p2point');
            pP2.innerHTML = `P2: ${pointsP2}`;
            randomizeStart();
        }else if(ballPosX >= 1585){
            pointsP1 += 1; 
            const pP1 = document.getElementById('p1point');
            pP1.innerHTML = `P1: ${pointsP1}`;
            randomizeStart();
        }
        
        if(count == 8) clearInterval(intervalAnim);
        //40px horizontal vel
        ballPosX += (ballXvel) * (ballXdir);
        ballPosY += (ballYvel);
        count += 1;
        ball.style.left = ballPosX + 'px';
        ball.style.top = ballPosY + 'px';
    }
}

//This is for control on the keyboad, it checks when something was pressed and when it was realesed trough an array of keys
//on the keyboard
let keysPressed = {};
keysPressed['w'] = false; keysPressed['s'] = false;
keysPressed['i'] = false; keysPressed['k'] = false;

document.addEventListener('keydown', (e)=>{
    keysPressed[e.key] = true;

    if(keysPressed['w'] == true && keysPressed['i'] == true){
        moveP1('-1'); moveP2('-1'); return;
    }

    if(keysPressed['w'] == true && keysPressed['k'] == true){
        moveP1('-1'); moveP2('1'); return;
    }

    if(keysPressed['s'] == true && keysPressed['i'] == true){
        moveP1('1'); moveP2('-1'); return;
    }

    if(keysPressed['s'] == true && keysPressed['k'] == true){
        moveP1('1'); moveP2('1'); return;
    }

    if(keysPressed['w'] == true && keysPressed['s'] == false){
        moveP1('-1'); return;
    }
    if(keysPressed['s'] == true && keysPressed['w'] == false){
        moveP1('1'); return;
    } 
    if(keysPressed['i'] == true && keysPressed['k'] == false){
        moveP2('-1'); return;
    }
    if(keysPressed['k'] == true && keysPressed['i'] == false){
        moveP2('1'); return;
    }
});

document.addEventListener('keyup', (e)=>{
    if(!e.repeat){
        keysPressed[e.key] = false;
    }
});

if(!!window.EventSource){
    var espEvent = new EventSource('/events');

    console.log("reched here");
    espEvent.addEventListener('buttonPress', (e)=>{
        if(e.data == '-1p1') {
            console.log('event received');
            moveP1('-1');
        }
        if(e.data == '1p1') moveP1('1');
        if(e.data == '-1p2') moveP2('-1');
        if(e.data == '1p2') moveP2('1');
    });
}