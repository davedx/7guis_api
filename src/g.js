import EE from "eventemitter3";

let emitter = new EE();

let controls = {};

const typesMap = {
	textLabel: {element: "input"},
	numberField: {element: "input", attributes: {type: "number"}},
	button: {element: "button"}
};

const actions = {
	target: null,

	set: function(...args) {
		//console.info("Binding _set to: ", args);
		this.target = function() {
			this._set.apply(null, args);
		};
	},

	_set: function(id, val) {
		//console.info("Set impl called: "+id+" ", val);
		let value = "";
		let node = document.getElementById(id);
		if(val instanceof Function) {
			// TODO: make how value is passed in dependent on type of control (e.g. here it is parseInt which
			// corresponds to numberFields)
			value = val(parseInt(node.value));
		} else {
			value = val;
		}
		node.value = value;
	}
};

function subscribe(id, eventType, fn) {
	emitter.on(eventType, (controlId) => {
		if(id === controlId) {
			fn();
		}
	});
}

function makeControl(opts) {
	let typeProps = typesMap[opts.type];
	let input = document.createElement(typeProps.element);
	input.id = opts.id;
	if(opts.type === "button") {
		input.innerHTML = opts.value;
	} else {
		input.value = opts.value;
	}
	for(let attrKey in typeProps.attributes) {
		input.attributes[attrKey] = typeProps.attributes[attrKey];
	}
	input.onclick = function() { emitter.emit("clicked", opts.id); };

	controls[opts.id] = input;
	document.getElementById("container").appendChild(input);
}

export function textLabel(id, value) {
	makeControl({type: "textLabel", id: id, value: value});
}

export function numberField(id, value) {
	makeControl({type: "numberField", id: id, value: value});
}

export function button(id, value) {
	makeControl({type: "button", id: id, value: value});
}

export function clicked(id) {
	let _actions = Object.create(actions);
	subscribe(id, "clicked", () => {
		//console.info(id+" clicked: ", _actions);
		_actions.target();
	});
	return _actions;
}