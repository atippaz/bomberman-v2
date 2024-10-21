import { GameMapObject, Tag } from "../utils/gameManager";
import { initialMapCanvas } from "./pixi";

interface IMap {
  widthBlock: number;
  heightBlock: number;
  tileSize: number;
}
import Wall from "../asset/images/maps/Wall.png";
import BookBox from "../asset/images/maps/BookBox.png";
import TileBlue from "../asset/images/maps/TileBlue.png";
import Player from "../asset/images/player/Player_idle.gif";
import PlayerUp from "../asset/images/player/Player_Run_Up.gif";
import { Assets, Sprite } from "pixi.js";
export async function createMap(
  dom: HTMLElement,
  { heightBlock, tileSize, widthBlock }: IMap
) {
  const imagePaths = new Map<Tag | number, any>();
  imagePaths.set(Tag.WALL, await Assets.load(Wall));
  imagePaths.set(Tag.BOX, await Assets.load(BookBox));
  imagePaths.set(Tag.TILE, await Assets.load(TileBlue));
  imagePaths.set(-1, await Assets.load(Player));
  imagePaths.set(-1, await Assets.load(PlayerUp));
  const playerLocation = [
    { x: 2, y: 2 },
    // { x: 17, y: 9 },
  ];
  const height = tileSize * heightBlock;
  const width = tileSize * widthBlock;
  const appCanvas = await initialMapCanvas(dom, width, height);
  const gameControl = new GameMapObject({
    size: { height: 12, width: 20 },
    tileSize: tileSize,
    playerLocation: playerLocation,
  });

  gameControl.map.tile.tiles.forEach((tile) => {
    const texture = imagePaths.get(tile.tag);
    const tileSprite = new Sprite(texture);
    tileSprite.width = gameControl.map.tile.size;
    tileSprite.height = gameControl.map.tile.size;
    tileSprite.x = tile.location.x * gameControl.map.tile.size;
    tileSprite.y = tile.location.y * gameControl.map.tile.size;
    appCanvas.stage.addChild(tileSprite);
  });
  return;
}
