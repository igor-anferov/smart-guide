const question = require('../../../../schemas/question')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить вопрос из буфера обмена',
  parameters: [
    question.parameters.question_id,
  ],
  responses: {
    '200': {
      description: 'Вопрос успешно удалён',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
