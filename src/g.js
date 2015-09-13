
let controls = {};

function makeControl(opts) {
	let input = document.createElement("input");
	input.attributes.id = opts.id;
	controls[opts.id] = input;
	document.getElementById("container").appendChild(input);
}

export function textLabel(id, opts) {
	makeControl({type: "textLabel", id: id, opts: opts});
}

export function numberField(id, opts) {
	makeControl({type: "numberField", id: id, opts: opts});
}