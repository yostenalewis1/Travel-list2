import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} 
      onToggelitem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return <h1>🌊 FAR AWAY 🍱</h1>;
}

function Form({ onAddItems }) {
  const [description, setdescription] = useState("");
  const [quantity, setquantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    onAddItems(newItem);

    setdescription("");
    setquantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your trip</h3>
      <select value={quantity} onChange={(e) => setquantity(e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="items..."
        value={description}
        onChange={(e) => setdescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem ,onToggelitem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onToggelitem={onToggelitem}
          key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem ,onToggelitem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onToggelitem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  const numItems = items.length
  const itemPacked = items.filter((item)=>item.packed).length ;
  const percentage = Math.round((itemPacked / numItems) *100)


  return (
    <footer className="stats">
      You have {numItems} item on your list , and you already packed {itemPacked} ({percentage} %)
    </footer>
  );
}





