const base_element = require('../../../../schemas/base_element')


module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Получить содержимое базового элемента',
  parameters: [
    base_element.parameters.base_element_id,
  ],
  responses: {
    '200': {
      description: 'Содержимое базового элемента',
      content: {
        'image/*': {
          schema: base_element.properties.image,
        },
        'application/x-latex': {
          schema: base_element.properties.latex,
        },
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
