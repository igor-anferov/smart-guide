const question = require('../../../../../../schemas/question')
const exam = require('../../../../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Переместить вопрос внутри экзамена',
  parameters: [
    exam.parameters.exam_id,
    question.parameters.question_id,
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
              description: 'Новая позиция вопроса внутри экзамена',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Вопрос успешно перемещён внутри экзамена',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}