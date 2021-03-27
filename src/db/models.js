import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

let Test_Schema = new Schema({	
	test: String
});

let Tst = model('tests', Test_Schema);

export const TESTS = Tst;
