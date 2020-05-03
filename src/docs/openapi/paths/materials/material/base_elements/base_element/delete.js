const base_element = require('../../../../../schemas/base_element')
const material = require('../../../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Удалить базовый элемент из учебного материала',
  parameters: [
    material.parameters.material_id,
    base_element.parameters.base_element_id,
  ],
  responses: {
    '200': {
      description: 'Базовый элемент успешно удалён из учебного материала',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}
