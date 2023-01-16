import { userModel, User } from '@modules/user/model'

export const registerService = async (data: object): Promise<User | boolean> => {
	const result = await userModel.create({
		...data
	})
	return result ? result : false
}

export const checkAlreadyExistValueService = async (condition: object): Promise<User[] | boolean> => {
	const result = await userModel.find({ ...condition }).lean()
	return result && result.length > 0 ? result : false
}

export const getuserService = async (condition: object, fields: string): Promise<User | boolean> => {
	const result = await userModel
		.findOne({ ...condition })
		.select(fields)
		.lean()
	return result ? result : false
}
