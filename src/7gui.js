import {numberField, button, clicked} from "./framework";

//FIXME: hide bootstrapping
//TODO: lifecycle (mount/unmount to prevent memory leaks)
function run() {
	numberField("counter", 0);
	button("count", "Click me");

	clicked("count")
    .set("counter", (input) => input + 1);
}

window.run = run;