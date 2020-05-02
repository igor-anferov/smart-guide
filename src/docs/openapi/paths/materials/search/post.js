module.exports = {
  tags: ['Учебные материалы'],
  summary: 'Поиск по всем учебным материалам',
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          type: 'object',
          properties: {
            'text_search': {
              type: 'string',
              description: 'Поисковая стока',
            },
          },
          minProperties: 1,
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object', 
            properties: {
              'my_materials': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'material_id': {
                      type: 'integer',
                    },
                    'title': {
                      type: 'string',
                    },
                    'keywords': {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    'question' : {
                      type: 'object',
                      properties: {
                        'question_id': { 
                          type: 'integer',
                        },
                        'text': {
                          type: 'string',
                        },
                      },
                    },
                    'exam' : {
                      type: 'object', 
                      properties: {
                        'exam_id': {
                          type: 'integer',
                        },
                        'title': {
                          type: 'string',
                        },
                        'teacher': {
                          type: 'string',
                        },                       
                      },
                    },
                  },
                },
              },
              'my_groups_materials': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'material_id': {
                      type: 'integer',
                    },
                    'title': {
                      type: 'string',
                    },
                    'keywords': {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    'question' : {
                      type: 'object',
                      properties: {
                        'question_id': { 
                          type: 'integer',
                        },
                        'text': {
                          type: 'string',
                        },
                      },
                    },
                    'exam' : {
                      type: 'object', 
                      properties: {
                        'exam_id': {
                          type: 'integer',
                        },
                        'title': {
                          type: 'string',
                        },
                        'teacher': {
                          type: 'string',
                        },  
                        'group': {
                          type: 'object',
                          properties: {
                            'group_id': {
                              type: 'integer',
                            },
                            'name': {
                              type: 'string',
                            },
                          },
                        },                      
                      },
                    },
                  },
                },
              },              
              'global_materials': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'material_id': {
                      type: 'integer',
                    },
                    'title': {
                      type: 'string',
                    },
                    'keywords': {
                      type: 'array',
                      items: {
                        type: 'string',
                      },
                    },
                    'question' : {
                      type: 'object',
                      properties: {
                        'question_id': { 
                          type: 'integer',
                        },
                        'text': {
                          type: 'string',
                        },
                      },
                    },
                    'exam' : {
                      type: 'object', 
                      properties: {
                        'exam_id': {
                          type: 'integer',
                        },
                        'title': {
                          type: 'string',
                        },
                        'teacher': {
                          type: 'string',
                        }, 
                        'author': {
                          type: 'object',
                          properties: {
                            'author_id': {
                              type: 'integer',
                            },
                            'login': {
                              type: 'string',
                            },
                            'university': {
                              type: 'string',
                            },
                            'faculty': {
                              type: 'string',
                            },
                          },
                        },                   
                      },
                    },
                  },
                },
              }, 

            },
            /*type: 'array',
            items: {
              type: 'object',
              properties: {
                'base_element_id': { 
                  type: 'integer',
                },
                'title': {
                  type: 'string',
                },
                'keywords': {
                  type: 'array',
                  items: {
                    type: 'string',
                  },
                },
              },
              required: ['base_element_id', 'title', 'keywords'],
            },*/
          },
        },
      },
    },
    '401': require('../../../responses/401'),
  }
}
