import { Character } from "easyvn";

const Ram = new Character("Ram", {
  defaultSprite: "ram_smile.png",
  sprites: {
    smile: "ram_smile.png",
    angry: "ram_angry.png",
  },
});

export default Ram;
