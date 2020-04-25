module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Получить cписок базовых элементов, входящих в состав учебного элемента',
  parameters: [
    {
      name: 'material_id',
      description: 'Идентификатор учебного элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Список всех базовых элементов, входящих в состав учебного элемента',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'element_id': { type: 'integer' },
                'title': {
                  type: 'string',
                  description: 'Название учебного элемента',
                  example: 'Теорема Лапласа (формулировка)',
                },
              },
              required: ['element_id', 'title']
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}