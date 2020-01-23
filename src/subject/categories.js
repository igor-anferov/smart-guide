import React, { useState } from 'react'
import List from "@material-ui/core/List";

import Category from './category'

export default function Categories() {
  const [items, setItems] = useState([
    { id: 1, title: "Экзамены", items: [
      { id: 1, title: "Билеты 2019" },
    ]},
    { id: 2, title: "Теормины", items: [
      { id: 1, title: "Теормин на 3" },
      { id: 1, title: "Теормин на 4" },
      { id: 1, title: "Теормин на 5" },
    ]},
  ]);

  return (
    <List>
      {items.map((item) => (
        <Category { ...item }/>
      ))}
    </List>
  );
}
