module.exports = {
  tags: ['Буфер обмена'],
  summary: 'Удалить вопрос из буфера обмена',
  parameters: [
    {
      name: 'question_id',
      description: 'Идентификатор вопросв',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Вопрос успешно удалён',
    },
    '404': {
      description: 'Вопрос не найден',
    },
    '401': require('../../../../responses/401'),
  }
}
