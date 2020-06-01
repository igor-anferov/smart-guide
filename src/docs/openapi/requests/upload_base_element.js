const base_element = require('../schemas/base_element')

module.exports = {
  requestBody: {
    required: true,
    description: 'Необходимо передать либо параметр "image", либо "latex"',
    content: {
      'multipart/form-data': {
        schema: base_element.create.request,
        encoding: {
          'image': {
            contentType: 'image/*',
          },
          'latex': {
            contentType: 'application/x-latex',
          },
          'tags': {
            style: 'form',
            explode: false,
          },
        },
      }
    }
  },
  responses: {
    '201': {
      description: 'Информация о загруженном базовом элементе',
      content: {
        'application/json': {
          schema: base_element.create.response,
        }
      }
    },
    '401': require('../responses/401'),
  }
}
