const exam = require('../../../schemas/exam')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Отредактировать информацию об экзамене',
  parameters: [
    exam.parameters.exam_id,
  ],
  requestBody: {
    required: true,
    description: 'Необходимо передать только изменившиеся поля',
    content: {
      'application/x-www-form-urlencoded': {
        schema: exam.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Экзамен успешно обновлён',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../responses/401'),
  }
}