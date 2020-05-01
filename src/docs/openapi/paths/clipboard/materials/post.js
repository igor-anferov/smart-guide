module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Создать и добавить новый учебный материал в буфер обмена',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'title': {
              type: 'string',
              description: 'Заголовок учебного материала',
              example: 'Теорема Лапласа, доказательство, примеры применения',
            },
            'tags': {
              type: 'array',
              items: {
                type: 'string'
              },
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Информация о добавленном в буфер обмена учебном материале',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'material_id': { type: 'integer' }
            }
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
