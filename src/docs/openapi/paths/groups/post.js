const group = require('../../schemas/group')


module.exports = {
  tags: ['Группы'],
  summary: 'Создать новую группу',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: group.create.request,
        encoding: {
          'users': {
            style: 'form',
            explode: false,
          },
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'OK',
      content: {
        'application/json': {
          schema: group.create.response,
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
