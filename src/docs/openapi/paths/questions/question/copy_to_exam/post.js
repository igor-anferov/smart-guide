const question = require('../../../../schemas/question')
const exam = require('../../../../schemas/exam')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Скопировать вопрос в экзамен',
  parameters: [
    question.parameters.question_id,
    exam.parameters.exam_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'position': {
              type: 'integer',
              description: 'Позиция вопроса внутри экзамена',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Вопрос успешно скопирован в экзамен',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
