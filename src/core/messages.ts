interface Messages {
	[key: string]: string
}

export const responseMessages: Messages = {
	// GENERAL MESSAGES
	WELCOME_MESSAGE: 'Welcome',
	SUCCESS: 'Success',
	ERROR: 'Error',
	SOMETHING_WENT_WRONG: 'Something went wrong',
	REGISTER_FAILD: 'Registration failed',
	REGISTER_SUCCESS: 'Registration successfully',
	JOI_VALIDATION_FAIL: 'Joi validation failed',
	EMAIL_ALREADY_EXIST: 'Email already exist',
	MOBILENUMBER_ALREADY_EXIST: 'Mobile number already exist',
	MISSING_PAYLOAD: 'Incomplete payload',
	INVALID_CREDS: 'Invalid email or password',
	LOGIN_SUCCESS: 'Login successfully',
	TOKEN_MISSING: 'Please provide token',
	TOKEN_INVALID: 'Invalid token',
	USER_NOTFOUND: 'User not found',
	USER_PROFILE: 'User details'
}
