const question = require('../schemas/question')


module.exports = {
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: question.create.request,
      },
    },
  },
  responses: {
    '201': {
      description: 'Информация о добавленном вопросе',
      content: {
        'application/json': {
          schema: question.create.response,
        }
      }
    },
    '401': require('../responses/401'),
  }
}