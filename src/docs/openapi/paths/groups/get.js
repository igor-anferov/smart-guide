const group = require('../../schemas/group')


module.exports = {
  tags: ['Группы'],
  summary: 'Получить список своих групп',
  responses: {
    '200': {
      description: 'Список групп пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: group.list,
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
