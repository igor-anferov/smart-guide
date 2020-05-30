const base_element = require('../../../../schemas/base_element')
const material = require('../../../../schemas/material')


module.exports = {
  tags: ['Базовые элементы'],
  summary: 'Скопировать базовый элемент в учебный материал',
  parameters: [
    base_element.parameters.base_element_id,
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'material_id': material.properties.material_id,
            'position': {
              type: 'integer',
              description: 'Позиция базового элемента внутри учебного материала',
            },
          },
          required: ['material_id', 'position'],
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Базовый элемент успешно скопирован в учебный материал',
    },
    '404': {
      description: 'Базовый элемент или учебный материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
