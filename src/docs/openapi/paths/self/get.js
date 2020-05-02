module.exports = {
  tags: ['Профиль'],
  summary: 'Получить информацию о себе',
  responses: {
    '200': {
      description: 'Информация о себе',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'login': {
                type: 'string',
                description: 'Логин пользователя',
                example: 'margo',
              },
              'email': {
                type: 'string',
                description: 'Email пользователя',
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
            required: ['login', 'email'],
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }, 
}
