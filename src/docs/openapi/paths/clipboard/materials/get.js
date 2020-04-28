module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Получить информацию об учебных материалах, находящихся в буфере обмена',
  responses: {
    '200': {
      description: 'Список всех учебных элементов, находящихся в буфере обмена',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'material_id': { type: 'integer' },
                'title': {
                  type: 'string',
                  description: 'Заголовок учебного материала',
                  example: 'Теорема Лапласа, доказательство, примеры применения',
                },
              },
              required: ['material_id', 'title']
            }
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
