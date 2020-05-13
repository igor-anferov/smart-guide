const base_element = require('../../../schemas/base_element')
const material = require('../../../schemas/material')

module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Редактировать базовый элемент',
  parameters: [
    base_element.parameters.base_element_id,
  ],
  requestBody: {
    required: true,
    description: 'Необходимо передать только изменившиеся поля. Тип базового элемента изменён быть не может',
    content: {
      'multipart/form-data': {
        schema: base_element.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно обновлён',
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../responses/401'),
  }
}
