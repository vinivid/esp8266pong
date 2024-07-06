//All units in px
//there are problems on vertical mobile

let posP1 = 440;
let TposP1 = 440;
let posP2 = 440;
let TposP2 = 440;
let ballPosX = 50;
let ballPosY = 50;
let ballXdir = -1;
let ballYdir = -1;
let ballYvel = 0.02;
let pointsP1 = 0;
let pointsP2 = 0;

function randomizeStart(){
    ballPosX = 50;
    ballPosY = 50;

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

    ballYvel = Math.random()/3;
}

randomizeStart();

/*Pos top = 110px Pos bot = 800px vertical limits
< 250px || > 1550px horizontal limits

rect heigh = 100px
*/

//Moves the player 20px vertically
function moveP1(yMoveDir){
    const rect = document.getElementById('rect1');

    //to avoid the bar entering or going beyond the limit
    if(posP1 <= 130){
        if(yMoveDir == 1){
            TposP1 += 20 * (yMoveDir);
            let intervalAnim = setInterval(moveFunc, 2);
            let count = 0;
    
            function moveFunc(){
                if(count == 4) clearInterval(intervalAnim);
                posP1 += 5 * (yMoveDir);
                count += 1;
                rect.style.top = posP1;
            }

            return;
        }

        let relativePos = posP1 - 110;


        TposP1 += relativePos * (yMoveDir);
        let intervalAnim = setInterval(moveFunc, 2);
        let count = 0;

        function moveFunc(){
            if(count == 4) clearInterval(intervalAnim);
            posP1 += (relativePos/4) * (yMoveDir);
            count += 1;
            rect.style.top = posP1;
        }

    }else if(posP1 >= 680){
        if(yMoveDir == -1){
            TposP1 += 20 * (yMoveDir);
            let intervalAnim = setInterval(moveFunc, 2);
            let count = 0;
    
            function moveFunc(){
                if(count == 4) clearInterval(intervalAnim);
                posP1 += 5 * (yMoveDir);
                count += 1;
                rect.style.top = posP1;
            }

            return;
        }

        let relativePos = 700 - posP1 


        TposP1 += relativePos * (yMoveDir);
        let intervalAnim = setInterval(moveFunc, 2);
        let count = 0;

        function moveFunc(){
            if(count == 4) clearInterval(intervalAnim);
            posP1 += (relativePos/4) * (yMoveDir);
            count += 1;
            rect.style.top = posP1;
        }

    }else{
        TposP1 += 20 * (yMoveDir);
        let intervalAnim = setInterval(moveFunc, 2);
        let count = 0;

        function moveFunc(){
            if(count == 4) clearInterval(intervalAnim);
            posP1 += 5 * (yMoveDir);
            count += 1;
            rect.style.top = posP1;
        }
    }
}

function fmoveP1(qtdMove){
    const rect = document.getElementById('rect1');
    if(posP1 > 15 && posP1 < 80){
        let yinterval = setInterval(moveP1y, 2);
        let count = 0;
        function moveP1y(){
            if(count == 10){
                count = 0;
                clearInterval(yinterval);
            }else{
                //A barra sempre se enfia dentro do limite não importa o que faça
                if(posP1 <= 15.4 || posP1 >= 80){
                    count = 0;
                    clearInterval(yinterval);
                }
                posP1 += (0.5)* qtdMove;
                count += 1;
                rect.style.top = posP1 + 'vh';
            }
        }
    }else if(posP1 <= 15){
        posP1 = 15.01;
    }else{
        posP1 = 79.9;
    }
}

//Mesma coisa que a moveP1()
function moveP2(qtdMove){
    const rect = document.getElementById('rect2');
    if(posP2 > 14 && posP2 < 80){
        let yinterval = setInterval(moveP1y, 5);
        let count = 0;
        function moveP1y(){
            if(count == 10){
                count = 0;
                clearInterval(yinterval);
            }else{
                if(posP2 <= 15.4 || posP2 >= 80){
                    count = 0;
                    clearInterval(yinterval);
                }
                posP2 += (0.5)* qtdMove;
                count += 1;
                rect.style.top = posP2 + 'vh';
            }
        }
    }else if(posP2 <= 15){
        posP2 = 15.01;
    }else{
        posP2 = 79.9;
    }
}


document.addEventListener('keydown', (event)=>{
    if(event.key == "w") moveP1('-1');
    if(event.key == "s") moveP1('1');
    if(event.key == "i") moveP2('-1');
    if(event.key == "k") moveP2('1');
})
