const exam = require('../../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Скопировать экзамен себе',
  parameters: [
    exam.parameters.exam_id,
  ],
  responses: {
    '201': {
      description: 'Экзамен успешно скопирован',
      content: {
        'application/json': {
          schema: exam.create.response,
        }
      }
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../responses/401'),
  }
}