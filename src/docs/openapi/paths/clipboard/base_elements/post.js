export default {
  tags: ["Буфер обмена"],
  summary: "Добавить новый базовый элемент в буфер обмена",
  requestBody: {
    content: {
      'multipart/form-data': {
        schema: {
          type: "object",
          properties: {
            title: {
              type: 'string',
              description: 'Название базового элемента',
            },
            source: {
              type: 'string',
              description: 'Источник',
            },
            image: {
              type: 'string',
              format: 'binary',
              description: 'Изображение',
            }
          }
        }
      }
    }
  },
  responses: {
    '200': {
      content: {
        'application/json': {
          schema: {
            type: "object",
            properties: {
              "base_element_id": { type: "integer" }
            }
          }
        }
      }
    }
  }
}
