module.exports = {
  tags: ["Аутентификация"],
  summary: "Зарегистрироваться в системе и выполнить вход",
  requestBody: {
    required: true,
    content: {
      'application/x-www-form-urlencoded': {
        schema: {
          properties: {
            'login': {
              type: 'string',
              description: 'Логин пользователя',
              example: 'user',
            },
            'hs256': {
              type: 'string',
              description: '<math display="block" xmlns="http://www.w3.org/1998/Math/MathML"><mi>h</mi><mi>e</mi><mi>x</mi><mo stretchy="false">(</mo><mi>H</mi><mi>M</mi><mi>A</mi><mi>C</mi><mo form="infix">-</mo><mi>S</mi><mi>H</mi><mi>A</mi><msub><mn>256</mn><mrow><mo form="infix">&lt;</mo><mi>п</mi><mi>а</mi><mi>р</mi><mi>о</mi><mi>л</mi><mi>ь</mi><mo form="infix">&gt;</mo></mrow></msub><mo stretchy="false">(</mo><mo form="infix">&lt;</mo><mi>л</mi><mi>о</mi><mi>г</mi><mi>и</mi><mi>н</mi><mo form="infix">&gt;</mo><mo stretchy="false">)</mo><mo stretchy="false">)</mo></math>',
              example: '16aa95479af46da4def2d52a345960d2cd276398763e430571ea4aba3ac70f12',
            },
            'email': {
              type: 'string',
              description: 'Email пользователя',
              format: 'email',
              example: 'user@example.com',
            },
          },
          required: ['login', 'hs256', 'email']
        }
      }
    }
  },
  responses: {
    '200': {
      description: 'Пользователь успешно зарегистрирован и аутентифицирован, выставлен cookie "token"',
      headers: {
        'Set-Cookie': {
          schema: {
            type: 'string',
            example: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIj...; HttpOnly; Secure',
          }
        }
      }
    },
    '400': {
      description: 'Регистрация не удалась',
      content: require('../../../responses/400')
    }
  },
  security: []
}
