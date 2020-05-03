module.exports = {
  tags: ['Группы'],
  summary: 'покинуть группу',
  parameters: [
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
      description: 'Вы покинули группу',
    },
    '404': {
      description: 'Группа не найдена',
    },
    '401': require('../../../../responses/401'),
  }
}