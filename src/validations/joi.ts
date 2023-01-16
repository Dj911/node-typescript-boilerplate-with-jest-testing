import joi, { ObjectSchema, ValidationResult } from 'joi'

const validateData = (schema: ObjectSchema, data: object): object => {
	const validate: ValidationResult = schema.validate(data)
	if (validate.error) {
		return {
			status: false,
			error: validate.error?.details[0]?.message.replace(/"/g, '')
		}
	} else {
		return {
			status: true
		}
	}
}

export const registerValidation = (data: object): any => {
	const schema: ObjectSchema = joi.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().min(8).max(15).required(),
		mobileNumber: joi
			.string()
			.pattern(/^\+(?:[0-9]●?){6,14}[0-9]$/)
			.required()
	})

	return validateData(schema, data)
}
