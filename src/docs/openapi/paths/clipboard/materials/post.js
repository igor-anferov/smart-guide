const material = require('../../../schemas/material')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Создать и добавить новый учебный материал в буфер обмена',
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
      description: 'Информация о добавленном в буфер обмена учебном материале',
      content: {
        'application/json': {
          schema: material.create.response,
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
