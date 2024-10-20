<template>
  <div
    ref="pixiContainer"
    style="background-color: aqua; width: 100%; height: 100%"
  ></div>
  <!-- <div  style="width: 100%"></div> -->
</template>

<script setup lang="ts">
import { Sprite, Assets, type ICanvas, Application } from "pixi.js";

import Wall from "../asset/images/maps/Wall.png";
import BookBox from "../asset/images/maps/BookBox.png";
import TileBlue from "../asset/images/maps/TileBlue.png";

import { onMounted, ref } from "vue";
const pixiContainer = ref<HTMLElement | null>(null);
const imagePaths = [Wall, BookBox, TileBlue];
onMounted(async () => {
  const app = new Application();
  const tileSize = 64;

  await app.init({
    width: 20 * tileSize,
    height: 12 * tileSize,
  });
  pixiContainer.value.appendChild(app.canvas);
  const rows = Math.ceil(app.renderer.height / tileSize);
  const cols = Math.ceil(app.renderer.width / tileSize);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const randomImage =
        imagePaths[Math.floor(Math.random() * imagePaths.length)];
      const texture = await Assets.load(randomImage);
      const tileSprite = new Sprite(texture);
      tileSprite.width = tileSize;
      tileSprite.height = tileSize;
      tileSprite.x = col * tileSize;
      tileSprite.y = row * tileSize;
      app.stage.addChild(tileSprite);
    }
  }

  //   bunny.x = app.renderer.width / 2;
  //   bunny.y = app.renderer.height / 2;
  //   bunny.anchor.x = 0.5;
  //   bunny.setSize(50, 50);
  //   bunny.anchor.y = 0.5;
  //   app.stage.addChild(bunny);
  //   app.ticker.add(() => {
  //     bunny.rotation += 0.01;
  //   });
});
</script>
