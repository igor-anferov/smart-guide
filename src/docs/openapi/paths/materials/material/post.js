const material = require('../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Отредактировать информацию об учебном материале',
  parameters: [
    material.parameters.material_id,
  ],
  requestBody: {
    required: true,
    description: 'Необходимо передать только изменившиеся поля',
    content: {
      'application/x-www-form-urlencoded': {
        schema: material.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Учебный материал успешно обновлён',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../responses/401'),
  }
}
