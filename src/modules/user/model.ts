import { Schema, model, Types } from 'mongoose'

export interface User {
	_id?: Types.ObjectId
	name: string
	email: string
	password: string
	mobileNumber: string
}

const schema = new Schema<User>(
	{
		name: {
			type: String,
			default: ''
		},
		email: {
			type: String,
			default: ''
		},
		password: {
			type: String,
			default: ''
		},
		mobileNumber: {
			type: String,
			default: ''
		}
	},
	{
		collection: 'users',
		timestamps: true
	}
)

export const userModel = model<User>('user', schema)
