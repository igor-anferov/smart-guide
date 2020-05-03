module.exports = {
  tags: ['Группы'],
  summary: 'Получить список пользователей группы',
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
      description: 'Список пользователей группы',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'user_id': { type: 'integer' },
                'login': {
                  type: 'string',
                  description: 'login пользователя',
                },
                'role': {
                  type: 'string',
                  enum: ["creator", "member"],
                },
              },
              required: ['user_id', 'login']
            }
          }
        }
      }
    },
    '401': require('../../../responses/401'),
  }
}
