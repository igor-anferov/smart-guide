const question = require('../../../schemas/question')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Отредактировать информацию о вопросе',
  parameters: [
    question.parameters.question_id,
  ],
  requestBody: {
    required: true,
    description: 'Необходимо передать только изменившиеся поля',
    content: {
      'application/x-www-form-urlencoded': {
        schema: question.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Вопрос успешно обновлён',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../responses/401'),
  }
}