# 7GUIs API

## An API specification for an imaginary UI framework

Driving the spec are the problems proposed in the [7GUIs project](https://github.com/eugenkiss/7guis/wiki).

Solutions for the 7GUIs problems are implemented in [several language/framework combinations](https://github.com/eugenkiss/7guis).

However, it is difficult to find a language that provides minimal boilerplate/scaffolding, and allows solutions to be crafted elegantly and minimally.

This document will attempt to specify an API for a framework that would solve the solutions in the most elegant and minimal way possible.

The core language will be ES6 as that's what I know the best (although I believe Ruby is a very strong choice for many of the problems encountered).

Maybe if the spec is ever finished, I will attempt to build the framework. For now it's a thought experiment.

API design is harder than you would think!

# Counter

```javascript
declare("counter").numberField();
declare("count").button();

when("count").clicked()
	.set("counter", () => this.value + 1); // or "counter".set ?
```

# Temperature Converter

```javascript
declare("celcius").numberField();
declare("fahrenheit").numberField();

when("fahrenheit").updated()
	.set("celcius", (input) => (input - 32) * (5/9));

when("celcius").updated()
	.set("fahrenheit", (input) => (input * (9/5) + 32));
```

# Flight Booker

```javascript
declare("flight type").selectList("one-way flight", "return flight");
declare("leave").dateField({errors: {background: red, message: "x"}});
declare("return").dateField({errors: {background: red, message: "x"}});
declare("book").button();

validate("leave").before("return"); // maybe chain on declare instead?

disable("return", "flight type".selected("one-way flight"));
disable("book", "leave".notValid(), "return".notValid());

when("book").clicked()
	.showMessage(() => `You have booked a {flight type} flight on {leave}`); // TODO: if return also show 'and {return}'
```

Notes
* Should selectList take an array or just a list of args? Probably should be flexible.
* Grouping is unclear (i.e. what makes up form? are all controls in local module scope?)
* Maybe it should just be local module scope?
* Should we split up styling/layout? Biz logic should be separate
* What/where exactly is 'showMessage' defined?


# Timer

```javascript
declare("elapsed").progressBar();
declare("elapsedLabel").label();
declare("duration").slider();
declare("reset").button();

startTimer(0.1).tick(() => set("elapsed", (delta) => this.value + delta)); // implies timer passes delta as input.
when("elapsed").updated()
	.set("elapsedLabel", (input) => `{input}s`);

when("duration").updated()
	.set("elapsed").maximum((input) => input);

when("reset").clicked()
	.set("elapsed", 0.0);
```

Notes:
* "elapsed" when and other whens do not differentiate between user actions and system actions. Kinda like Flux.
* It kinda cries out for a separate model to contain the "elapsed" state, with both "elapsed" and "elapsedLabel" deriving their values from it. But that's more code to write for the programmer. Maybe we don't need it?
