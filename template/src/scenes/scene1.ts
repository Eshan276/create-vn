import Ram from "../characters/Ram";
import { waitClick, showChoice, gotoScene, jumpToScene } from "easyvn";
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

  // ❗ This will only run if user picked "Stay here"
  Ram.talk("You stayed! Let's continue.");
  await waitClick();
}
