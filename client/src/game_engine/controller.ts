type KeyHandler = () => void;

interface Key {
  value: string;
  isDown: boolean;
  isUp: boolean;
  press?: KeyHandler;
  release?: KeyHandler;
  downHandler: (event: KeyboardEvent) => void;
  upHandler: (event: KeyboardEvent) => void;
  unsubscribe: () => void;
}

export function keyboard(value: string): Key {
  const key: Key = {
    value: value,
    isDown: false,
    isUp: true,
    press: undefined,
    release: undefined,
    // The `downHandler`
    downHandler: (event: KeyboardEvent) => {
      console.log(event.key);
      if (event.key === key.value) {
        if (key.isUp && key.press) {
          key.press();
        }
        key.isDown = true;
        key.isUp = false;
        event.preventDefault();
      }
    },
    // The `upHandler`
    upHandler: (event: KeyboardEvent) => {
      if (event.key === key.value) {
        if (key.isDown && key.release) {
          key.release();
        }
        key.isDown = false;
        key.isUp = true;
        event.preventDefault();
      }
    },
    // Detach event listeners
    unsubscribe: () => {
      window.removeEventListener("keydown", downListener);
      window.removeEventListener("keyup", upListener);
    },
  };

  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  // Attach event listeners
  window.addEventListener("keydown", downListener, false);
  window.addEventListener("keyup", upListener, false);

  return key;
}
