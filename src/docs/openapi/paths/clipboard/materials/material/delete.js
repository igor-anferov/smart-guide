module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить учебный материал из буфера обмена',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Учебный материал успешно удалён',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
