import {
  Application,
  Container,
  Assets,
  AnimatedSprite,
  Sprite,
  Point,
  MeshRope,
} from "pixi.js";
export function createContainer(tileSize: number = 50) {
  const container = new Container();
  container.width = tileSize;
  container.height = tileSize;
  return container;
}
export function createSprite(tileSize: number = 50) {
  const sprite = new Sprite();
  sprite.width = tileSize;
  sprite.height = tileSize;
  return sprite;
}

async function createBomEffect(x: number, y: number, tileSize: number = 50) {
  const explosionTextures = [];
  const container = createSpriteContainer(tileSize);

  const atlas = await Assets.load(
    "https://pixijs.com/assets/spritesheet/mc.json"
  );
  const maxFramerate = 12;
  for (let i = 0; i < maxFramerate; i++) {
    const texture = atlas.textures[`Explosion_Sequence_A ${i + 1}.png`];

    if (texture) {
      explosionTextures.push(texture);
    }
  }

  for (let i = 0; i < maxFramerate - 4; i++) {
    const explosion = new AnimatedSprite(explosionTextures);
    explosion.x = x;
    explosion.y = y;
    explosion.anchor.set(0.5);
    explosion.width = 50;
    explosion.height = 50;
    explosion.rotation = Math.random() * Math.PI;
    explosion.scale.set(0.75 + Math.random() * 0.5);
    explosion.gotoAndPlay((Math.random() * maxFramerate) | 0);

    container.addChild(explosion);
  }

  return container;
}

function clipInput(k, arr) {
  if (k < 0) k = 0;
  if (k > arr.length - 1) k = arr.length - 1;

  return arr[k];
}

function getTangent(k, factor, array) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function cubicInterpolation(array, t, tangentFactor = 1) {
  const k = Math.floor(t);
  const m = [
    getTangent(k, tangentFactor, array),
    getTangent(k + 1, tangentFactor, array),
  ];
  const p = [clipInput(k, array), clipInput(k + 1, array)];

  t -= k;
  const t2 = t * t;
  const t3 = t * t2;

  return (
    (2 * t3 - 3 * t2 + 1) * p[0] +
    (t3 - 2 * t2 + t) * m[0] +
    (-2 * t3 + 3 * t2) * p[1] +
    (t3 - t2) * m[1]
  );
}
export async function initial(dom: HTMLElement) {
  const app = new Application();
  await app.init({
    width: dom.clientWidth,
    height: dom.clientHeight,
    // backgroundColor: 0x2c3e50,
    // resizeTo: dom,
  });
  dom.appendChild(app.canvas);
  //   document.body.appendChild(app.canvas);
  //   initMouse(app);
  initGame(app);
}
async function initMouse(app: Application) {
  const trailTexture = await Assets.load("https://pixijs.com/assets/trail.png");
  const historyX = [];
  const historyY = [];
  const historySize = 20;
  const ropeSize = 100;
  const points = [];
  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }
  for (let i = 0; i < ropeSize; i++) {
    points.push(new Point(0, 0));
  }
  const rope = new MeshRope({ texture: trailTexture, points });
  rope.blendMode = "add";
  app.stage.addChild(rope);
  let mouseposition = null;
  app.stage.eventMode = "static";
  app.stage.hitArea = app.screen;
  app.stage.on("mousemove", (event) => {
    mouseposition = mouseposition || { x: 0, y: 0 };
    mouseposition.x = event.global.x;
    mouseposition.y = event.global.y;
  });
  app.ticker.add((ticker) => {
    if (!mouseposition) return;
    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);
    for (let i = 0; i < ropeSize; i++) {
      const p = points[i];

      const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
      const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

      p.x = ix;
      p.y = iy;
    }
  });
}

async function initGame(app: Application) {
  const texture2 = await Assets.load("https://pixijs.com/assets/flowerTop.png");
  const texture = await Assets.load(
    "https://pixijs.io/examples/examples/assets/bunny.png"
  );
  const bunny = new Sprite(texture);
  const textureButtonOver = await Assets.load(
    "https://pixijs.com/assets/button_down.png"
  );
  const textureButtonDown = await Assets.load(
    "https://pixijs.com/assets/button_over.png"
  );

  // Center the sprite's anchor point
  bunny.anchor.set(0.5);
  // Move the sprite to the center of the screen
  bunny.x = app.renderer.width / 2;
  bunny.y = app.renderer.height / 2;

  app.stage.addChild(bunny);
  const tileSize = 50;
  let targetX = bunny.x;
  let targetY = bunny.y;

  let isMoving = false;
  let isBomb = false;
  let bombCooldown = false;
  window.addEventListener("keydown", (event) => {
    if (event.key == " " && !isBomb && !bombCooldown) {
      isBomb = true;
    }
    if (isMoving) return;
    if (event.key == "ArrowLeft") {
      targetX -= tileSize;
      isMoving = true;
    } else if (event.key == "ArrowRight") {
      targetX += tileSize;
      isMoving = true;
    } else if (event.key == "ArrowUp") {
      targetY -= tileSize;
      isMoving = true;
    } else if (event.key == "ArrowDown") {
      targetY += tileSize;
      isMoving = true;
    }
  });
  // Listen for animate update
  const speed = 5;
  app.ticker.add(async function (ticker) {
    if (isBomb && !bombCooldown && !isMoving) {
      const bomb = new Sprite(textureButtonDown);
      bomb.anchor.set(0.5);
      bomb.x = bunny.x;
      bomb.y = bunny.y;
      bomb.width = 50;
      bomb.height = 50;
      app.stage.addChild(bomb);
      bombCooldown = true;
      isBomb = false;
      setTimeout(async () => {
        bomb.texture = textureButtonOver;
        const bomEffect1 = await createBomEffect(bomb.x + 50, bomb.y);
        const bomEffect2 = await createBomEffect(bomb.x - 50, bomb.y);
        const bomEffect3 = await createBomEffect(bomb.x, bomb.y + 50);
        const bomEffect4 = await createBomEffect(bomb.x, bomb.y - 50);
        const bomEffect5 = await createBomEffect(bomb.x, bomb.y);

        setTimeout(async () => {
          app.stage.removeChild(bomb);
          bomb.destroy();
          app.stage.addChild(bomEffect1);
          app.stage.addChild(bomEffect2);
          app.stage.addChild(bomEffect3);
          app.stage.addChild(bomEffect4);
          app.stage.addChild(bomEffect5);
        }, 500);

        setTimeout(() => {
          app.stage.removeChild(bomEffect1);
          bomEffect1.destroy();
          app.stage.removeChild(bomEffect2);
          bomEffect2.destroy();
          app.stage.removeChild(bomEffect3);
          bomEffect3.destroy();
          app.stage.removeChild(bomEffect4);
          bomEffect4.destroy();
          app.stage.removeChild(bomEffect5);
          bomEffect5.destroy();
        }, 1000);
      }, 2000);
      setTimeout(() => {
        bombCooldown = false;
      }, 700);
    }
    if (!isMoving) {
      bunny.texture = texture;
    } else {
      bunny.texture = texture2;
    }
    bunny.width = 50;
    bunny.height = 50;
    if (!isMoving) return;
    isMoving = bunny.x != targetX || bunny.y != targetY;
    if (bunny.x != targetX) {
      bunny.x += bunny.x > targetX ? -speed : speed;
    } else {
      bunny.y += bunny.y > targetY ? -speed : speed;
    }
    // Rotate mr rabbit clockwise
    // bunny.x += 0.1 * ticker.deltaTime;
  });
}
