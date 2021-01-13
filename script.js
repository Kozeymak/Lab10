const a=100;
const l=5;
const resDiv = document.getElementById('result');
let empty;
let crosses;
let circles;
let score_x=0;
let score_o=0;
let player=0;
let gameOver;
document.getElementById("new_round").addEventListener('click', newRound);
document.getElementById("reset").addEventListener('click', reset);

const canvas=document.getElementById('tictac'),
    context=canvas.getContext('2d');
drawField();

function drawField() {
    gameOver=false;
    document.getElementById('player').innerText=`Ходит игрок номер ${player+1}`;
    empty=[true, true, true, true, true, true, true, true, true];
    crosses=[false, false, false, false, false, false, false, false, false];
    circles=[false, false, false, false, false, false, false, false, false];
    console.log(empty);
    context.beginPath();
    context.lineWidth=l;
    context.moveTo(a, 0);                                                                                                          
    context.lineTo(a, 3*a);
    context.moveTo(2*a, 0);
    context.lineTo(2*a, 3*a);
    context.moveTo(0, a);
    context.lineTo(3*a, a);
    context.moveTo(0, 2*a);
    context.lineTo(3*a, 2*a);
    context.closePath();
    context.stroke();
}


function square(x, y) {
    if ((x<=3*a)&&(y<=3*a)) {
        let row=Math.floor(y/a);
        let column=Math.floor(x/a);
        return row*3+column;
    }
}

function drawCross(cell) {
    let y_start=Math.floor(cell/3)*a+0.1*a;
    let x_start=(cell%3)*a+0.1*a;
    context.beginPath();
    context.lineWidth=l;
    context.moveTo(x_start, y_start);                                                                                                          
    context.lineTo(x_start+0.8*a, y_start+0.8*a);
    context.moveTo(x_start+0.8*a, y_start);                                                                                                          
    context.lineTo(x_start, y_start+0.8*a);
    context.closePath();
    context.stroke();
}

function drawCircle(cell) {
    let y_start=Math.floor(cell/3)*a+0.5*a;
    let x_start=(cell%3)*a+0.5*a;
    context.beginPath();
    context.lineWidth=l;
    context.arc(x_start, y_start, 0.4*a, 0, Math.PI*2);
    context.closePath();
    context.stroke();
}

canvas.addEventListener('click', makeTurn);

function makeTurn(e) {
    let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY - e.target.offsetTop;
    let cell=square(x, y);
    
    if((crosses[cell] === false) && (circles[cell] === false) && (gameOver === false)) {
        if(player===0) {
            drawCross(cell);
            crosses[cell]=true;
        } else if(player===1) {
            drawCircle(cell);
            circles[cell]=true;
        }
        empty[cell]=false;
        winner=findWinner();
        if(winner===null){
            player=(player+1)%2; 
            document.getElementById('player').innerText=`Ходит игрок номер ${player+1}`;
            if(!(true in empty)){
                result(2);
            }
        } else {
            result(winner);
            player=winner;
            gameOver=true;
        }
    }
}

function findWinner() {
    if (((crosses[0]===true)&&(crosses[1]===true)&&(crosses[2]===true))||
    ((crosses[3]===true)&&(crosses[4]===true)&&(crosses[5]===true))||
    ((crosses[6]===true)&&(crosses[7]===true)&&(crosses[8]===true))||
    ((crosses[0]===true)&&(crosses[3]===true)&&(crosses[6]===true))||
    ((crosses[1]===true)&&(crosses[4]===true)&&(crosses[7]===true))||
    ((crosses[2]===true)&&(crosses[5]===true)&&(crosses[8]===true))||
    ((crosses[0]===true)&&(crosses[4]===true)&&(crosses[8]===true))||
    ((crosses[2]===true)&&(crosses[4]===true)&&(crosses[6]===true))) {
        score_x+=1;
        document.getElementById('score_x').innerText=score_x;
        return 0;
    } else if (((circles[0]===true)&&(circles[1]===true)&&(circles[2]===true))||
    ((circles[3]===true)&&(circles[4]===true)&&(circles[5]===true))||
    ((circles[6]===true)&&(circles[7]===true)&&(circles[8]===true))||
    ((circles[0]===true)&&(circles[3]===true)&&(circles[6]===true))||
    ((circles[1]===true)&&(circles[4]===true)&&(circles[7]===true))||
    ((circles[2]===true)&&(circles[5]===true)&&(circles[8]===true))||
    ((circles[0]===true)&&(circles[4]===true)&&(circles[8]===true))||
    ((circles[2]===true)&&(circles[4]===true)&&(circles[6]===true))) {
        score_o+=1;
        document.getElementById('score_o').innerText=score_o;
        return 1;
    } else {
        return null;
    }
}

function newRound() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
}

function reset() {
    player=0
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    score_x=0;
    score_o=0;
    document.getElementById('score_o').innerText=score_o;
    document.getElementById('score_x').innerText=score_x;
}

function result(opt) {
    switch(opt){
        case 0:
            resDiv.innerText='Победил первый игрок';
            break;
        case 1:
            resDiv.innerText='Победил второй игрок';
            break;
        case 2:
            resDiv.innerText='Ничья';
            break;
    }
    resDiv.style.visibility='visible';
}