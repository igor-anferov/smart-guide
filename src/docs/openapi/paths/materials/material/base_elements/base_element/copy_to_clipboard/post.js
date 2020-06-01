const base_element = require('../../../../../../schemas/base_element')
const material = require('../../../../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Скопировать базовый элемент из учебного материала в буфер обмена',
  parameters: [
    material.parameters.material_id,
    base_element.parameters.base_element_id,
  ],
  responses: {
    '201': {
      description: 'Базовый элемент успешно скопирован в буфер обмена',
      content: {
        'application/json': {
          schema: base_element.create.response,
        }
      }
    },
    '404': {
      description: 'Базовый элемент не найден',
    },
    '401': require('../../../../../../responses/401'),
  }
}
