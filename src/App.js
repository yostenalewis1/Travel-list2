import { useState } from "react";
import Logo from "./logo";
import Form from "./Form";


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handelDeleteAllitems()
  {
    const confirm = window.confirm("Are you sure to delete all the items ?")
    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggelitem={handleToggleItem}
        ondeleteAllitems={handelDeleteAllitems}
      />
      <Stats items={items}  />
    </div>
  );
}


function PackingList({ items, onDeleteItem, onToggelitem ,ondeleteAllitems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if(sortBy === "input") sortedItems = items;
  if(sortBy === "description") 
  sortedItems = items.slice()
.sort((a,b)=> a.description.localeCompare(b.description));

if(sortBy ==="packed") 
sortedItems = items
.slice()
.sort((a,b)=>Number(a.packed) - (b.packed))


  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggelitem={onToggelitem}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={ondeleteAllitems}>Clear All Items</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggelitem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggelitem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const itemPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((itemPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "you got everything , ready to go ✈️ "
          : `You have ${numItems} item on your list , and you already packed ${itemPacked} (${percentage} %)`}
      </em>
    </footer>
  );
}
