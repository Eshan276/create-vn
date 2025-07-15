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

  Ram.changeSprite("angry").talk("I hope you’re ready for more!");
  await waitClick();

  Ram.talk("That's all for now. Bye!");
  await waitClick();
}
