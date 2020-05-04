const material = require('../../../../schemas/material')


module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить учебный материал из буфера обмена',
  parameters: [
    material.parameters.material_id,
  ],
  responses: {
    '200': {
      description: 'Учебный материал успешно удалён',
    },
    '404': {
      description: 'Учебный материал не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
