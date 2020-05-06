const question = require('../../../schemas/question')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Получить все сведения о вопросе',
  parameters: [
    question.parameters.question_id,
  ],
  responses: {
    '200': {
      description: 'Сведения о вопросе',
      content: {
        'application/json': {
          schema: question.get,
        }
      }
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../responses/401'),
  }
}