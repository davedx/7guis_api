import * as G from "./g";

//FIXME: hide bootstrapping
function run() {
	G.numberField("counter");
	G.button("count"); //TODO

	G.clicked("count") //TODO
    .set("counter", () => this.value + 1);
}

window.run = run;