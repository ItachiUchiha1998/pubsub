import { Schema as _Schema, model } from 'mongoose'
const Schema = _Schema

const Cattle_Schema = new Schema({
	name: String,
	timestamp: Date,
	image_url: String,
	resized_image_url: String,
	is_resized: {
		type: Boolean,
		default: false
	}
})

export const CATTLE = model('cattle', Cattle_Schema)
