module.exports = {
  'application/json': {
    schema: {
      properties: {
        reason: {
          type: 'string',
          enum: ['LOGIN_ALREADY_USED', 'EMAIL_ALREADY_USED'],
          description: 'LOGIN_ALREADY_USED — Пользователь с таким логином уже зарегистрирован в системе<br/>EMAIL_ALREADY_USED — Пользователь с таким email уже зарегистрирован в системе'
        }
      }
    }
  }
}