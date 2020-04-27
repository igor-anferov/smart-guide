module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Создать и добавить новый учебный элемент в буфер обмена',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'snippet': {
              type: 'string',
              description: 'Заголовок учебного элемента',
              example: 'Теорема Лапласа, доказательство, примеры применения',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '201': {
      description: 'Информация о добавленном в буфер обмена учебном элементе',
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