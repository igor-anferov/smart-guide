module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Переместить базовый элемент внутри учебного элемента',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного элемента',
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
              description: 'Новая позиция базового элемента внутри учебного элемента',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно перемещён внутри учебного элемента',
    },
    '404': {
      description: 'Учебный элемент не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}