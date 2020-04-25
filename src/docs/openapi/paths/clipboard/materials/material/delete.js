module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить учебный элемент из буфера обмена',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Учебный элемент успешно удалён',
    },
    '404': {
      description: 'Учебный элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
