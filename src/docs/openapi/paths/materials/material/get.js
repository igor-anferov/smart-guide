module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Получить все сведения об учебном элементе',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного элемента',
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
              'snippet': {
                type: 'string',
                description: 'Заголовок учебного элемента',
                example: 'Теорема Лапласа, доказательство, примеры применения',
              },
              'body': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'element_id': { type: 'integer' },
                    'title': {
                      type: 'string',
                      example: 'Теорема Лапласа',
                    },
                  },
                  required: ['element_id', 'title']
                }  
              }
            },
            required: ['snippet', 'body']
          }
        }
      }
    },
    '404': {
      description: 'Учебный элемент не найден',
    },
    '401': require('../../../responses/401'),
  }
}