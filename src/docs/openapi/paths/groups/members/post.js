module.exports = {
  tags: ['Группы'],
  summary: 'добавить пользователей в группу',
  parameters: [
    {
      name: 'group_id',
      description: 'Идентификатор группы',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'users': {
              type: 'array',
              items: {
                type: 'integer',
              },
              description: 'список user_id',
            },
          },
          required: ['users'],
        },
        encoding: {
          'users': {
            style: 'form',
            explode: false,
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Пользователи успешно добавлены в группу',
    },
    '404': {
      description: 'Группа не найдена',
    },
    '401': require('../../../responses/401'),
  }
}