module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить базовый элемент из буфера обмена',
  parameters: [
    {
      name: 'base_element_id',
      description: 'Идентификатор базового элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Базовый элемент успешно удалён',
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
