<template>
  <div style="display: flex; justify-items: center; width: 100%; height: 100%">
    <div ref="pixiContainer" style="width: 100%; height: 100%"></div>
  </div>
  <!-- <audio autoplay loop>
    <source :src="GameTheme" />
  </audio> -->
  <!-- <div  style="width: 100%"></div> -->
</template>

<script setup lang="ts">
import { Sprite, Assets, Application } from "pixi.js";

import Wall from "../asset/images/maps/Wall.png";
import BookBox from "../asset/images/maps/BookBox.png";
import TileBlue from "../asset/images/maps/TileBlue.png";
import Player from "../asset/images/player/Player_idle.gif";
import PlayerUp from "../asset/images/player/Player_Run_Up.gif";

import "@pixi/gif";
import { onMounted, ref } from "vue";
// import GameTheme from "../asset/sounds/Sounds/Bgm/GameTheme.wav";
import { GameMapObject, Tag } from "../utils/gameManager";
import { createMap } from "../game_engine";
const pixiContainer = ref<HTMLElement | null>(null);
const imagePaths = new Map<Tag | number, any>();
imagePaths.set(Tag.WALL, await Assets.load(Wall));
imagePaths.set(Tag.BOX, await Assets.load(BookBox));
imagePaths.set(Tag.TILE, await Assets.load(TileBlue));
imagePaths.set(-1, await Assets.load(Player));
imagePaths.set(-1, await Assets.load(PlayerUp));

onMounted(async () => {
  // const app = new Application();
  const tileSize = 50;
  createMap(pixiContainer.value, {
    heightBlock: 12,
    widthBlock: 20,
    tileSize: tileSize,
  });
  // initial(pixiContainer.value);
  // await app.init({
  //   width: 20 * tileSize,
  //   height: 12 * tileSize,
  // });
  // const playerLocation = [
  //   { x: 2, y: 2 },
  //   // { x: 17, y: 9 },
  // ];
  // pixiContainer.value.appendChild(app.canvas);
  // const gameControl = new GameMapObject({
  //   size: { height: 12, width: 20 },
  //   tileSize: tileSize,
  //   playerLocation: playerLocation,
  // });

  // gameControl.map.tile.tiles.forEach((tile) => {
  //   const texture = imagePaths.get(tile.tag);
  //   const tileSprite = new Sprite(texture);
  //   tileSprite.width = gameControl.map.tile.size;
  //   tileSprite.height = gameControl.map.tile.size;
  //   tileSprite.x = tile.location.x * gameControl.map.tile.size;
  //   tileSprite.y = tile.location.y * gameControl.map.tile.size;
  //   app.stage.addChild(tileSprite);
  // });

  // // for (const tile of gameControl.map.tile.tiles) {
  // //   const texture = imagePaths.get(tile.tag);
  // //   const tileSprite = new Sprite(texture);
  // //   tileSprite.width = gameControl.map.tile.size;
  // //   tileSprite.height = gameControl.map.tile.size;
  // //   tileSprite.x = tile.location.x * gameControl.map.tile.size;
  // //   tileSprite.y = tile.location.y * gameControl.map.tile.size;
  // //   app.stage.addChild(tileSprite);
  // // }

  // playerLocation.forEach(async (location) => {
  //   const texture = await Assets.load(Player);
  //   const playerSprite = new Sprite(texture);
  //   playerSprite.width = gameControl.map.tile.size;
  //   playerSprite.height = gameControl.map.tile.size;
  //   playerSprite.x = location.x * gameControl.map.tile.size;
  //   playerSprite.y = location.y * gameControl.map.tile.size;

  //   app.stage.addChild(playerSprite);
  //   const left = keyboard("ArrowLeft"),
  //     up = keyboard("ArrowUp"),
  //     right = keyboard("ArrowRight"),
  //     down = keyboard("ArrowDown");

  //   //Left arrow key `press` method
  //   left.press = () => {
  //     //Change the cat's velocity when the key is pressed
  //     playerSprite.x = -50;
  //     playerSprite.y = 0;
  //   };

  //   //Left arrow key `release` method
  //   left.release = () => {
  //     //If the left arrow has been released, and the right arrow isn't down,
  //     //and the cat isn't moving vertically:
  //     //Stop the cat
  //     if (!right.isDown && playerSprite.x === 0) {
  //       playerSprite.x = 0;
  //     }
  //   };

  //   // //Up
  //   // up.press = () => {
  //   //   cat.vy = -5;
  //   //   cat.vx = 0;
  //   // };
  //   // up.release = () => {
  //   //   if (!down.isDown && cat.vx === 0) {
  //   //     cat.vy = 0;
  //   //   }
  //   // };

  //   // //Right
  //   // right.press = () => {
  //   //   cat.vx = 5;
  //   //   cat.vy = 0;
  //   // };
  //   // right.release = () => {
  //   //   if (!left.isDown && cat.vy === 0) {
  //   //     cat.vx = 0;
  //   //   }
  //   // };

  //   // //Down
  //   // down.press = () => {
  //   //   cat.vy = 5;
  //   //   cat.vx = 0;
  //   // };
  //   // down.release = () => {
  //   //   if (!up.isDown && cat.vx === 0) {
  //   //     cat.vy = 0;
  //   //   }
  //   // };
  // });
  // console.log(app.stage.children);
});
</script>
