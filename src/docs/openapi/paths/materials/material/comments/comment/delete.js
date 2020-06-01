const material = require('../../../../../schemas/material')

module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Удалить комментарий к учебному материалу',
  parameters: [
    material.parameters.material_id,
    {
      name: 'comment_id',
      description: 'Идентификатор комментария',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Комментарий успешно удалён',
    },
    '404': {
      description: 'Материал или комментарий не найдены',
    },
    '401': require('../../../../../responses/401'),
  }
}