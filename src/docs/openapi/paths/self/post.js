module.exports = {
  tags: ['Профиль'],
  summary: 'Изменить информацию о себе',
    requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'login': {
              type: 'string',
              description: 'новый логин пользователя',
              example: 'margo',
            },
            'email': {
              type: 'string',
              description: 'новый Email пользователя',
              format: 'email',
              example: 'margo@mail.ru',
            },
            'university': {
              type: 'string',
              example: 'МГУ им.Ломоносова'
            },
            'faculty': {
              type: 'string',
              example: 'ВМК'
            },
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Информация о себе успешно обновлена',
    },
    '401': require('../../responses/401'),
  }
}