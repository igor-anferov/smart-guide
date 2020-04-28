module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Переместить базовый элемент внутри учебного материала',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'position': {
              type: 'integer',
              description: 'Новая позиция базового элемента внутри учебного материала',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно перемещён внутри учебного материала',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
