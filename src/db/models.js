import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

let Test_Schema = new Schema({	
	test: String
})

const Cattle_Schema = new Schema({
	name: String,
	timestamp: Date,
	image_url: String,
	resized_image_url: String
})

export const TESTS = model('tests', Test_Schema)
export const CATTLE = model('cattle', Cattle_Schema)
