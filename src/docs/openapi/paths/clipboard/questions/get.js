const question = require('../../../schemas/question')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Получить иформацию о вопросах, находящихся в буфере обмена',
  responses: {
    '200': {
      description: 'Список всех вопросов, находящихся в буфере обмена',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: question.list,
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
