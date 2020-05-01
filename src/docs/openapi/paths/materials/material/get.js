module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Получить все сведения об учебном материале',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Сведения об учебном материале',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              'title': {
                type: 'string',
                description: 'Заголовок учебного материала',
                example: 'Теорема Лапласа, доказательство, примеры применения',
              },
              'body': require('../../../schemas/base_elements.js'),
              'tags': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'tag': {
                      type: 'string',
                    },
                  },
                },
                description : 'Теги к учебному элементу',
              },
            },
            required: ['title', 'body']
          }
        }
      }
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../responses/401'),
  }
}
