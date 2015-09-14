import {app, numberField, button, clicked} from "./framework";

app("body", () => {
	numberField("counter", 0);
	button("count", "Click me");

	clicked("count")
		.set("counter", (input) => input + 1);
});
