import turtle
import time
import random

delay = 0.1
score = 0
high_score = 0

# creating window screen
wn = turtle.Screen()
wn.title("snacke game")
wn.bgcolor("blue")
wn.setup(width=600, height=600)
wn.cv._rootwindow.resizable(False, False)
wn.tracer(0)

# head of snacke
head = turtle.Turtle()
head.shape("square")
head.color("white")
head.penup()
head.speed(0)
head.goto(0, 0)
head.direction = "stop"

# food in the game
food = turtle.Turtle()
colors = random.choice(["red", "black", "green"])
shapes = random.choice(["circle", "square"])
food.color(colors)
food.shape(shapes)
food.penup()
food.speed(0)
food.goto(0, 100)

pen = turtle.Turtle()
pen.shape("square")
pen.color("white")
pen.penup()
pen.speed(0)
pen.goto(0, 250)
pen.hideturtle()
pen.write("score: 0  High score: 0", align="center",
          font=("Arial", 24, "bold"))

# assigning key directions


def goup():
    if head.direction != "down":
        head.direction = "up"


def godown():
    if head.direction != "up":
        head.direction = "down"


def goleft():
    if head.direction != "right":
        head.direction = "left"


def goright():
    if head.direction != "left":
        head.direction = "right"


def move():
    if head.direction == "up":
        y = head.ycor()
        head.sety(y + 20)

    if head.direction == "down":
        y = head.ycor()
        head.sety(y - 20)

    if head.direction == "right":
        x = head.xcor()
        head.setx(x + 20)

    if head.direction == "left":
        x = head.xcor()
        head.setx(x - 20)


# key binding
wn.listen()
wn.onkeypress(goup, "Up")
wn.onkeypress(godown, "Down")
wn.onkeypress(goleft, "Left")
wn.onkeypress(goright, "Right")

segments = []


# game loop
while True:
    wn.update()

    if (
        head.xcor() > 290
        or head.xcor() < -290
        or head.ycor() > 290
        or head.ycor() < -290
    ):
        time.sleep(1)
        head.goto(0, 0)
        head.direction = "stop"
        colors = random.choice(["red", "black", "green"])
        shapes = random.choice(["circle", "square"])
        food.color(colors)
        food.shape(shapes)
        for segment in segments:
            segment.goto(1000, 1000)

        segments.clear()
        score = 0
        delay = 0.1
        pen.clear()
        pen.write(
            "score: {}  high score: {}".format(score, high_score),
            align="center",
            font=("Arial", 24, "bold")
        )
    # checking for head collisions with food
    if head.distance(food) < 20:
        x = random.randint(-270, 270)
        y = random.randint(-270, 270)
        food.goto(x, y)

        # adding segment
        new_segment = turtle.Turtle()
        new_segment.shape("square")
        new_segment.color("orange")
        new_segment.speed(0)
        new_segment.penup()

        new_segment1 = turtle.Turtle()
        new_segment2 = turtle.Turtle()
        new_segment1.shape("square")
        new_segment2.shape("square")
        new_segment1.color("orange")
        new_segment2.color("orange")
        new_segment1.speed(0)
        new_segment2.speed(0)
        new_segment1.penup()
        new_segment2.penup()

        segments.append(new_segment)
        segments.append(new_segment1)
        segments.append(new_segment2)
        delay -= 0.001
        score += 10
        if score > high_score:
            high_score = score
        pen.clear()
        pen.write(
            "score: {}  high score: {}".format(score, high_score),
            align="center",
            font=("Arial", 24, "bold")
        )

    for index in range(len(segments) - 1, 0, -1):
        x = segments[index - 1].xcor()
        y = segments[index - 1].ycor()
        segments[index].goto(x, y)
    if len(segments) > 0:
        x = head.xcor()
        y = head.ycor()
        segments[0].goto(x, y)

    move()

    for segment in segments:
        if segment.distance(head) < 20:
            time.sleep(1)
            head.goto(0, 0)
            head.direction = "stop"
            colors = random.choice(["red", "black", "green"])
            shapes = random.choice(["circle", "square"])
            food.color(colors)
            food.shape(shapes)
            for segment in segments:
                segment.goto(1000, 1000)

            segments.clear()
            score = 0
            delay = 0.1
            pen.clear()
            pen.write(
                "score: {}  high score: {}".format(score, high_score),
                align="center",
                font=("Arial", 24, "bold")
            )
    time.sleep(delay)
