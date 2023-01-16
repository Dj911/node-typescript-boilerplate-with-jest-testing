import { Request, Response } from 'express'
import { catchAsync } from '@helpers/catchAsync'
import { handleResponse, handleError } from '@helpers/response'
import { registerService, checkAlreadyExistValueService, getuserService } from '@modules/user/service'
import { responseMessages } from '@core/messages'
import { registerValidation } from '@validations/joi'
import { passwordEncryption, comparePassword, deletePropertyFromObject, createJWTToken } from '@core/utils'
import { User } from '@modules/user/model'

export const register = catchAsync(async (req: Request, res: Response) => {
	const validateBody = registerValidation(req.body)
	if (!validateBody?.status) {
		return handleError(res, 400, validateBody?.error ? validateBody?.error : responseMessages.JOI_VALIDATION_FAIL, 0, {})
	}
	const { name, email, password, mobileNumber } = req.body as {
		name: string
		email: string
		password: string
		mobileNumber: string
	}
	const obj = {
		name,
		email: email.toLowerCase(),
		password,
		mobileNumber
	}

	const checkEmailExist = await checkAlreadyExistValueService({
		email: obj.email
	})
	if (checkEmailExist) {
		return handleError(res, 500, responseMessages.EMAIL_ALREADY_EXIST, 0, {})
	}
	const checkMobileNumberExist = await checkAlreadyExistValueService({
		mobileNumber: obj.mobileNumber
	})
	if (checkMobileNumberExist) {
		return handleError(res, 500, responseMessages.MOBILENUMBER_ALREADY_EXIST, 0, {})
	}
	obj.password = passwordEncryption(password)
	const response = await registerService(obj)
	if (response) {
		return handleResponse(res, 201, responseMessages.REGISTER_SUCCESS, 1, {})
	}
	return handleError(res, 500, responseMessages.REGISTER_FAILD, 0, {})
})

export const login = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body as {
		email: string
		password: string
	}

	if (!(email && password)) {
		return handleError(res, 400, responseMessages.MISSING_PAYLOAD, 0, {})
	}

	const userData = await getuserService({ email: email.toLowerCase() }, 'email password name mobileNumber')
	if (!userData) {
		return handleError(res, 401, responseMessages.INVALID_CREDS, 0, {})
	}
	const comparePasswordResult = comparePassword(password, (userData as User).password)
	if (!comparePasswordResult) {
		return handleError(res, 404, responseMessages.INVALID_CREDS, 0, {})
	}
	const finalResult = deletePropertyFromObject(userData as User, ['password'])
	const jwtToken = createJWTToken({
		_id: (finalResult as User)._id,
		name: (finalResult as User).name
	})
	finalResult['token'] = jwtToken
	return handleResponse(res, 200, responseMessages.LOGIN_SUCCESS, 1, finalResult)
})

export const getProfile = catchAsync(async (req: Request, res: Response) => {
	const user = req['user']
	const userData = await getuserService(
		{
			_id: user._id
		},
		'name email mobileNumber'
	)
	if (!userData) {
		return handleError(res, 404, responseMessages.USER_NOTFOUND, 0, {})
	}
	return handleResponse(res, 200, responseMessages.USER_PROFILE, 1, userData)
})
