let posP1 = 50;
let posP2 = 50;

function moveBar(qtdMove, barToMove, barPos){
    if(barPos >= 20 && barPos <= 75){
        const rect = document.getElementById(barToMove);
        let yinterval = setInterval(moveP1y, 5);
        let count = 0;
        function moveP1y(){
            if(count == 10){
                count = 0;
                clearInterval(yinterval);
            }else{
                barPos += (0.2)*qtdMove;
                count += 1;
                rect.style.top = barPos + 'vh';
            }
        }
    }
}

setInterval(function executeMoveP1(){
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

/* function executeMoveP2(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            moveBar(xhttp.responseText, 'rect2', posP2);
            console.log(xhttp.responseText);
        }
    };
    xhttp.open("GET", "/p2", true);
    xhttp.send();
}

setInterval(executeMoveP2(), 100); */