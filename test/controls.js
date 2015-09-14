import mocha from 'mocha';
import expect from 'expect';
import jsdom from 'mocha-jsdom';
import {numberField, textField, button, clicked} from '../src/framework';

describe('Controls', () => {
	jsdom();

	it('should instantiate number fields', () => {
		let counter = numberField('counter');
		expect(counter.id).toBe('counter');
		expect(counter.value).toBe('0');

		let hundred = numberField('hundred', 100);
		expect(hundred.id).toBe('hundred');
		expect(hundred.value).toBe('100');
	});

	it('should instantiate text fields', () => {
		let empty = textField('empty');

		expect(empty.id).toBe('empty');
		expect(empty.value).toBe('');

		let dog = textField('dog', 'jackrussel');
		expect(dog.id).toBe('dog');
		expect(dog.value).toBe('jackrussel');
	});
});
