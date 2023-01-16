import bcrypt from 'bcryptjs'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { config } from '@core/config'

export const passwordEncryption = (password: string): string => {
	const encryptedPassoword: string = bcrypt.hashSync(password, Number(config.PASSWORD_SALT))
	return encryptedPassoword
}

export const comparePassword = (plainPassword: string, encryptedPassword: string): boolean => {
	return bcrypt.compareSync(plainPassword, encryptedPassword)
}

export const deletePropertyFromObject = (obj: object, fieldsToBeDeleted: string[]): object => {
	for (const key in obj) {
		if (fieldsToBeDeleted.includes(key)) {
			delete obj[key]
		}
	}

	return obj
}

export const createJWTToken = (payload: object): string => {
	const token = jsonwebtoken.sign(payload, config.JWT_SECRET, {
		expiresIn: 180
	})

	return token
}

export const verifyJwtToken = (token: string): string | JwtPayload => {
	const verificationResult = jsonwebtoken.verify(token, config.JWT_SECRET)
	return verificationResult
}
