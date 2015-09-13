import {numberField, button, clicked} from "./g";

//FIXME: hide bootstrapping
function run() {
	numberField("counter", 0);
	button("count", "Click me");

	clicked("count")
    .set("counter", (input) => input + 1);
}

window.run = run;