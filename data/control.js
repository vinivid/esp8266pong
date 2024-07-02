let posP1 = 50;
let posP2 = 50;
let ballPosX = 50;
let ballPosY = 50;
let ballXdir = -1;
let ballYdir = -1;
let ballYvel = 0.02;
let pointsP1 = 0;
let pointsP2 = 0;

//randomiza a direção inicial da bola
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

/*A função moveP1() move o bastão do jogador verticalmente com uma pequena
animação, tabém inibindo que o bastão va além dos limites.

Argumento:
qtdMove: é o valor passado pelo HTTP_GET que indica para qual direção
o bastão esta sendo movido.
*/
function moveP1(qtdMove){
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

/*A função moveBall() move a bola e também visualiza ela no HTML com
uma animação, assim como checa se um jogador ganhou um ponto.

A velocidade do deslocamento horizontal é constante e o vertical
depende das reflexões.

Quando a bola chega a um dos limites verticais apenas se inverte
o a direção do deslocamento Y.

Quando a bola vai bater no bastão de um dos jogadores o programa
calcula a reflexão da seguinte forma:

Para o eixo x ele apenas inverte sua direção.

Para o y magine que um bastão começa na coordenada (0,0) e seu tamanho
é h tal que (0, h) é seu fim. A posição do meio sera dada por (0, h/2)
e ele sera o parametro para a reflexão.

Se a bola atingir o bastão na parte de cima (de (0,0) até (0,h/2)) ele
refletira para cima, com a velocidade vertical indo de 0 até 1, sendo
que se ela bater exatamente no centro a velocidade sera 0 e exatamente
na ponta 1.
A parte de baixo segue a mesma lógica porém refletindo para baixo.

É notavel que tudo é feito com base na parte de cima da bola (+2.655)
Existe um bug que de alguma forma quando a bola atinge um dos extremos
cantos da pilastra ela vai na direção contraria que deveria.

Os pontos são calculados quando a bola chega um pouco além de um dos
bastões, que aumenta um no placar de um dos jogadores e também renicia
a posição da bola.
*/
let ballMovement = setInterval(moveBall, 100);

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

                //inverte direção do y quando a bola chega em um dos limites
                if(ballPosY <= 16 || ballPosY >= 90) ballYdir = ballYdir*(-1);
                
                //resolve se a bola foi refletida ou não por um jogador
                if(ballPosX <= 15.7 && ballPosX >= 15.35625){
                    if((posP1) <= (ballPosY + 2.655) && (posP1 + 6.25) >= ballPosY ){
                        ballXdir = ballXdir * (-1);
                        ballPosX += 0.30;
                        ballYvel = ((posP1+6.25) - (ballPosY+2.655))/(6.25);
                    }else if((posP1+6.25) < (ballPosY + 2.655) && (posP1+12.5)>= ballPosY){
                        ballXdir = ballXdir * (-1);
                        ballPosX += 0.30;
                        ballYvel = ((ballPosY+2.655) - (posP1+6.25))/(6.25);
                    }                                                          
                }
                if(ballPosX >= (84.15625) && ballPosX <= 84.6){
                    if((posP2) <= (ballPosY + 2.655) && (posP2 + 6.25) >= ballPosY ){
                        ballXdir = ballXdir * (-1);
                        ballPosX -= 0.30;
                        ballYvel = ((posP2+6.25) - (ballPosY+2.655))/(6.25);
                    }else if((posP2+6.25) < ballPosY && (posP2+12.5)>= ballPosY){
                        ballXdir = ballXdir * (-1);
                        ballPosX -= 0.30;
                        ballYvel = ((ballPosY+2.655) - (posP2+6.25))/(6.25);
                    }   
                }

                //contabiliza os pontos
                if(ballPosX <= 12){
                    pointsP2 += 1;
                    const htp2 = document.getElementById('p2point');
                    htp2.innerHTML = pointsP2;
                    randomizeStart();
                }
                if(ballPosX >= 87){
                    pointsP1 += 1;
                    const htp1 = document.getElementById('p1point');
                    htp1.innerHTML = pointsP1;
                    randomizeStart();
                }

                count += 1;
                ball.style.top = ballPosY + 'vh';
                ball.style.left = ballPosX + 'vw';
            }
        }
    }else if(ballPosY <= 16){
        ballPosY = 16.01;
    }else{
        ballPosY = 89.09
    }    
}


//São as funções que constantemente checam se algum dos botões esta pressionado
setInterval(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            moveP1(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/p1", true);
    xhttp.send();
}, 50);

setInterval(() => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            moveP2(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/p2", true);
    xhttp.send();
}, 50);