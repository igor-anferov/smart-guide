module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Добавить новый базовый элемент в учебный материал',
   parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного материала',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
  ],
  ...require('../../../../requests/upload_base_element.js'),
}
