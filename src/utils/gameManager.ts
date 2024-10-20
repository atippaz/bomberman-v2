class GameMap {
  width: number;
  height: number;
  tile: TileMap;
  constructor() {
    this.tile = {
      size: 0,
      tiles: [],
    };
    this.width = 0;
    this.height = 0;
  }
}
interface TileMap {
  size: number;
  tiles: Tile[];
}
interface MapOption {
  size: {
    width: number;
    height: number;
  };
  tileSize: number;
  playerLocation: Location[];
}
interface Location {
  x: number;
  y: number;
}

export class GameMapObject {
  map: GameMap;
  playerLocation: Location[];
  constructor(option: MapOption) {
    this.map = new GameMap();
    this.initializeMap(option);
  }
  private async initializeMap(option: MapOption) {
    this.createMap(option);
    this.crateWall();
    this.crateObject();
  }
  private createMap(option: MapOption) {
    const { size, tileSize, playerLocation } = option;
    this.map.width = size.width;
    this.map.height = size.height;
    this.map.tile.size = tileSize;
    this.playerLocation = playerLocation;
    for (let i = 0; i < size.height; i++) {
      for (let j = 0; j < size.width; j++) {
        const tile = new Tile();
        tile.location = {
          x: j,
          y: i,
        };
        this.map.tile.tiles.push(tile);
      }
    }
  }
  private crateWall() {
    this.map.tile.tiles.forEach((tile) => {
      if (
        tile.location.x === 0 ||
        tile.location.y === 0 ||
        tile.location.x === this.map.width - 1 ||
        tile.location.y === this.map.height - 1
      ) {
        tile.tag = Tag.WALL;
      } else {
        tile.tag = Tag.TILE;
      }
    });
  }
  private isAroundPlayer(playerLocation: Location, tile: Tile) {
    const { x, y } = playerLocation; // ตำแหน่งของผู้เล่น

    // ตรวจสอบว่าตำแหน่ง tile อยู่ในพื้นที่ 3x3 รอบตัวผู้เล่น
    return (
      tile.location.x >= x - 1 &&
      tile.location.x <= x + 1 &&
      tile.location.y >= y - 1 &&
      tile.location.y <= y + 1
    );
  }
  private crateObject() {
    this.map.tile.tiles.forEach((tile, index) => {
      if (tile.tag === Tag.WALL) return;
      const ran = Math.floor(Math.random() * 3);
      if (this.playerLocation.some((x) => this.isAroundPlayer(x, tile))) return;
      if (this.map.tile.tiles[index - 1].tag == Tag.WALL) {
        tile.tag = ran == 0 ? Tag.BOX : Tag.TILE;
      } else {
        tile.tag = ran == 0 ? Tag.BOX : ran == 1 ? Tag.TILE : Tag.WALL;
      }
    });
  }
}
export enum Tag {
  WALL,
  BOX,
  PLAYER,
  TILE,
}
class Tile {
  tag: Tag;
  location: Location;
}
