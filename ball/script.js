var cvs = document.getElementById("canvas"); //Определили холст на котором будем творить
var ctx = cvs.getContext("2d"); //Определили контекст холста

// Определяем картиночки!
var ball = new Image(); 
var bg = new Image();
var pad = new Image();

// Через src определяем путь, 
// убедитесь что расширение картинок такое же, как вы и скачали! (png, jpg, jpeg, gif)

ball.src = "ball.png"
bg.src = "bg.png"
pad.src = "pad.png"

//Points
var Points = 0;

//Описание платформы
var padX = 300; //Координаты платформы по Х
var padY = 650; //Координаты платформы по Y
var padWidth= 200;  //Ширина платформы
var padHeight = 50; //Высота платформы

var xPos = 0; //Координаты мяча по Х
var yPos = 0; //Координаты мяча по Y

//Эти переменные означают скорость мяча
var grav = 0; //По вертикали
var gravSide = 0; //По горизонтали



//Событие, если мы нажмём на клавишу А
document.addEventListener("keydown", function(event){
    if (event.code == 'KeyA'){
        movePadLeft(); //Мы сдвинем платформу влево
    }
    if (event.code == 'ArrowLeft'){
        movePadLeft();
    }
});

//Событие, если мы нажмём на клавишу D
document.addEventListener("keydown", function(event){
    if (event.code == 'KeyD'){
        movePadRight(); //Мы сдвинем платформу вправо
    }
    if (event.code == 'ArrowRight'){
        movePadRight();
    }
});

function movePadLeft(){
    padX -= 20; //Мы поменяем координату платформы. При выполнении платформа удет на 20 пикселей влево
}

function movePadRight(){
    padX += 20; //А здесь на 20 пикселей вправо
}

//Как мяч будет отталкиваться от стен
function bounce(){
        if(yPos+ball.height > cvs.height){  //Если мяч коснётся пола
            cvs.parentNode.removeChild(cvs);
            alert("Game Over!")
            location.href = "https://youtu.be/w0h4YNI_aHI?t=17";
        }
        if(yPos < 0){ //Если мяч коснётся потолка
            grav = -grav; //Мяч обратно поедет вниз
        }

        if(xPos+ball.width > cvs.width){ //Если мяч коснулся стены
           
            gravSide = -gravSide; //Мяч отобъёт в бок

        }
        if(xPos < 0){ //Если мяч коснулся стены
            gravSide = -gravSide; //Мяч отобъёт в бок
        }
        
        //Логика отбивания мяча от платформы
        if(yPos+ball.height > padY && (xPos > padX && xPos < padX + padWidth || (xPos+ball.width > padX && xPos+ball.width < padX + padWidth))){
            grav = -grav;
            ++Points
            document.getElementById("points").innerHTML = "Score: " + Points
        }
}

//Рисуем!
function draw(){
    ctx.drawImage(bg, 0, 0); //Использум наш задний фон (картинку)
    ctx.drawImage(ball, xPos, yPos); //Картиночка мяча. xPos и yPos - положение мяча
    ctx.fillRect(padX,padY,padWidth,padHeight); //Создали платформу
    ctx.fillStyle = "#127462"; //Цвет платформы

    yPos += grav; //Мяч будет вечно летать
    xPos += gravSide; //Мяч будет вечно летать
    
    requestAnimationFrame(draw); //Говорим, что будет происходить анимация
    requestAnimationFrame(bounce); //Говорим, что будет происходить анимация
}

//Пропишем, что прорисовка будет происходить при загрузке всех картиночек
bg.onload = draw;
ball.onload = draw;
pad.onload = draw;