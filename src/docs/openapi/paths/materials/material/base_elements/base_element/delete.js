module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Удалить базовый элемент из учебного элемента',
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
  responses: {
    '200': {
      description: 'Базовый элемент успешно удалён из учебного элемента',
    },
    '404': {
      description: 'Учебный элемент не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}