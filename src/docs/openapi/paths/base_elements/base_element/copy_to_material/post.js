module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Скопировать базовый элемент в учебный материал',
  parameters: [
    {
      name: 'element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
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
              description: 'Позиция базового элемента внутри учебного материала',
            },
          },
          required: ['position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно скопирован в учебный материал',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
