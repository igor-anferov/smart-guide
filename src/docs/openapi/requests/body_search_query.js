module.exports = {
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'query': {
              type: 'string',
              description: 'Поисковая строка',
            },
            'own_exams': {
              type: 'boolean',
              description: 'Искать в своих экзаменах',
              default: false,
            },
            'groups_exams': {
              type: 'boolean',
              description: 'Искать в экзаменах групп, в которых состоит пользователь',
              default: false,
            },
            'global': {
              type: 'boolean',
              description: 'Искать по экзаменам всех пользователей и групп',
              default: false,
            },
          },
          required: ['query'],
        },
      },
    },
  },
}