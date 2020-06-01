const question = require('../../../../../../schemas/question')
const exam = require('../../../../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Скопировать вопрос из экзамена в буфер обмена',
  parameters: [
    exam.parameters.exam_id,
    question.parameters.question_id,
  ],
  responses: {
    '201': {
      description: 'Вопрос успешно скопирован в буфер обмена',
      content: {
        'application/json': {
          schema: question.create.response,
        }
      }
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
