export interface ErrorBody extends Error {
  code: string
}

export const errorMessages = {
  auth: {
    wrongCredentials: {
      message: 'invalid email or password',
      code: '60001',
    },
    userAlreadyExists: {
      message: 'user already exist',
      code: '60002',
    },
    expiredToken: {
      message: 'token expired',
      code: '60003',
    },
    invalidToken: {
      message: 'invalid token',
      code: '60004',
    },
    notAllowed: {
      message: 'not allowed',
      code: '60005',
    },
  },
  users: {
    userNotFound: {
      message: 'user not found',
      code: '70001',
    },
  },
  movies: {
    movieNotFound: {
      message: 'movie not found',
      code: '80001',
    },
  }
}
