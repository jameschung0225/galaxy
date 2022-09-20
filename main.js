//캔버스 셋팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,enemy2Image,gameOverImage;
let gameOver = false; //true가 되면 게임이 끝남!!!
let score = 0; //점수변수

//우주선 좌표
let spaceshipX = canvas.width/2 -32;
let spaceshipY = canvas.height - 64;

let bulletList = []; //총알들을 저장하는 리스트
function Bullet(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.x = spaceshipX + 20;
        this.y = spaceshipY;
        this.alive = true //true이면 살아있는 총알, false면 죽은 총알   
        bulletList.push(this);
    };
    this.update = function(){
        this.y -=7;
    };

    //총알이 enemy에 닿았는지 체크
    this.checkHit = function(){
        //총알.y <= 적군.y &&
        //총알.x >= 적군.x &&
        //총알.x <= 적군.x + 적군.width

        //적군1
        for(let i=0; i<enemyList.length;i++){
            if(this.y <= enemyList[i].y && enemyList[i].x <= this.x && this.x <= (enemyList[i].x + 28)){
                score ++;
                this.alive = false; //총알이 적군에 닿으면 총알이 사라짐
                bulletList.splice(i,1);
                enemyList.splice(i,1); // 총알이 적군에 닿으면 적군이 사라짐
            };
            if(this.y <= 0){
                this.alive = false;
                bulletList.splice(i,1);
            }
        };
        //적군2
        for(let i=0; i<enemyList2.length;i++){
            if(this.y <= enemyList2[i].y && enemyList2[i].x <= this.x && this.x <= (enemyList2[i].x + 28)){
                score ++;
                this.alive = false; //총알이 적군에 닿으면 총알이 사라짐
                bulletList.splice(i,1);
                enemyList2.splice(i,1); // 총알이 적군에 닿으면 적군이 사라짐
            };
            if(this.y <= 0){
                this.alive = false;
                bulletList.splice(i,1);
            }
        }; 
    };
}

//적군 만들기 랜덤 범위 셋팅
function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min;
    return randomNum;
}

//적군1 만들기
let enemyList = [];
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0,canvas.width - 48);

        enemyList.push(this);
    };
    this.update = function(){
        this.y +=2 ;

        //게임오버 조건식
        if(this.y >= canvas.height - 48){
            gameOver=true;
            console.log("게임오버ㅠㅠ");
        };
    };
}

//적군2 만들기
let enemyList2 = [];
function Enemy2(){
    this.x = 0;
    this.y = 0;
    this.init = function(){
        this.y = 0;
        this.x = generateRandomValue(0,canvas.width - 48);

        enemyList2.push(this);
    };
    this.update = function(){
        this.y +=2 ;

        //게임오버 조건식
        if(this.y >= canvas.height - 48){
            gameOver=true;
            console.log("게임오버ㅠㅠ");
        };
    };
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png"

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png"

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png"

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png"

    enemy2Image = new Image();
    enemy2Image.src = "images/enemy2.png"

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.jpg"
}

let keysDown ={};
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.key] = true;
        console.log("키다운객체에 들어간 값은?",keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.key];
        console.log("버튼 클릭후",keysDown);

        if(event.key==" "){ //스페이스바를 누르면
            createBullet() //총알 생성 함수
        }
    });
}

//총알생성
function createBullet(){
    console.log("총알생성!!!");
    let b = new Bullet();
    b.init();
    console.log("새로운 총알 리스트",bulletList);
}

//적군1생성
function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },2000); //단위:ms => 따라서 1초는 1000임!
}

//적군2생성
function createEnemy2(){
    const interval = setInterval(function(){
        let e = new Enemy2();
        e.init();
    },2000); //단위:ms => 따라서 1초는 1000임!
}

function update(){
    //오른쪽으로 이동
    if('ArrowRight' in keysDown){
        spaceshipX +=5; //우주선의 속도 제어
    }
    //왼쪽으로 이동
    if('ArrowLeft' in keysDown){
        spaceshipX -=5; //우주선의 속도 제어
    }
    //왼쪽 움직임 제한
    if(spaceshipX <=0){
        spaceshipX = 0;
    }
    //오른쪽 움직임 제한
    if(spaceshipX >= canvas.width-64){
        spaceshipX = canvas.width-64;
    }
    //총알의 y좌표를 업데이트하는 함수 호출
    for(let i=0; i<bulletList.length;i++){
        if(bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
        };
    }

    //적군1의 y좌표를 업데이트하는 함수 호출
    for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
    }

    //적군2의 y좌표를 업데이트하는 함수 호출
    for(let i=0;i<enemyList2.length;i++){
        enemyList2[i].update();
    }
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
    //점수(score) 화면에 나타내기
    ctx.fillText(`Score:${score}`,20,20);
    ctx.fillStyle="white";
    ctx.font ="20px Arial";
    
    
    for(let i=0;i<bulletList.length;i++){
        if(bulletList[i].alive == true){
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);        
        }
    }

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);        
    }

    for(let i=0;i<enemyList2.length;i++){
        ctx.drawImage(enemy2Image, enemyList2[i].x, enemyList2[i].y);        
    }

}

function main(){
    if(!gameOver){
        update(); //좌표값 업데이트
        render(); //그려주기
        requestAnimationFrame(main);
        // console.log("정의교 천재");
    }else{
        ctx.drawImage(gameOverImage,10,100,380,380);
    };
}

loadImage();
setupKeyboardListener();
createEnemy();
setTimeout(function() { 
    createEnemy2();
}, 3000);
main();

//방향키를 누르면
//우주선의 xy ,좌표가 바뀌고 
//다시 render 그려준다

//총알만들기
//1.스페이스바를 누르면 총알 발사
//2.총알이 발사 = 총알의 y값이 --, 
//  총알의 x좌표값 = 스페이스 누른 순간의 우주선의 x좌표값
//3.발사된 총알들은 총알 배열에 저장을 한다
//4.총알들은 x,y좌표값이 있어야 한다
//5.총알 배열을 가지고 render를 그려준다