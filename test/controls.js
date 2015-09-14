import mocha from 'mocha';
import expect from 'expect';
import {numberField, button, clicked} from '../src/framework';

describe('Controls', () => {
	//TODO: shim DOM, maybe use jsdom?

	it("should instantiate a text label", () => {
		var input = numberField("counter", 0);

		expect(input.id.toBe("counter"));
	});
});
