const exam = require('../../../../schemas/exam')
const group = require('../../../../schemas/group')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Получить список экзаменов группы',
  parameters: [
    group.parameters.group_id,
  ],
  responses: {
    '200': {
      description: 'Список всех экзаменов группы',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: exam.list,
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}
