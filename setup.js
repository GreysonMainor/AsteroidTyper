

    /* eslint-disable no-undef */
const WORDS = ["game", "day", "java", "script", "rainbow", "program", "bunny", "youtube", "github", "terminator", "slicer", "ninja", "cow", "robot", "zoom", "peanuts", "jack", "brain", "storm"];
var focus;
var field = [];
var score = 0;
var planetCrust;
var planetMantle;
var ship;
var button;
var drawing = false;




function setup() {
    var canvas = createCanvas(800,500)
    //createCanvas(500,500)
    canvas.parent("root")
    planetCrust = randomColor();
    planetMantle = randomColor();
    ship = randomColor();
    focus=null;
    var drawButton = createButton("Start Game")
    drawButton.mousePressed(startGame)
    var resetButton = createButton("Reset")
    resetButton.mousePressed(reset)
}


function draw() {
    if (drawing) {
    background(51);
    drawBase();
    drawLazer();
    drawScore();
    handleField();
    }
}


function startGame() {
    drawing = true
    field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), randomColor()));
}

function reset() {
    planetCrust = randomColor();
    planetMantle = randomColor();
    ship = randomColor();
    focus=null;
    location.reload();
}



function handleField() {

    for (var i = field.length - 1; i >= 0; i--) {
        field[i].update();
        if (field[i].intact) {
            field[i].draw();
        } else {
            score += field[i].text.length;
            field.splice(i, 1);
            focus = null;
        }
    }

    if (frameCount % 60 === 0) {
        if (random() > map(score, 0, 1000, 0.8, 0.01)) {
            field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), randomColor()));
        }
    }
}

function keyPressed() {
    if (focus) {
        focus.erode(keyCode);
    } else {
        focus = findAsteroid(keyCode, field);
        if (focus) {
            focus.erode(keyCode);
        };
    };
};


function drawBase() {
    fill(planetMantle);
    stroke(planetCrust);
    strokeWeight(5);
    rect(0, height - 15, width, height);
    fill(ship);
    stroke(255);
    beginShape();
    vertex(width / 2 - 20, height);
    vertex(width / 2, height - 50);
    vertex(width / 2 + 20, height);
    endShape(CLOSE);
}

function drawLazer() {
    if (!focus)
        return;
    stroke(randomColor());
    strokeWeight(focus.completedText.length); 
    line(width / 2, height - 50, focus.position.x, focus.position.y);
    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(30);
    text(focus.completedText, 10, height - 40);
}


function drawScore() {
    textAlign(RIGHT);
    noStroke();
    textSize(30);
    fill(255);
    text(score, 50, height / 2);
}

function randomColor() {
    return color(random(255), random(255), random(255));
}

function endGame() {
    noLoop();
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(80);
    text("Game Over!", width / 2, height / 2);
}
