import { Request, Response, NextFunction } from 'express'
import { handleError } from '@helpers/response'
import { responseMessages } from '@core/messages'
import { TokenExpiredError } from 'jsonwebtoken'

export const catchAsync = (callback: (req: Request, res: Response, next: NextFunction) => void) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			callback(req, res, next)
		} catch (err: any) {
			if (err instanceof TokenExpiredError) {
				handleError(res, 522, err?.message ? err.message : responseMessages.SOMETHING_WENT_WRONG, 0, {})
			}
			handleError(res, 500, err?.message ? err.message : responseMessages.SOMETHING_WENT_WRONG, 0, {})
		}
	}
}
