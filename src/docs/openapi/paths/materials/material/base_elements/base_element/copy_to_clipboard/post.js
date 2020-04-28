module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Скопировать базовый элемент из учебного материала в буфер обмена',
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
  responses: {
    '200': {
      description: 'Базовый элемент успешно скопирован в буфер обмена',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
