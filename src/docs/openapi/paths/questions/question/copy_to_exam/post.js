const question = require('../../../../schemas/question')
const exam = require('../../../../schemas/exam')


module.exports = {
  tags: ['Вопросы'],
  summary: 'Скопировать вопрос в экзамен',
  parameters: [
    question.parameters.question_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'exam_id': exam.properties.exam_id,
            'position': {
              type: 'integer',
              description: 'Позиция вопроса внутри экзамена',
            },
          },
          required: ['exam_id', 'position'],
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Вопрос успешно скопирован в экзамен',
      content: {
        'application/json': {
          schema: question.create.response,
        }
      }
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
