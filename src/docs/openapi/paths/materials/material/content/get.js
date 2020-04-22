module.exports = {
  tags: ['Учебные элементы'],
  summary: 'Получить cписок базовых элементов, входящих в состав учебного элемента',
  parameters: [
    {
      name: 'id_material',
      description: 'Идентификатор учебного элемента',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    },
    {
      name: 'number_version',
      description: 'Номер версии',
      in: 'path',
      schema: { type: 'integer' },
      required: true,
    }
  ],
  responses: {
    '200': {
      description: 'Список всех базовых элементов, входящих в состав учебного элемента',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                'id_base_element': { type: 'integer' },
                'title': {
                  type: 'string',
                  description: 'Название учебного элемента',
                  example: 'Теорема Лапласа (формулировка)',
                },
              },
              required: ['id_base_element', 'number_version', 'title']
            }
          }
        }
      }
    },
    '401': require('../../../../responses/401'),
  }
}