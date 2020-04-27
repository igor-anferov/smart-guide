module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Скопировать базовый элемент в учебный элемент',
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
      description: 'Идентификатор учебного элемента',
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
              description: 'Позиция базового элемента внутри учебного элемента',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно скопирован в учебный элемент',
    },
    '404': {
      description: 'Учебный элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}