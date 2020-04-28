module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Получить информацию о базовом элементе',
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
      description: 'Информация о базовом элементе',
      content: {
        'application/json': {
          schema: require('../../../../schemas/base_element/info.js'),
        }
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
