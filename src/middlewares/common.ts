import { Request, Response, NextFunction } from 'express'
import { catchAsync } from '@helpers/catchAsync'
import { handleError } from '@helpers/response'
import { responseMessages } from '@core/messages'
import { verifyJwtToken } from '@core/utils'

export const verifyToken = catchAsync((req: Request, res: Response, next: NextFunction) => {
	let token = req.headers.authorization
	if (!token) {
		return handleError(res, 400, responseMessages.TOKEN_MISSING, 0, {})
	}
	token = token?.split(' ')[1] as string
	const verifyToken = verifyJwtToken(token)
	if (verifyToken) {
		req['user'] = verifyToken
		return next()
	}
	return handleError(res, 400, responseMessages.TOKEN_INVALID, 0, {})
})
