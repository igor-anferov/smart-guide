const material = require('../../../../schemas/material')


module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Добавить новый базовый элемент в учебный материал',
  parameters: [
    material.parameters.material_id,
  ],
  ...require('../../../../requests/upload_base_element.js'),
}
