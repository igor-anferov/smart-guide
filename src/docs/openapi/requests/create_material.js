const material = require('../schemas/material')


module.exports = {
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: material.create.request,
      },
    },
  },
  responses: {
    '201': {
      description: 'Информация о добавленном учебном материале',
      content: {
        'application/json': {
          schema: material.create.response,
        }
      }
    },
    '401': require('../responses/401'),
  }
}