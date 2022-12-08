"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const ballsAmount = 10;
let balls = [];

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const y = width * 0.2;

class Ball {
  constructor(x, y, speedX, speedY, radius, color) {
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.radius = radius;
    this.color = color;
  }

  drawBall() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  updateBall() {
    if (this.x + this.radius >= width || this.x - this.radius <= 0) {
      this.speedX = -this.speedX;
    }

    if (this.y + this.radius >= height || this.y - this.radius <= 0) {
      this.speedY = -this.speedY;
    }

    this.x += this.speedX;
    this.y += this.speedY;
  }

  // removeBallFromArr() {
  //   balls = balls.filter((ball) => {
  //     return (
  //       Math.hypot(playerBall.x - ball.x, playerBall.y - ball.y) >=
  //       playerBall.radius + ball.radius
  //     );
  //   });
  // }
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

while (balls.length < ballsAmount) {
  const radius = random(8, 12);
  const ball = new Ball(
    random(radius, width - radius),
    random(radius, height - radius),
    random(-1, 1),
    random(-1, 1),
    radius,
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
  );
  balls.push(ball);
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

drawLine(balls[0].x, balls[0].y, balls[1].x, balls[1].x);
function loop() {
  ctx.fillStyle = "bisque";
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].drawBall();
    balls[i].updateBall();
    // balls[i].removeBallFromArr();
    if (balls[i + 1] !== undefined) {
      drawLine(balls[i].x, balls[i].y, balls[i + 1].x, balls[i + 1].y);
    }
  }

  requestAnimationFrame(loop);
}
loop();
