const base_element = require('../../../../schemas/base_element')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить базовый элемент из буфера обмена',
  parameters: [
    base_element.parameters.base_element_id,
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
