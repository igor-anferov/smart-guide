module.exports = {
  tags: ['Экзамены'],
  summary: 'Удалить личный экзамен',
  parameters: [
    {
      name: 'exam_id',
      description: 'Идентификатор экзамена',
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
    '401': require('../../../responses/401'),
  }
}
