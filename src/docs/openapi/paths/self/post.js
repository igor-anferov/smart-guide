const user = require('../../schemas/user')


module.exports = {
  tags: ['Профиль'],
  summary: 'Изменить информацию о себе',
    requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: user.edit,
      },
    },
  },
  responses: {
    '200': {
      description: 'Информация о себе успешно обновлена',
    },
    '401': require('../../responses/401'),
    '400': {
      description: 'Редактирование не удалась',
      content: require('../../responses/400')
    }
  }
}
