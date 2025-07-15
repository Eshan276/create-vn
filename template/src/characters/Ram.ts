import { Character } from "easyvn";

const Ram = new Character("Ram", {
  defaultSprite: "smile",  //choose from the sprites below
  sprites: {
    smile: "ram_smile.png",
    angry: "ram_angry.png",
  },
});

export default Ram;
