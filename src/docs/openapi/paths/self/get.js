const user = require('../../schemas/user')


module.exports = {
  tags: ['Профиль'],
  summary: 'Получить информацию о себе',
  responses: {
    '200': {
      description: 'Информация о себе',
      content: {
        'application/json': {
          schema: user.list,
        }
      }
    },
    '401': require('../../responses/401'),
  },
}
