import scene1, { metadata as meta1 } from "./scenes/scene1";
import scene2, { metadata as meta2 } from "./scenes/scene2"; // Add this
import { registerScene, startScene } from "easyvn";

registerScene("scene1", scene1, meta1);
registerScene("scene2", scene2, meta2); //  Register here

window.onload = () => {
  startScene("scene1");
};
