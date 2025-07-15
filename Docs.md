# 🛠️ Developer Documentation

## 📁 Project Structure

The `create-vn` tool scaffolds a visual novel project with the following structure:

```
my-test-game/
├── index.html
├── style.css
├── tsconfig.json
├── vite.config.ts
├── package.json
├── public/
│   └── assets/
│       ├── backgrounds/
│       │   └── school_day.jpg
│       └── characters/
│           ├── character_smile.png
│           └── character_angry.png
├── src/
│   ├── characters/
│   │   └── Ram.ts
│   ├── scenes/
│   │   ├── scene1.ts
│   │   └── scene2.ts
│   └── main.ts
```

---

## 📄 File & Class Documentation

### `src/characters/Ram.ts`

Defines and exports a character instance using the `Character` class from `easyvn`.

```typescript
import { Character } from "easyvn";

const Ram = new Character("Ram", {
    defaultSprite: "smile", // This must be a key from the `sprites` object
    sprites: {
        smile: "ram_smile.png",
        angry: "ram_angry.png",
    },
});

export default Ram;
```

---

### `Character` Class (from `easyvn`)

```typescript
export class Character {
    constructor(name: string, options: CharacterOptions);

    appear(options?: { orientation?: "left" | "right" | "center" }): this;
    talk(text: string): this;
    move(px: number): this;
    changeSprite(spriteKey: string): this;
}
```

#### Properties:
- **`name`**: Character name displayed in dialogue.
- **`sprites`**: A map of sprite keys to filenames.
- **`currentSprite`**: The current sprite key (not the filename).
- **`orientation`**: Screen position of the character (`left`, `center`, `right`).

#### Methods:
- **`appear()`**: Displays the character on screen with a sprite and optional orientation.
- **`talk(text)`**: Sets the speaker name and dialogue content.
- **`move(px)`**: Moves the character image horizontally (in %).
- **`changeSprite(spriteKey)`**: Changes the character's displayed sprite.

---

### `src/scenes/scene1.ts`

```typescript
import Ram from "../characters/Ram";
import { waitClick, showChoice, gotoScene } from "easyvn";
import { route, goto, runNextRouteIfAny } from "easyvn";

export const metadata = {
    background: "school_day.jpg",
};

export default async function scene1() {
    Ram.appear({ orientation: "left" });
    await waitClick();

    Ram.talk("Welcome!");
    await waitClick();

    route("#stay", async () => {
        Ram.talk("Thanks for staying!");
        await waitClick();
    });

    await showChoice([
    ["Go to Scene 2", () => jumpToScene("scene2")],
    ["Stay here", () => goto("#stay")],
    ]);

    Ram.talk("You stayed! Let's continue.");
    await waitClick();
}
```

---

### `src/scenes/scene2.ts`

```typescript
import Ram from "../characters/Ram";
import { waitClick } from "easyvn";

export const metadata = {
    background: "school_day.jpg",
};

export default async function scene2() {
    Ram.appear({ orientation: "right" });
    await waitClick();

    Ram.talk("You've made it to Scene 2.");
    await waitClick();

    Ram.changeSprite("angry").talk("I hope you're ready for more!");
    await waitClick();

    Ram.talk("That's all for now. Bye!");
    await waitClick();
}
```

---

### `src/main.ts`

```typescript
import { registerScene, startScene } from "easyvn";
import scene1, { metadata as meta1 } from "./scenes/scene1";
import scene2, { metadata as meta2 } from "./scenes/scene2";

// Register scenes with their metadata
registerScene("scene1", scene1, meta1);
registerScene("scene2", scene2, meta2);

// Start the first scene
startScene("scene1");
```

---

## 🚀 How to Use

### 🧪 Local Dev Setup

1. Run the CLI to scaffold a new project:
     ```bash
     npx create-vn my-test-game
     ```

2. Navigate to your project:
     ```bash
     cd my-test-game
     ```

3. Install dependencies:
     ```bash
     npm install
     ```

4. Run the game:
     ```bash
     npm run dev
     ```
