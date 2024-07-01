let posP1 = 50;
let posP2 = 50;
let ballPosX = 50;
let ballPosY = 50;
let ballXdir = -1;
let ballYdir = -1;
let ballYvel = 0.02;

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

//faz o movimento da barra do jogador um
function moveP1(qtdMove){
    const rect = document.getElementById('rect1');
    if(posP1 > 14 && posP1 < 80){
        let yinterval = setInterval(moveP1y, 2.5);
        let count = 0;
        function moveP1y(){
            if(count == 10){
                count = 0;
                clearInterval(yinterval);
            }else{
                posP1 += (0.2)* qtdMove;
                if(posP1 <= 14 || posP1 >= 80){
                    count = 0;
                    clearInterval(yinterval);
                }
                count += 1;
                rect.style.top = posP1 + 'vh';
            }
        }
    }else if(posP1 <= 14){
        posP1 = 14;
        posP1 += (0.2)* qtdMove;
        rect.style.top = posP1 + 'vh';
    }else{
        posP1 = 80;
        posP1 += (0.2)* qtdMove;
        rect.style.top = posP1 + 'vh';
    }
}

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
                posP2 += (0.3)* qtdMove;
                if(posP2 <= 14 || posP2 >= 80){
                    count = 0;
                    clearInterval(yinterval);
                }
                count += 1;
                rect.style.top = posP2 + 'vh';
            }
        }
    }else if(posP2 <= 14){
        posP2 = 14;
        posP2 += (0.3)* qtdMove;
        rect.style.top = posP2 + 'vh';
    }else{
        posP2 = 80;
        posP2 += (0.3)* qtdMove;
        rect.style.top = posP2 + 'vh';
    }
}

let ballMovement = setInterval(moveBall, 100);

/*Quando a bola vai bater no bastão de um dos jogadores o programa
calcula a reflexão da seguinte forma:

Imagine que um bastão começa na coordenada zero (0,0) e seu tamanho
é h tal que (0, h) é seu fim. A posição do meio sera dada por (0, h/2)
e ele sera o parametro para a reflexão.

Se a bola atingir o bastão na parte de cima (de (0,0) até (0,h/2)) ele
refletira para cima, com a velocidade vertical indo de 0 até 1, sendo
que se ela bater exatamente no centro a velocidade sera 0 e exatamente
na ponta 1.
A parte de baixo segue a mesma lógica porém refletindo para baixo.

É notavel que tudo é feito com base na parte de baixo da bola (-2.655)
*/

function moveBall(){
    if(ballPosY > 16 && ballPosY < 90){
        const ball = document.getElementById('ball');
        let mainInterval = setInterval(moveBallXY, 5)
        let count = 0;
        function moveBallXY(){
            if(count == 15){
                count = 0;
                clearInterval(mainInterval);
            }else{
                ballPosX += -(0.15) * ballXdir;
                ballPosY += ballYvel * ballYdir;

                if(ballPosY <= 16 || ballPosY >= 90) ballYdir = ballYdir*(-1);
            
                if(ballPosX <= 15.7 && ballPosX >= 14.85625){
                    if((posP1) <= (ballPosY + 2.655) && (posP1 + 6.25) >= ballPosY ){
                        ballXdir = ballXdir * (-1);
                        ballYvel = ((posP1+6.25) - (ballPosY+2.655))/(6.25);
                    }else if((posP1+6.25) < ballPosY && (posP1+12.5)>= ballPosY){
                        ballXdir = ballXdir * (-1);
                        ballYvel = ((posP1+6.25) - (ballPosY+2.655))/(6.25);
                    }                                                          
                }
                if(ballPosX >= (84.15625) && ballPosX <= 85){
                    if((posP2) <= (ballPosY + 2.655) && (posP2 + 6.25) >= ballPosY ){
                        ballXdir = ballXdir * (-1);
                        ballYvel = ((posP2+6.25) - (ballPosY+2.655))/(6.25);
                    }else if((posP2+6.25) < ballPosY && (posP2+12.5)>= ballPosY){
                        ballXdir = ballXdir * (-1);
                        ballYvel = ((posP2+6.25) - (ballPosY+2.655))/(6.25);
                    }   
                }
                count += 1;
                ball.style.top = ballPosY + 'vh';
                ball.style.left = ballPosX + 'vw';
            }
        }
    }  
}

/* setInterval(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            moveBar(xhttp.responseText, 'rect1', posP1);
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/p1", true);
    xhttp.send();
}, 100);

setInterval(function executeMoveP2(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            moveBar(xhttp.responseText, 'rect2', posP2);
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/p2", true);
    xhttp.send();
}, 100); */