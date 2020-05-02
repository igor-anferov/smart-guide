module.exports = {
  tags: ['Экзамены'],
  summary: 'Удалить экзамен из группы',
  parameters: [
    {
      name: 'exam_id',
      description: 'Идентификатор экзамена',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'group_id',
      description: 'Идентификатор группы',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Экзамен успешно удалён',
    },
    '404': {
      description: 'Экзамен не найден',
    },
    '401': require('../../../../../responses/401'),
  }
}