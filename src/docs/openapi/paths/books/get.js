export default {
  "tags": ["Книги"],
  "summary": "Получить список всех книг пользователя",
  "responses": {
    "200": {
      "content": {
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "title": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }
}
