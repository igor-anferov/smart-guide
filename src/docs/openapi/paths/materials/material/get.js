const material = require('../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Получить все сведения об учебном материале',
  parameters: [
    material.parameters.material_id,
  ],
  responses: {
    '200': {
      description: 'Сведения об учебном материале',
      content: {
        'application/json': {
          schema: material.get,
        }
      }
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../responses/401'),
  }
}
