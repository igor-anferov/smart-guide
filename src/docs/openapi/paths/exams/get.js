const exam = require('../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить список своих экзаменов',
  responses: {
    '200': {
      description: 'Список всех экзаменов пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: exam.list,
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
