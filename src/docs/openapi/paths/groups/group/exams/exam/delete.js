const exam = require('../../../../../schemas/exam')
const group = require('../../../../../schemas/group')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Удалить экзамен из группы',
  parameters: [
    group.parameters.group_id,
    exam.parameters.exam_id,
  ],
  responses: {
    '200': {
      description: 'Экзамен успешно удалён',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}
