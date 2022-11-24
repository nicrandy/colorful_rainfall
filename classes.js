const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

// create an array of colors with rgba values
const colors = [
    'rgba(255, 0, 0,',
    'rgba(0, 255, 0,',
    'rgba(0, 0, 255,',
    'rgba(255, 255, 0,',
    'rgba(255, 0, 255,',
    'rgba(0, 255, 255,'
];

class Ball {
    constructor(x, y, radius, color) {
        this.timeCreated = Date.now();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = 1;
        this.fadingColor;
    }

    draw() {
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.fadingColor;
        ctx.fill();
    }

    shake() {
        // this.x += Math.random() * 10 ;
        this.y += 2;
        // randomly move the x left or right
        this.x += Math.random() * 6 - 3;
    }
    adjustAlpha() {
        // randomly adjust alpha to -0.01 or -0.02
        this.alpha -= Math.random() * 0.004;
        this.fadingColor = this.color + this.alpha + ')';
    }
    shrinkRadius() {
        const radiusToShrink = 0.05
        if (this.radius >= radiusToShrink) {
            this.radius -= Math.random() * radiusToShrink;
        }
    }
}

Ball.instances = [];

function drawBalls() {
    let x = Math.random() * window.innerWidth;
    let y = -50;
    let radius = Math.random() * 20 + 10;
    let red = Math.floor(Math.random() * 255);
    let green = Math.floor(Math.random() * 255);
    let blue = Math.floor(Math.random() * 255);
    const color = 'rgba(' + red + ',' + green + ',' + blue + ',' ;
    // const color = colors[Math.floor(Math.random() * ballColors.length)];
    const ball = new Ball(x, y, radius, color);
    Ball.instances.push(ball);
    for (let i = 0; i < Ball.instances.length; i++) {
        if (Ball.instances[i].timeCreated % 2 === 0) {
            console.log('timeCreated', Ball.instances[i].timeCreated);
            Ball.instances[i].shrinkRadius();
        }
        else {
            console.log('------timeCreated', Ball.instances[i].timeCreated);
            Ball.instances[i].adjustAlpha();
        }
        Ball.instances[i].shake();
        Ball.instances[i].draw();
        if (Ball.instances[i].y > window.innerHeight * 1.1) {
            Ball.instances.splice(i, 1);
        }
    }
}

setInterval(drawBalls, 10);



