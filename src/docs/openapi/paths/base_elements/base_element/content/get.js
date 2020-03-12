export default {
  tags: ['Базовые элементы'],
  summary: 'Получить содержимое базового элемента',
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
      content: {
        'image/*': {
          schema: {
            type: 'string',
            format: 'binary',
            description: 'Содержимое базового элемента с типом "image"',
          }
        },
        'application/x-latex': {
          schema: {
            type: 'string',
            format: 'binary',
            description: 'Содержимое базового элемента с типом "latex"',
          }
        },
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401').default,
  }
}
