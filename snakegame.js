let can = document.querySelector("#can");
let ctx = can.getContext("2d");

can.width = 900;
can.height = 900;

function DrawCir(X, Y, R) {
    ctx.beginPath();
    ctx.arc(X, Y, R, 0, Math.PI * 2);
    ctx.fillStyle = foodCol;
    ctx.fill();
}

function DrawSquare(X, Y, W, C) {
    ctx.fillStyle = C;
    ctx.fillRect(X - W * 0.5, Y - W * 0.5, W, W);
}

let head = {
    x: can.width * 0.5,
    y: can.height * 0.5,
    w: 30,
    c: "white"
}

let food = {
    x: can.width * 0.5,
    y: can.height * 0.5 - 100,
    r: 10
}

let speed = 15;
let foodCol = ["red", "black", "green"][Math.floor(Math.random() * 3)];
let foodShape = Math.random() > 0.5 ? "circle" : "square";

let direction = "";
let segment = [];

function Reset() {
    head["x"] = can.width * 0.5;
    head["y"] = can.height * 0.5;

    food["x"] = can.width * 0.5;
    food["y"] = can.height * 0.5 - 100;

    direction = "";
    segment = [];

    SetScore(true);
    foodCol = ["red", "black", "green"][Math.floor(Math.random() * 3)];
    foodShape = Math.random() > 0.5 ? "circle" : "square";

    Draw();
}

window.addEventListener("keydown", e => {
    if (e.key === "ArrowDown" && direction !== "TOP") direction = "DOWN";
    else if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
})

function Move() {
    switch (direction) {
        case "DOWN":
            head["y"] += speed
            break;
        case "UP":
            head["y"] -= speed
            break;
        case "LEFT":
            head["x"] -= speed
            break;
        case "RIGHT":
            head["x"] += speed
            break;
    }
}

let score = document.querySelector(".score");
let highscore = document.querySelector(".high");
function SetScore(Reset = false) {
    if (Reset) score.innerHTML = "0";
    else {
        score.innerHTML++;
        if (+score.innerHTML > +highscore.innerHTML) highscore.innerHTML = score.innerHTML;
    }
}

function IsEat() {
    let x = head["x"] - food["x"];
    let y = head["y"] - food["y"];
    let long = food["r"] + head["w"] * 0.5;

    let dist = Math.sqrt(x * x + y * y);

    if (dist < long) return true;
    return false;
}

function IsBump() {
    segment.forEach(seg => {
        let x = seg["x"] - head["x"];
        let y = seg["y"] - head["y"];
        let long = head["w"];
        let dist = Math.sqrt(x * x + y * y);

        if (long > dist) return true;
    })

    return false;
}

function Draw() {
    ctx.clearRect(0, 0, can.width, can.height);

    foodShape == "circle" ? DrawCir(food["x"], food["y"], food["r"], foodCol) : DrawSquare(food["x"], food["y"], food["r"] * 2);

    if (IsEat()) {
        food["x"] = Math.floor(Math.random() * (can.width - (food["r"] * 2)) + food["r"]);
        food["y"] = Math.floor(Math.random() * (can.height - (food["r"] * 2)) + food["r"]);
        SetScore();

        segment.push({
            x: 1000,
            y: 1000,
            w: head["w"],
            c: "orange"
        });

    }

    segment.forEach(seg => DrawSquare(seg["x"], seg["y"], seg["w"], seg["c"]));

    for (let i = segment.length - 1; i > 0; i--) {
        segment[i]["x"] = segment[i - 1]["x"];
        segment[i]["y"] = segment[i - 1]["y"];

    }
    if (segment.length > 0) {
        segment[0]["x"] = head["x"];
        segment[0]["y"] = head["y"];
    }


    Move();
    DrawSquare(head["x"], head["y"], head["w"], head["c"]);

    if (
        head["x"] - head["w"] * 0.5 < 0 ||
        head["x"] + head["w"] * 0.5 > 900 ||
        head["y"] - head["w"] * 0.5 < 0 ||
        head["y"] + head["w"] * 0.5 > 900 ||
        IsBump()
    ) {
        console.log("Game Over!");
        setTimeout(_ => Reset(), 2000);
    }
    else requestAnimationFrame(Draw);
}
Draw();
