module.exports = {
  tags: ['Группы'],
  summary: 'Удалить пользователя из группы',
  parameters: [
    {
      name: 'group_id',
      description: 'Идентификатор группы',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'user_id',
      description: 'Идентификатор пользователя',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Пользователь успешно удалён из группы',
    },
    '404': {
      description: 'Группа или пользователь не найдена',
    },
    '401': require('../../../responses/401'),
  }
}