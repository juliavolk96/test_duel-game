import Bullet from "./Bullet";

class Hero {
  constructor(shootingFrequency, movementSpeed, color, x, y) {
    this.shootingFrequency = shootingFrequency;
    this.movementSpeed = movementSpeed;
    this.color = color;
    this.x = x;
    this.y = y;
    this.direction = 1;
    this.bullets = [];
    this.lastShotTime = 0;
    this.hitCount = 0;
    this.hasReversedDirection = false;
  }

  shoot(targetX, targetY) {
    const now = Date.now();
    if (now - this.lastShotTime >= this.shootingFrequency) {
      const angle = Math.atan2(targetY - this.y, targetX - this.x);
      const bullet = new Bullet(this.x + 20, this.y + 20, 4, angle, this.color);
      this.bullets.push(bullet);
      this.lastShotTime = now;
    }
  }

  move(canvasHeight, cursorX, cursorY) {
    this.y += this.movementSpeed * this.direction;

    if (this.y <= 0 || this.y + 40 >= canvasHeight) {
      this.direction *= -1;
    }

    const distanceToCursor = Math.hypot(this.x - cursorX, this.y - cursorY);

    if (distanceToCursor < 20 && !this.hasReversedDirection) {
      this.direction *= -1;
      this.hasReversedDirection = true;
    } else if (distanceToCursor >= 20) {
      this.hasReversedDirection = false;
    }
  }

  checkCollision(bullet) {
    const distance = Math.hypot(this.x - bullet.x, this.y - bullet.y);
    return distance < 20;
  }

  updateBullets(context, opponent, canvasWidth, canvasHeight) {
    this.bullets = this.bullets.filter(bullet => {
      bullet.move();
      bullet.draw(context);
      
      if (opponent.checkCollision(bullet)) {
        opponent.hitCount++;
        return false;
      }

      return !(bullet.x < 0 || bullet.x > canvasWidth || bullet.y < 0 || bullet.y > canvasHeight);
    });
  }

  draw(context, targetX, targetY, opponent, canvasWidth, canvasHeight, cursorX, cursorY) {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x + 20, this.y + 20, 20, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    this.updateBullets(context, opponent, canvasWidth, canvasHeight);
    this.shoot(targetX, targetY);
  }

  updateSettings(settings) {
    this.color = settings.bulletColor;
    this.movementSpeed = settings.movementSpeed;
    this.shootingFrequency = settings.shootingFrequency;
    this.updateBulletsColor();
  }

  updateBulletsColor() {
    this.bullets.forEach(bullet => {
      bullet.color = this.color;
    });
  }
}

export default Hero;