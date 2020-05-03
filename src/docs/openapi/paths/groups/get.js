module.exports = {
  tags: ['Группы'],
  summary: 'Получить список своих групп',
  responses: {
    '200': {
      description: 'Список групп пользователя',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'group_id': { type: 'integer' },
                'name': {
                  type: 'string',
                  description: 'Название группы',
                },
              },
              required: ['group_id', 'name']
            }
          }
        }
      }
    },
    '401': require('../../responses/401'),
  }
}
