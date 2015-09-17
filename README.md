# 7GUIs API

## An API specification for an imaginary UI framework

Driving the spec are the problems proposed in the [7GUIs project](https://github.com/eugenkiss/7guis/wiki).

Solutions for the 7GUIs problems are implemented in [several language/framework combinations](https://github.com/eugenkiss/7guis).

However, it is difficult to find a language that provides minimal boilerplate/scaffolding, and allows solutions to be crafted elegantly and minimally.

This document will attempt to specify an API for a framework that would solve the solutions in the most elegant and minimal way possible.

The core language will be ES6 as that's what I know the best (although I believe Ruby is a very strong choice for many of the problems encountered).

# Counter (implemented)

```javascript
numberField("counter");
button("count");

clicked("count")
	.set("counter", () => this.value + 1);
```

# Temperature Converter

```javascript
numberField("celcius");
numberField("fahrenheit");

updated("fahrenheit")
	.set("celcius", (input) => (input - 32) * (5/9));

updated("celcius")
	.set("fahrenheit", (input) => (input * (9/5) + 32));
```

# Flight Booker

```javascript
selectList("flight type", ["one-way flight", "return flight"]);
dateField("leave", {errors: {background: red, message: "x"}, group: "form"},
	{validate: {before: "return"}});
dateField("return", {errors: {background: red, message: "x"}, group: "form"});
submitButton("book", {group: "form"});

changed("flight type")
	.disable("return", () => this.selected === "one-way flight");

clicked("book")
	.showMessage(() => `You have booked a {flight type} flight on {leave}`); // TODO: if return also show 'and {return}'
```

Notes
* What/where exactly is 'showMessage' defined?
* Buttons can be "submitButtons", then they are automatically disabled if their form group fails validation
* Any chained action can have an optional condition callback, as in the changed ("flight type").disable() action


# Timer

```javascript
progressBar("elapsed");
label("elapsedLabel");
slider("duration");
button("reset");
metronome("timer", 0.1)

ticked("timer")
	.set("elapsed", (delta) => this.value + delta));

updated("elapsed")
	.set("elapsedLabel", (input) => `{input}s`);

updated("duration")
	.set("elapsed", maximum((input) => input)); // FIXME: this is not readable.

clicked("reset")
	.set("elapsed", 0.0);
```

Notes:
* "elapsed" when and other whens do not differentiate between user actions and system actions

# CRUD

```javascript
model("names", [
	{name: "Hans", surname: "Emil"},
	{name: "Max", surname: "Mustermann"},
	{name: "Roman", surname: "Tisch"}
]);
label("filterLabel", "Filter prefix:");
textField("filter");
listBox("items", {model: "names", itemView: (item) => `{item.surname}, {item.name}`});
label("nameLabel", "Name:");
label("surnameLabel", "Surname:");
textField("name", {group: "form"});
textField("surname" {group: "form"});
button("create");
button("update");
button("delete");

updated("filter")
	.filter("items", (input, item) => item.surname.startsWith(input)); // very tricky. How does function pass input from filter with item from items? API strangeness. It's very concise and quite readable, though.

clicked("create")
	.create("names", group("form"));

clicked("update")
	.update("names", group("form"), get("items").selected());
	
clicked("delete")
	.delete("names", get("items").selected());
```

Notes:
* Data binding. Need to carefully consider if this is the right way to do it.
* items listBox now has its custom itemView declared as closure inside a JS object. Is this OK?
* filter is shorthand for get("").filter?
* Maybe also OK to have e.g. selected("items") for get("items").selected() then?

# Circle Drawer

```javascript
canvas("page");
contextMenu("circleMenu", (target) => {
	label("menuLabel", `Adjust diameter of circle at ({target.x}, {target.y})`);
	slider("menuSlider");
});

clicked("page", Mouse.LeftButton)
	.create("circle", input.position);
clicked("circle", Mouse.RightButton)
	.showContextMenu("circleMenu", input);
updated("menuSlider")
	.update((input, contextMenu) => contextMenu.target.diameter = input.value); // hmmm.
undo("page")
	.undoLastAction();
redo("page")
	.redoLastUndoneAction();
```

Notes:
* How does .create("circle") work? Think we need to define a circle primitive, or at least declare what it is
* Where does input inside .create come from? Should this code be in a closure?
* Likewise with input inside .showContextMenu. It's supposed to be the clicked circle but that's not explicit
* The .update in updated("menuSlider") needs refinement. .update's signature normally takes an explicit ID. The closure here is nice, but why is contextMenu the 2nd parameter? Maybe 2nd parameter is always the control's parent? Maybe named parameters would be clearer.
* Undo/redo is not explicit enough. Where is an 'action' defined/declared? (For this example, an action is: creating a circle; the last set value of the diameter of a circle when context menu is closed.

# General notes and observations

We see two types of statements emerging:
* Declarations: state the components of the app and their passive rules, e.g. validation
* Time/logic flow: state series of actions that occur when something happens at a point in time. Actually most of these usually concern a specific component. Should they be part of its declaration? (Think how button click handlers are usually encapsulated in an OOP UI framework's class definitions...) Maybe it depends how FP/OOP we want to be.
* Still lots of get/set boilerplate. Usually should be able to shorthand these like we do with the .filter in CRUD example.
* Every . in a chain is an implicit promise .then. In other words, a . indicates *action* chaining.
* We need an automatic user action undo/redo stack. Actions themselves need to be declared explicitly, or all actions will be undone. (See Circles example)

## Index

* Declarations: textField, numberField, dateField, label, button, submitButton, selectList, listBox, progressBar, slider, metronome
* Event handlers: updated, clicked, changed, ticked
* Actions: set, disable, showMessage, filter, create, update, delete
* Readers: get, group, selected, maximum
