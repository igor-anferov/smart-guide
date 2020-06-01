const exam = require('../../../../schemas/exam')
const group = require('../../../../schemas/group')


module.exports = {
  tags: ['Экзамены'],
  summary: 'Скопировать экзамен в группу',
  parameters: [
    exam.parameters.exam_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'group_id': group.properties.group_id,
          },
          required: ['group_id'],
        },
      },
    },
  },
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