const user = require('../../schemas/user')


module.exports = {
  tags: ['Профиль'],
  summary: 'Изменить информацию о себе',
    requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: user.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Информация о себе успешно обновлена',
    },
    '401': require('../../responses/401'),
    '400': {
      description: 'Редактирование не удалась',
        content: {
        'application/json': {
          schema: {
            properties: {
              reason: {
                type: 'string',
                enum: ['LOGIN_ALREADY_USED', 'EMAIL_ALREADY_USED', 'WRONG_HS256'],
                description: 'LOGIN_ALREADY_USED — Пользователь с таким логином уже зарегистрирован в системе<br/>EMAIL_ALREADY_USED — Пользователь с таким email уже зарегистрирован в системе<br/>WRONG_HS256 — Переданный hs256 не является указанным пользователем в качестве верного'
              }
            }
          }
        }
      }
    }
  }
}
