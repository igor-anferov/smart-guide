const base_element = require('../../../../schemas/base_element')


module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Получить информацию о базовом элементе',
  parameters: [
    base_element.parameters.base_element_id,
  ],
  responses: {
    '200': {
      description: 'Информация о базовом элементе',
      content: {
        'application/json': {
          schema: base_element.get,
        }
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
